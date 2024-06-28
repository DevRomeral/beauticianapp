'use server';

import { Customer } from '@/types/customer.model';
import { filterCustomers } from '@/utils/filters/CustomerFilters';
// import axios from 'axios';

export async function FetchCustomers(query: string): Promise<Customer[]> {
  // TODO: implementar llamada al server
  const dummyResults: Customer[] = [
    {
      id: '1',
      name: 'Gustavo',
      age: 22,
      lastAppointment: new Date(2024, 0, 1, 12, 34),
      diseases: [],
    },
    {
      id: '2',
      name: 'Miguel',
      age: 28,
      lastAppointment: new Date(2024, 5, 27, 12, 34),
      diseases: ['hipocondría', 'pereza'],
    },
  ];
  return filterCustomers(dummyResults, query);
}
