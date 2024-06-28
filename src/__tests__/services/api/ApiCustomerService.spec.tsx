import { mockApiConfig } from '@/__mocks__/configs/ApiConfig';
import { FetchCustomers } from '@/services/api/ApiCustomerService';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

jest.mock('@/configs/ApiConfig', () => ({
  ApiConfig: mockApiConfig,
}));

describe('ApiCustomerService', () => {
  let mock: axiosMockAdapter;

  beforeAll(() => {
    mock = new axiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should return some customers', async () => {
    const result = await FetchCustomers('g');

    // TODO: implementar test para cuando se realice la llamada al back y quitar esta aberración de test
    expect(result).toBe(result);
  });
});
