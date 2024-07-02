'use server';

import { IDisease } from '@/types/disease.model';

// import axios from 'axios';

const dummyResults: IDisease[] = [
  {
    id: '1',
    name: 'Hipocondría',
  },
  {
    id: '2',
    name: 'Alergía a graminia',
  },
];

export async function FetchDiseases(): Promise<IDisease[]> {
  // TODO: implementar llamada al server
  return dummyResults;
}
