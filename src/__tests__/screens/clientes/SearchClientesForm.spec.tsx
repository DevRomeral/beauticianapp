import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import SearchClientesForm, {
  SearchClientsFormConfig as SearchClientesFormConfig,
} from '@/screens/clientes/SearchClientesForm';
import * as ApiCustomerService from '@/services/api/ApiCustomerService';
import { Customer } from '@/types/customer.model';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('@/services/api/ApiCustomerService');

describe('SearchClientesForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render initially', () => {
    render(
      <LanguageWrapper>
        <SearchClientesForm />
      </LanguageWrapper>,
    );

    expect(screen.getByText('Clientes.title')).toBeInTheDocument();
    expect(screen.getByTestId(SearchClientesFormConfig.formId)).toBeInTheDocument();
    expect(screen.getByTestId(SearchClientesFormConfig.queryTextId)).toBeInTheDocument();
    expect(screen.queryByTestId(SearchClientesFormConfig.panelNotFoundId)).not.toBeInTheDocument();
  });

  it('should fetch users given a query text', async () => {
    render(
      <LanguageWrapper>
        <SearchClientesForm />
      </LanguageWrapper>,
    );

    const queryValue = 'customer';

    const queryInput = screen.getByTestId(SearchClientesFormConfig.queryTextId);
    expect(queryInput).toBeInTheDocument();

    const fetchedCustomers: Customer[] = [
      { id: '1', name: 'Customer Name', age: 11, lastAppointment: new Date(2024, 0, 1, 12, 34), diseases: [] },
    ];

    (ApiCustomerService.FetchCustomers as jest.Mock).mockImplementationOnce(() => Promise.resolve(fetchedCustomers));

    fireEvent.change(queryInput, { target: { value: queryValue } });
    fireEvent.focusOut(queryInput);

    await waitFor(() => {
      expect(ApiCustomerService.FetchCustomers).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId(fetchedCustomers[0].id)).toBeInTheDocument();
    expect(screen.getByText(fetchedCustomers[0].name)).toBeInTheDocument();
    expect(screen.queryByTestId(SearchClientesFormConfig.panelNotFoundId)).not.toBeInTheDocument();
  });

  it('should show a not found panel if not users were fetched', async () => {
    render(
      <LanguageWrapper>
        <SearchClientesForm />
      </LanguageWrapper>,
    );

    const queryValue = 'customer';

    const queryInput = screen.getByTestId(SearchClientesFormConfig.queryTextId);
    expect(queryInput).toBeInTheDocument();

    const fetchedCustomers: Customer[] = [];

    (ApiCustomerService.FetchCustomers as jest.Mock).mockImplementationOnce(() => Promise.resolve(fetchedCustomers));

    fireEvent.change(queryInput, { target: { value: queryValue } });
    fireEvent.focusOut(queryInput);

    await waitFor(() => {
      expect(ApiCustomerService.FetchCustomers).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId(SearchClientesFormConfig.panelNotFoundId)).toBeInTheDocument();
  });

  it('should show a not found panel if not query sent', async () => {
    render(
      <LanguageWrapper>
        <SearchClientesForm />
      </LanguageWrapper>,
    );

    const queryInput = screen.getByTestId(SearchClientesFormConfig.queryTextId);
    expect(queryInput).toBeInTheDocument();

    (ApiCustomerService.FetchCustomers as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));

    fireEvent.change(queryInput, { target: { value: 'anything' } });
    fireEvent.focusOut(queryInput);

    await waitFor(() => {
      expect(ApiCustomerService.FetchCustomers).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(queryInput, { target: { value: '' } });
    fireEvent.focusOut(queryInput);

    expect(ApiCustomerService.FetchCustomers).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId(SearchClientesFormConfig.panelNotFoundId)).toBeInTheDocument();
  });
});
