process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

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

let connectionString = envVars.DATABASE_URL;
if (!connectionString) {
  console.error('Error: DATABASE_URL not defined in .env.local');
  process.exit(1);
}

// Clean connection string like we did in the pg-pool code
if (connectionString.includes("sslmode=")) {
  connectionString = connectionString.replace(/[?&]sslmode=[^&]*/g, "");
  if (connectionString.endsWith("?") || connectionString.endsWith("&")) {
    connectionString = connectionString.slice(0, -1);
  }
}

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database for migration.');

    console.log('Creating bulk_inquiries table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS bulk_inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        event_type TEXT NOT NULL,
        event_date TEXT NOT NULL,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        location TEXT NOT NULL,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    console.log('Table bulk_inquiries created/verified successfully.');
  } catch (err) {
    console.error('Error running migration:', err);
  } finally {
    await client.end();
  }
}

run();
