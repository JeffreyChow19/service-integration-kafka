export type Availability = {
  id: number; // Include id to match the database
  doctor_name: string; // Change to match the database column
  specialization: string; // Change to match the database column
  time: string; // The time format will match TIMESTAMPTZ in ISO format
  created_at: string; // The database's default timestamp
  updated_at: string; // The database's default timestamp
};
