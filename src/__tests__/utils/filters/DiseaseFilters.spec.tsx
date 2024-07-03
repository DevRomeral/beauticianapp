import { IDisease } from '@/types/disease.model';
import { filterDiseaseById, getEveryDiseaseIdExcept } from '@/utils/filters/DiseaseFilters';

const dummyDisease1: IDisease = {
  id: '1',
  name: 'first',
};
const dummyDisease2: IDisease = {
  id: '2',
  name: 'second',
};

const dummyDiseases: IDisease[] = [dummyDisease1, dummyDisease2];

describe('DiseaseFilters', () => {
  it('should filter the disease by its id', async () => {
    const results = filterDiseaseById(dummyDiseases, dummyDisease1.id);
    expect(results).toBe(dummyDisease1);
  });

  it('should return every id except one', async () => {
    const listIds = ['1', '2', '3'];
    const results = getEveryDiseaseIdExcept(listIds, '3');
    expect(results.length).toBe(2);
    expect(results).not.toContain('3');
  });
});
