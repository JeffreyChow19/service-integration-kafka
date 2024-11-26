import { Pool } from 'pg';
import { Availability } from '@type/Availability';

export class AvailabilityRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'hasan_sadikin_hospital',
      password: 'postgres',
      port: 5434,
    });
  }

  // Create a single availability
  public async create(availability: Availability): Promise<void> {
    const { doctor_name, specialization, time } = availability;
    const query = `
      INSERT INTO availabilities (doctor_name, specialization, time)
      VALUES ($1, $2, $3)
    `;
    await this.pool.query(query, [doctor_name, specialization, time]);
  }

  // Create multiple availabilities
  public async createMany(availabilities: Availability[]): Promise<void> {
    const query = `
      INSERT INTO availabilities (doctor_name, specialization, time)
      VALUES
      ${availabilities
    .map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`)
    .join(', ')}
    `;
    const params = availabilities.flatMap(({ doctor_name, specialization, time }) => [
      doctor_name,
      specialization,
      time,
    ]);

    await this.pool.query(query, params);
  }

  // Delete an availability by ID
  public async delete(id: number): Promise<void> {
    const query = 'DELETE FROM availabilities WHERE id = $1';
    await this.pool.query(query, [id]);
  }

  // Get all availabilities
  public async getAll(): Promise<Availability[]> {
    const result = await this.pool.query('SELECT * FROM availabilities');
    return result.rows;
  }
}
