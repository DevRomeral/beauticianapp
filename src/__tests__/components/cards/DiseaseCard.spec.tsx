import { mockFetchDiseases } from '@/__mocks__/services/api/ApiDiseaseService';
import { IDisease } from '@/types/disease.model';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DiseaseCard, { CardConfig } from '@/components/cards/DiseaseCard';

jest.mock('@/services/api/ApiDiseaseService', () => ({
  FetchDiseases: mockFetchDiseases,
}));

describe('DiseaseCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const customerId = undefined;
    const disease: IDisease = { id: '1', name: 'name' };
    const onClickHandler = jest.fn();

    mockFetchDiseases.mockImplementation((): IDisease[] => [disease]);

    render(<DiseaseCard diseaseId={disease.id} customerId={customerId} onClickHandler={onClickHandler} />);

    await waitFor(() => {
      expect(screen.getByText(disease.name)).toBeInTheDocument();
    });

    const card = screen.getByTestId(CardConfig.getCardId(customerId, disease.id));
    expect(card).toBeInTheDocument();
    fireEvent.click(card);

    await waitFor(() => {
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
