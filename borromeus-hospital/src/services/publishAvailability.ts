import { AvailabilityDB } from '@db/availability';
import { Availability } from '@type/Availability';

export const publishAvailability = () => {
  const availability: Availability[] = AvailabilityDB.getInstance().get();
  console.log('Publishing availability:', availability);
};
