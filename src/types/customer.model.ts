export interface Customer {
  id: string;
  name: string;
  age: number;
  lastAppointment: Date | null;
  diseases: string[];
}
