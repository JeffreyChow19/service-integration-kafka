import { Pool } from 'pg';
import { Availability } from '@type/Availability';

export class AvailabilityRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'borromeus_hospital', // Change this based on which hospital you want to interact with
      password: 'postgres',
      port: 5433, // Change this if needed
    });
  }

  // Create one availability
  public async create(availability: Availability): Promise<void> {
    await this.pool.query(
      `
      INSERT INTO availabilities (doctor_name, specialization, time) 
      VALUES ($1, $2, $3)
      `,
      [availability.doctor.name, availability.doctor.specialization, availability.time],
    );
  }

  // Create multiple availabilities
  public async createMany(availabilities: Availability[]): Promise<void> {
    const values = availabilities
      .map(
        (availability) => `(${availability.doctor.name}, ${availability.doctor.specialization}, ${availability.time})`,
      )
      .join(',');

    await this.pool.query(
      `
      INSERT INTO availabilities (doctor_name, specialization, time) 
      VALUES ${values}
      `,
    );
  }

  // Delete an availability by ID
  public async delete(id: number): Promise<void> {
    await this.pool.query('DELETE FROM availabilities WHERE id = $1', [id]);
  }

  // Get all availabilities
  public async getAll(): Promise<Availability[]> {
    const result = await this.pool.query(`
      SELECT id, doctor_name AS "doctor.name", specialization AS "doctor.specialization", time 
      FROM availabilities
    `);
    return result.rows;
  }
}
