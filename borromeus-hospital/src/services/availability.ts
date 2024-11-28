import { Availability } from '@type/Availability';
import { AvailabilityRepository } from '../repositories/availability';

export class AvailabilityService {
  private repository: AvailabilityRepository = new AvailabilityRepository();

  // Create a single availability
  public async createAvailability(availability: Availability): Promise<void> {
    await this.repository.create(availability);
  }

  // Create multiple availabilities
  public async createManyAvailabilities(availabilities: Availability[]): Promise<void> {
    await this.repository.createMany(availabilities);
  }

  // Delete an availability by ID
  public async deleteAvailability(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Get all availabilities
  public async getAllAvailabilities(): Promise<Availability[]> {
    return this.repository.getAll();
  }
}
