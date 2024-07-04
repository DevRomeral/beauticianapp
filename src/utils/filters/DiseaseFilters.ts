import { IDisease } from '@/types/disease.model';

export function filterDiseaseById(list: IDisease[], id: string): IDisease | null {
  if (list == null || list.length == 0) return null;

  const results = list.filter((disease) => disease.id == id);
  if (results.length != 1) return null;

  return results[0];
}

export function getEveryDiseaseIdExcept(listIds: string[], id: string): string[] {
  return listIds.filter((diseaseId) => diseaseId != id);
}
