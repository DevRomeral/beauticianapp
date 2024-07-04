import { getDateTime } from '@/utils/format/DateFormat';

export interface Appointment {
  date: Date;
  customer: string;
  service: string;
}

const AppointmentCard: React.FC<Appointment> = ({ date, customer, service }) => {
  return (
    <div className="bg-background-50 rounded-card flex flex-col gap-1 px-2 py-2">
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
