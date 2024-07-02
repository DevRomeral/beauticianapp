'use client';

import { FetchDiseases } from '@/services/api/ApiDiseaseService';
import { IDisease } from '@/types/disease.model';
import { filterDiseaseById } from '@/utils/filters/DiseaseFilters';
import { useEffect, useState } from 'react';

export interface CustomerCardProps {
  diseaseId: string;
  customerId?: string;
  onClickHandler?: (event: React.MouseEvent<HTMLElement>) => void | Promise<void>;
}

const DiseaseCard: React.FC<CustomerCardProps> = ({ diseaseId, customerId, onClickHandler }) => {
  // TODO: pensar cómo recuperar los nombres, no es posible que toda la lista se cargue aquí.
  // para probar está ok, pero en un futuro el padre componente de estos deberá tener la lista completa
  const [listDiseases, setListDiseases] = useState<IDisease[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setListDiseases(await FetchDiseases());
    };

    fetchData();
  }, []);

  const disease = filterDiseaseById(listDiseases, diseaseId);

  return (
    <span
      className="rounded-sm bg-secondary-100 px-2 py-0 text-sm text-secondary-500"
      onClick={onClickHandler}
      data-diseaseid={diseaseId}
      id={`${customerId}_${diseaseId}`}
    >
      {disease?.name}
    </span>
  );
};

export default DiseaseCard;
