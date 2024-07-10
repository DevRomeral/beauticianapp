import { getDateTime } from '@/utils/format/DateFormat';

import Card from '../cards/Card';

export interface Appointment {
  date: Date;
  customer: string;
  service: string;
}

const AppointmentCard: React.FC<Appointment> = ({ date, customer, service }) => {
  // TODO: crear un id para esta carta
  return (
    <Card id={'todo'}>
      <div className="flex flex-row gap-4">
        <span className="text-secondary-500">{getDateTime(date)}</span>
        <span className="font-semibold">{customer}</span>
      </div>
      <div className="pl-5">
        <span className="text-2xl">{service}</span>
      </div>
    </Card>
  );
};

export default AppointmentCard;
