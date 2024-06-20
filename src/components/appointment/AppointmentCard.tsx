import { getDateTime } from '@/services/customize/date-service';
import { Appointment } from '@/types/appointments/appointment.model';

export default function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex flex-col gap-1 rounded-sm px-2 py-2 shadow-md">
      <div className="flex flex-row gap-4">
        <span className="text-secondary-500">{getDateTime(appointment.date)}</span>
        <span className="font-semibold">{appointment.customer}</span>
      </div>
      <div className="pl-5">
        <span className="text-2xl">{appointment.service}</span>
      </div>
    </div>
  );
}
