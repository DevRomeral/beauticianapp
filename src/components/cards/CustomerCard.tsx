'use client';

import { Customer } from '@/types/customer.model';
import { getDateDay } from '@/utils/format/DateFormat';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import Button from '../inputs/Button';
import Card from './Card';
import DiseaseCard from './DiseaseCard';

export interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const t = useTranslations('Components.CustomerCard');
  const router = useRouter();

  const viewDetails = () => {
    router.push(`/clientes/${customer.id}`);
  };

  return (
    <Card id={customer.id}>
      <div className="flex justify-between">
        <span className="text-xl font-bold uppercase">{customer.name}</span>
        <span className="text-lg font-semibold">{customer.age?.toString()}</span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-base text-secondary-600">
          <CalendarIcon className="h-4 w-4" />
          <span className="lowercase">{t('last-appointment')}</span>
        </div>
        <span className="lowercase">{getDateDay(customer.lastAppointment)}</span>
      </div>
      {customer.diseases.length > 0 && (
        <div className="flex gap-2">
          {customer.diseases.map((disease) => (
            <DiseaseCard diseaseId={disease} key={disease} customerId={customer.id} />
          ))}
        </div>
      )}
      <div className="flex flex-row-reverse">
        <Button text="Detalles" onClick={viewDetails} />
      </div>
    </Card>
  );
};

export default CustomerCard;
