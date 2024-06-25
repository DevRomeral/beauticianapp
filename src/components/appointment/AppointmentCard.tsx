import { getDateTime } from '@/services/customize/date-service';

export interface Appointment {
  date: Date;
  customer: string;
  service: string;
}

const AppointmentCard: React.FC<Appointment> = ({ date, customer, service }) => {
  return (
    <div className="flex flex-col gap-1 rounded-sm px-2 py-2 shadow-md">
      <div className="flex flex-row gap-4">
        <span className="text-secondary-500">{getDateTime(date)}</span>
        <span className="font-semibold">{customer}</span>
      </div>
      <div className="pl-5">
        <span className="text-2xl">{service}</span>
      </div>
    </div>
  );
};

export default AppointmentCard;
