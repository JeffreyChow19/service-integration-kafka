import { Availability } from '@type/Availability';

export const defaultAvailability: Availability[] = [
  {
    doctor: { name: 'John', specialization: 'Dentist' },
    time: '09:00-10:00',
  },
  {
    doctor: { name: 'Doe', specialization: 'Orthopedic' },
    time: '10:00-11:00',
  },
  {
    doctor: { name: 'Jim', specialization: 'General Surgeon' },
    time: '11:00-12:00',
  },
];
