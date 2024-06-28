'use client';

import { Customer } from '@/types/customer.model';
import { filterCustomers } from '@/utils/filters/CustomerFilters';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import CustomerCard from '@/components/cards/CustomerCard';
import DebugInfo from '@/components/DebugInfo';
import PageTitle from '@/components/display/PageTitle';
import { ButtonProps } from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

export const dummyCustomers: Customer[] = [
  { id: '1', name: 'Gustavo', age: 22, lastAppointment: new Date(2024, 0, 1, 12, 34), diseases: [] },
  {
    id: '2',
    name: 'Miguel',
    age: 28,
    lastAppointment: new Date(2024, 5, 27, 12, 34),
    diseases: ['hipocondría', 'pereza'],
  },
];

export default function SearchClientesForm() {
  const t = useTranslations('Clientes');
  // Evita que el panel de no resultados sea visible nada más entrar
  const [noResultsPanelVisible, setNoResultsPanelVisible] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const formId = 'welcome-form';
  const mainId = 'main';

  const darAltaCliente = () => {
    alert('TODO');
  };

  const buttonProps: ButtonProps = {
    id: 'btnDarAlta',
    text: t('form.buttonNew.title'),
    onClick: darAltaCliente,
    icon: 'user-plus',
  };

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // TODO: Buscar clientes desde back
      const customers = dummyCustomers;
      const main = event.target.value.toLocaleLowerCase();
      console.log(main);

      if (main.length > 0) {
        setFilteredCustomers(filterCustomers(customers, main));
      } else {
        setFilteredCustomers([]);
      }
    } catch (err) {
      console.error('Error when fetching clients');
    }
    // La primera vez que hagamos una búsqueda lo ponemos
    if (!noResultsPanelVisible) setNoResultsPanelVisible(true);
  };
  return (
    <div className="container mx-auto">
      <PageTitle title={t('title')} btnProps={buttonProps} />
      <DebugInfo>
        <p>Prueba a buscar nuestros nombres o solo la legra "G"</p>
      </DebugInfo>
      <form id={formId}>
        <TextField
          id={mainId}
          label={t('form.main.label')}
          placeholder={t('form.main.placeholder')}
          type="text"
          onChangeHandler={onChangeHandler}
        />
      </form>
      {noResultsPanelVisible && (
        <div className="flex flex-col gap-1">
          {(filteredCustomers.length > 0 &&
            filteredCustomers.map((customer) => <CustomerCard key={customer.id} customer={customer} />)) || (
            <div>{t('no-results')}</div>
          )}
        </div>
      )}
    </div>
  );
}
