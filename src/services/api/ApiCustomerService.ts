'use server';

import { Customer } from '@/types/customer.model';
import { filterCustomers } from '@/utils/filters/CustomerFilters';
// import axios from 'axios';

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

export async function FetchCustomers(query: string): Promise<Customer[]> {
  // TODO: implementar llamada al server

  return filterCustomers(dummyResults, query);
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  // TODO: implementar llamada al server
  const response = dummyResults.filter((customer) => customer.id === id);
  if (response.length == 0) return null;
  return response[0];
}

export async function saveCustomer(customer: Customer): Promise<Customer | null> {
  // TODO: implementar llamada al server

  // Simulamos que se crea un nuevo id si es nuevo
  if (customer.id === '') customer.id = 'nuevo';
  return customer;
}
