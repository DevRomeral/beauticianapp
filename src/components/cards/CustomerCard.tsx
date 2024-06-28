'use client';

import { Customer } from '@/types/customer.model';
import { getDateDay } from '@/utils/format/DateFormat';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import Button from '../inputs/Button';

export interface CustomerCardProps {
  customer: Customer;
}

// TODO: Crear tests de CustomerCard
const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const t = useTranslations('Components.CustomerCard');

  const viewDetails = () => {
    alert('TODO');
  };

  return (
    <div className="flex flex-col gap-2 p-2 shadow-md" id={customer.id} data-testid={customer.id}>
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
            <span
              className="rounded-sm bg-secondary-100 px-2 py-0 text-sm text-secondary-500"
              key={`${customer.id}_${disease}`}
            >
              {disease}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-row-reverse">
        <Button text="Detalles" onClick={viewDetails} />
      </div>
    </div>
  );
};

export default CustomerCard;
