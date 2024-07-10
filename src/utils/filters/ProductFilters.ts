import { IProduct } from '@/types/product.model';

export function filterProducts(customers: IProduct[], searchTerm: string): IProduct[] {
  const main = searchTerm.toLocaleLowerCase();

  return customers.filter((product) => {
    const matchesName = product.name.toLocaleLowerCase().includes(main);
    const matchesCategory = product.category.toString().includes(main);

    return matchesName || matchesCategory;
  });
}
