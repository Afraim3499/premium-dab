process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// 1. Read and Parse .env.local to find DATABASE_URL
const envPath = path.join(__dirname, '../../../.env.local');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env.local file not found at:', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      envVars[key] = val;
    }
  }
});

const connectionString = envVars.DATABASE_URL;
if (!connectionString) {
  console.error('Error: DATABASE_URL not defined in .env.local');
  process.exit(1);
}

console.log('Connecting to database...');

// 2. Initialize PostgreSQL client
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    await client.connect();
    console.log('Successfully connected to database pooler.');

    // A. Create Enums if they don't exist
    console.log('Declaring enum types...');
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
          CREATE TYPE order_status AS ENUM (
            'whatsapp_redirected',
            'contacted',
            'confirmed',
            'cancelled',
            'delivered'
          );
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'inventory_movement_type') THEN
          CREATE TYPE inventory_movement_type AS ENUM (
            'manual_add',
            'manual_reduce',
            'reserved_for_order',
            'released_from_cancelled_order',
            'confirmed_order_deducted'
          );
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role') THEN
          CREATE TYPE admin_role AS ENUM (
            'owner',
            'manager',
            'operator'
          );
        END IF;
      END$$;
    `);

    // B. Create Tables
    console.log('Creating database tables...');

    // 1. Products
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        price_bdt INTEGER NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        is_public_checkout BOOLEAN NOT NULL DEFAULT false,
        image_path TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // 2. Inventory
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
        stock_on_hand INTEGER NOT NULL DEFAULT 0,
        stock_reserved INTEGER NOT NULL DEFAULT 0,
        low_stock_threshold INTEGER NOT NULL DEFAULT 10,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // 3. Service Areas
    await client.query(`
      CREATE TABLE IF NOT EXISTS service_areas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        city TEXT NOT NULL,
        area TEXT NOT NULL,
        is_available BOOLEAN NOT NULL DEFAULT false,
        delivery_charge_bdt INTEGER NOT NULL DEFAULT 0,
        estimated_delivery_text TEXT DEFAULT '2–4 hours',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE(city, area)
      );
    `);

    // 4. Orders
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_number TEXT UNIQUE NOT NULL,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        city TEXT NOT NULL,
        area TEXT NOT NULL,
        full_address TEXT NOT NULL,
        delivery_note TEXT,
        product_id UUID NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        unit_price_bdt INTEGER NOT NULL,
        subtotal_bdt INTEGER NOT NULL,
        delivery_charge_bdt INTEGER NOT NULL,
        total_bdt INTEGER NOT NULL,
        status order_status NOT NULL DEFAULT 'whatsapp_redirected',
        whatsapp_message TEXT NOT NULL,
        whatsapp_redirect_url TEXT NOT NULL,
        admin_note TEXT,
        confirmed_at TIMESTAMPTZ,
        cancelled_at TIMESTAMPTZ,
        delivered_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // 5. Inventory Movements
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventory_movements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID NOT NULL REFERENCES products(id),
        order_id UUID REFERENCES orders(id),
        movement_type inventory_movement_type NOT NULL,
        quantity INTEGER NOT NULL,
        note TEXT,
        created_by UUID, -- Links to auth.users(id)
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // 6. Waitlist
    await client.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT,
        phone TEXT NOT NULL,
        city TEXT NOT NULL,
        area TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // 7. Admin Users
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        user_id UUID PRIMARY KEY, -- Links to auth.users(id) in Supabase
        email TEXT UNIQUE NOT NULL,
        role admin_role NOT NULL DEFAULT 'operator',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    console.log('Tables verified/created successfully.');

    // C. Seed Initial Data
    console.log('Seeding initial system data...');

    // Seed Launch Product
    await client.query(`
      INSERT INTO products (slug, name, description, price_bdt, is_active, is_public_checkout, image_path)
      VALUES (
        'premium-daab-single', 
        'Premium Daab', 
        '100% Natural young coconut hygienically prepared and served fresh.', 
        120, 
        true, 
        true, 
        '/assets/premium-daab/product-hero.png'
      )
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Seed Inventory for product
    await client.query(`
      INSERT INTO inventory (product_id, stock_on_hand, stock_reserved, low_stock_threshold)
      SELECT id, 100, 0, 10 
      FROM products 
      WHERE slug = 'premium-daab-single'
      ON CONFLICT (product_id) DO NOTHING;
    `);

    // Seed Service Areas
    await client.query(`
      INSERT INTO service_areas (city, area, is_available, delivery_charge_bdt, estimated_delivery_text, sort_order)
      VALUES 
        ('Dhaka', 'Bashundhara R/A', true, 40, '2–4 hours', 1),
        ('Dhaka', 'Gulshan', false, 60, 'Coming soon', 2),
        ('Dhaka', 'Banani', false, 60, 'Coming soon', 3),
        ('Dhaka', 'Dhanmondi', false, 70, 'Coming soon', 4),
        ('Dhaka', 'Uttara', false, 70, 'Coming soon', 5)
      ON CONFLICT (city, area) DO NOTHING;
    `);

    console.log('Initial seed data applied.');
    console.log('Migrations and database seeding completed successfully!');
  } catch (err) {
    console.error('Migration error occurred:', err);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
