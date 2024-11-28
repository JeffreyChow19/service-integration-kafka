-- (Optional) Verify the publication setup
-- SELECT * FROM pg_publication;

-- Create the availabilities table for Hasan Sadikin Hospital
CREATE TABLE availabilities (
    id SERIAL PRIMARY KEY,
    doctor_name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    time TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set the WAL level to logical for CDC
ALTER SYSTEM SET wal_level = logical;

-- Reload the PostgreSQL configuration to apply changes
SELECT pg_reload_conf();

-- Create a publication for the `availabilities` table to capture changes
CREATE PUBLICATION hospital_availability_pub FOR TABLE availabilities;

-- Insert mock data
INSERT INTO availabilities (doctor_name, specialization, time) VALUES
('Charlie', 'Cardiologist', '2024-11-27 08:00:00+07'),
('David', 'Orthopedic', '2024-11-27 09:00:00+07'),
('Fay', 'Pediatrician', '2024-11-27 10:00:00+07');
