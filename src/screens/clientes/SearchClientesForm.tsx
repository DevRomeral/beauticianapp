'use client';

import { FetchCustomers } from '@/services/api/ApiCustomerService';
import { Customer } from '@/types/customer.model';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CustomerCard from '@/components/cards/CustomerCard';
import DebugInfo from '@/components/DebugInfo';
import PageTitle from '@/components/display/PageTitle';
import { ButtonProps } from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

export interface ISearchClientesFormConfig {
  formId: string;
  queryTextId: string;
  panelNotFoundId: string;
}

export const SearchClientsFormConfig: ISearchClientesFormConfig = {
  formId: 'searchCustomersForm',
  queryTextId: 'queryTextInput',
  panelNotFoundId: 'customersNotFound',
};

export default function SearchClientesForm() {
  const t = useTranslations('Clientes');
  const router = useRouter();
  const [noResultsPanelVisible, setNoResultsPanelVisible] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const darAltaCliente = () => {
    router.push('/clientes/crear');
  };

  const buttonProps: ButtonProps = {
    id: 'btnDarAlta',
    text: t('form.buttonNew.title'),
    onClick: darAltaCliente,
    icon: 'user-plus',
  };

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const queryText = event.target.value.toLocaleLowerCase();

      if (queryText.length == 0) {
        setFilteredCustomers([]);
        setNoResultsPanelVisible(true);
        return;
      }

      // TODO: en este momento no tiene sentido filtrar, porque el back ya te lo debe dar filtrado, no? De ser así, quitar el filtro de clientes
      const customers = await FetchCustomers(queryText);

      setFilteredCustomers(customers);
      setNoResultsPanelVisible(customers.length == 0);
    } catch (err) {
      console.error(err);
      console.error('Error when fetching clients');
    }
  };
  return (
    <div className="container mx-auto">
      <PageTitle title={t('title')} btnProps={buttonProps} />
      <DebugInfo>
        <p>Prueba a buscar nuestros nombres o solo la legra G</p>
      </DebugInfo>
      <form id={SearchClientsFormConfig.formId} data-testid={SearchClientsFormConfig.formId}>
        <TextField
          id={SearchClientsFormConfig.queryTextId}
          label={t('form.main.label')}
          placeholder={t('form.main.placeholder')}
          type="text"
          onChangeHandler={onChangeHandler}
        />
      </form>
      <div className="mt-6">
        {(noResultsPanelVisible && (
          <div id={SearchClientsFormConfig.panelNotFoundId} data-testid={SearchClientsFormConfig.panelNotFoundId}>
            {t('no-results')}
          </div>
        )) || (
          <div className="flex flex-col gap-1">
            {filteredCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
