-- Migration SQL to update service areas and add Mohammadpur for Premium Daab
-- Execute this script directly in your Supabase SQL Editor (https://supabase.com/dashboard/project/gbejssppaftenotmgola/sql/new)

INSERT INTO service_areas (city, area, is_available, delivery_charge_bdt, estimated_delivery_text, sort_order)
VALUES 
  ('Dhaka', 'Bashundhara R/A', true, 40, '2–4 hours', 1),
  ('Dhaka', 'Dhanmondi', true, 40, '1–2 hours', 4),
  ('Dhaka', 'Uttara', true, 70, '3–4 hours', 5),
  ('Dhaka', 'Mohammadpur', false, 50, 'Coming soon', 6)
ON CONFLICT (city, area) DO UPDATE SET
  is_available = EXCLUDED.is_available,
  delivery_charge_bdt = EXCLUDED.delivery_charge_bdt,
  estimated_delivery_text = EXCLUDED.estimated_delivery_text,
  sort_order = EXCLUDED.sort_order;

-- Output verification query
SELECT * FROM service_areas WHERE area IN ('Bashundhara R/A', 'Dhanmondi', 'Mohammadpur', 'Uttara') ORDER BY sort_order;
