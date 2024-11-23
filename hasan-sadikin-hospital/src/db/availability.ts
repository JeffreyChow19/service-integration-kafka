import { defaultAvailability } from '@constants/availability';
import { Availability } from '@type/Availability';

export class AvailabilityDB {
  private static instance: AvailabilityDB;

  private data: Availability[];

  private constructor() {
    this.data = [...defaultAvailability];
  }

  // Singleton instance getter
  public static getInstance(): AvailabilityDB {
    if (!AvailabilityDB.instance) {
      AvailabilityDB.instance = new AvailabilityDB();
    }
    return AvailabilityDB.instance;
  }

  public get(): Availability[] {
    return this.data;
  }

  public set(newAvailability: Availability[]): void {
    this.data = newAvailability;
  }
}
