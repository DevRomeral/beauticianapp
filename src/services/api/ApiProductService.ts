'use server';

import { IProduct } from '@/types/product.model';
import { filterProducts } from '@/utils/filters/ProductFilters';
// import axios from 'axios';

const dummyResults: IProduct[] = [
  {
    id: '1',
    name: 'Pedicura',
    category: 'Pedicura',
    estimatedtime: 40,
    price: 3500,
  },
  {
    id: '2',
    name: 'Cambio de Imagen',
    category: 'Radical',
    estimatedtime: 210,
    price: 12345,
  },
  {
    id: '3',
    name: 'Boli Bic',
    category: 'Regalos',
    estimatedtime: 0,
    price: 0,
  },
];

export async function fetchProducts(query: string): Promise<IProduct[]> {
  // TODO: implementar llamada al server
  return filterProducts(dummyResults, query);
}

export async function getProductById(id: string): Promise<IProduct | null> {
  // TODO: implementar llamada al server
  const response = dummyResults.filter((product) => product.id === id);
  if (response.length == 0) return null;
  return response[0];
}

export async function saveProduct(product: IProduct): Promise<IProduct | null> {
  // TODO: implementar llamada al server

  // Simulamos que se crea un nuevo id si es nuevo
  if (product.id === '') product.id = 'nuevo';
  return product;
}
