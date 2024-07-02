import { ICustomer } from '@/types/customer.model';

/**
 * Filtra una lista de clientes por varios criterios
 * @param customers Lista completa de clientes
 * @param searchTerm Texto de búsqueda
 * @returns Lista de clientes filtrados
 */
export function filterCustomers(customers: ICustomer[], searchTerm: string): ICustomer[] {
  const main = searchTerm.toLocaleLowerCase();

  return customers.filter((customer) => {
    const matchesName = customer.name.toLocaleLowerCase().includes(main);
    const matchesAge = customer.age.toString().includes(main);
    const matchesId = customer.id.toLocaleLowerCase().includes(main);
    const matchesDiseases = customer.diseases.some((disease) => disease.toLocaleLowerCase().includes(main));

    return matchesName || matchesAge || matchesId || matchesDiseases;
  });
}
