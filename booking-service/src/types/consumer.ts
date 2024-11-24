export interface Doctor {
  name: string;
  specialization: string;
}

export interface Availability {
  doctor: Doctor;
  time: string;
}
