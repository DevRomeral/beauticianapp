import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { LanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import { mockFetchCustomers, mockGetCustomerById, mockSaveCustomer } from '@/__mocks__/services/api/ApiCustomerService';
import { mockFetchDiseases } from '@/__mocks__/services/api/ApiDiseaseService';
import { AlertProvider } from '@/contexts/AlertContext';
import EditarClienteForm, { FormConfig } from '@/screens/clientes/EditarClienteForm';
import { ICustomer } from '@/types/customer.model';
import { IDisease } from '@/types/disease.model';
import { getAge, getDateValueAsString, getDateValueFromString } from '@/utils/format/DateFormat';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AlertDialog from '@/components/alerts/AlertDialog';

jest.mock('@/services/api/ApiCustomerService', () => ({
  FetchCustomers: mockFetchCustomers,
  getCustomerById: mockGetCustomerById,
  saveCustomer: mockSaveCustomer,
}));

jest.mock('@/services/api/ApiDiseaseService', () => ({
  FetchDiseases: mockFetchDiseases,
}));

const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
    replace: mockRouterReplace,
  }),
}));

describe('EditarClientesForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render initially', () => {
    const existingCustomerId = '1';
    render(
      <LanguageWrapper>
        <AlertProvider>
          <AlertDialog />
          <EditarClienteForm customerId={existingCustomerId} />
        </AlertProvider>
      </LanguageWrapper>,
    );

    expect(screen.getByText(LanguageConfig.messages.Clientes.CrearEditar.title.edit)).toBeInTheDocument();
  });

  it('should create a new user by the form', async () => {
    const birthdayString = '2001-01-01';
    const birthdayDate = getDateValueFromString(birthdayString);

    const dummyCustomer = {
      id: '',
      name: 'Gustavo',
      age: getAge(birthdayDate),
      birthday: birthdayDate,
      lastAppointment: null,
      diseases: ['1'],
    };

    const dummyDisease: IDisease = {
      id: '1',
      name: 'first',
    };
    const dummyListDiseases: IDisease[] = [dummyDisease];

    mockGetCustomerById.mockImplementationOnce(() => Promise.resolve(null));
    mockFetchDiseases.mockImplementationOnce(() => Promise.resolve(dummyListDiseases));

    render(
      <LanguageWrapper>
        <AlertProvider>
          <AlertDialog />
          <EditarClienteForm customerId={dummyCustomer.id} />
        </AlertProvider>
      </LanguageWrapper>,
    );

    expect(screen.getByText(LanguageConfig.messages.Clientes.CrearEditar.title.create)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId(FormConfig.tfNameId)).toBeInTheDocument();
    });

    const inputName = screen.getByTestId(FormConfig.tfNameId) as HTMLInputElement;
    const inputBirthday = screen.getByTestId(FormConfig.iBirthdayDateId) as HTMLInputElement;
    const selectDisease = screen.getByTestId(FormConfig.selectDiseasesId) as HTMLSelectElement;
    const btnAddDisease = screen.getByTestId(FormConfig.btnAddDiseaseId) as HTMLButtonElement;
    const btnSave = screen.getByTestId(FormConfig.btnSaveId) as HTMLButtonElement;

    expect(inputName.value).toBe('');
    expect(inputBirthday.value).toBe(getDateValueAsString(new Date(Date.now())));

    fireEvent.change(inputName, { target: { value: dummyCustomer.name } });
    fireEvent.change(inputBirthday, { target: { value: birthdayString } });

    fireEvent.change(selectDisease, { target: { value: dummyDisease.id } });
    fireEvent.click(btnAddDisease);

    await waitFor(() => {
      expect(selectDisease.value).toBe(dummyDisease.id);
    });

    const id = '1';
    const expectedCustomer = { ...dummyCustomer, id };
    mockSaveCustomer.mockImplementation(() => expectedCustomer);

    fireEvent.click(btnSave);

    await waitFor(() => {
      expect(mockSaveCustomer).toHaveBeenCalledWith(dummyCustomer);
    });
  });

  it('should display already created customer info', async () => {
    const dummyCustomer: ICustomer = {
      id: '2',
      name: 'Miguel',
      age: 28,
      birthday: new Date(1996, 0, 12),
      lastAppointment: new Date(2024, 5, 27, 12, 34),
      diseases: ['1', '2'],
    };

    mockGetCustomerById.mockImplementationOnce(() => {
      return Promise.resolve(dummyCustomer);
    });

    render(
      <LanguageWrapper>
        <AlertProvider>
          <AlertDialog />
          <EditarClienteForm customerId={dummyCustomer.id} />
        </AlertProvider>
      </LanguageWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(FormConfig.tfNameId)).toBeInTheDocument();
    });

    expect(screen.getByText(LanguageConfig.messages.Clientes.CrearEditar.title.edit)).toBeInTheDocument();

    const inputName = screen.getByTestId(FormConfig.tfNameId) as HTMLInputElement;
    expect(inputName.value).toBe(dummyCustomer.name);
    const inputBirthday = screen.getByTestId(FormConfig.iBirthdayDateId) as HTMLInputElement;
    expect(inputBirthday.value).toBe(getDateValueAsString(dummyCustomer.birthday));

    fireEvent.click(screen.getByTestId(FormConfig.btnSaveId));

    await waitFor(() => {
      expect(mockSaveCustomer).toHaveBeenCalledTimes(1);
    });
  });

  it('should display other screen if not customer was found', async () => {
    const customerId = '1';

    mockGetCustomerById.mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    render(
      <LanguageWrapper>
        <AlertProvider>
          <AlertDialog />
          <EditarClienteForm customerId={customerId} />
        </AlertProvider>
      </LanguageWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText(LanguageConfig.messages.Clientes.NotFound.description)).toBeInTheDocument();
    });
  });
});
