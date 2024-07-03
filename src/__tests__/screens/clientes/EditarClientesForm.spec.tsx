import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { LanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import { AlertProvider } from '@/contexts/AlertContext';
import EditarClienteForm from '@/screens/clientes/EditarClienteForm';
import * as ApiCustomerService from '@/services/api/ApiCustomerService';
import { Customer } from '@/types/customer.model';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AlertDialog from '@/components/alerts/AlertDialog';

jest.mock('@/services/api/ApiCustomerService');

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
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
});
