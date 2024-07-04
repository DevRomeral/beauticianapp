import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { LanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import ClienteNotFound, { ClienteNotFoundConfig } from '@/screens/clientes/ClienteNotFound';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockRouterBack = jest.fn();
const mockRouterReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    back: mockRouterBack,
    replace: mockRouterReplace,
  }),
}));

describe('EditarClientesForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render initially', () => {
    render(
      <LanguageWrapper>
        <ClienteNotFound />
      </LanguageWrapper>,
    );

    expect(screen.getByText(LanguageConfig.messages.Clientes.NotFound.description)).toBeInTheDocument();
    expect(screen.getByText(LanguageConfig.messages.Clientes.NotFound.form.createNew.title)).toBeInTheDocument();
    expect(screen.getByText(LanguageConfig.messages.Clientes.NotFound.form.goBack.title)).toBeInTheDocument();
  });

  it('should go back if button pressed', async () => {
    render(
      <LanguageWrapper>
        <ClienteNotFound />
      </LanguageWrapper>,
    );

    expect(screen.getByText(LanguageConfig.messages.Clientes.NotFound.form.goBack.title)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(ClienteNotFoundConfig.btnGoBackId));

    await waitFor(() => {
      expect(mockRouterBack).toHaveBeenCalledTimes(1);
    });
  });

  it('should go to create new customer if button pressed', async () => {
    render(
      <LanguageWrapper>
        <ClienteNotFound />
      </LanguageWrapper>,
    );

    expect(screen.getByText(LanguageConfig.messages.Clientes.NotFound.form.createNew.title)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(ClienteNotFoundConfig.btnGoToNewCustomerId));

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledTimes(1);
    });
  });
});
