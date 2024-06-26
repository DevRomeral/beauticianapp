import { mockBackendJWTConfig } from '@/__mocks__/configs/BackendJWTConfig';
import { mockParseCookies } from '@/__mocks__/JWT';
import WelcomeForm from '@/screens/user/welcome/WelcomeForm';
import * as ApiUserService from '@/services/api/ApiUserService';
import { SignedInUser } from '@/types/api/user/signed-in-user.model';
import { SignedUpUser } from '@/types/api/user/signed-up-user.model';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('@/configs/BackendJWTConfig', () => ({
  backendJWTConfig: mockBackendJWTConfig,
}));

jest.mock('nookies', () => ({
  parseCookies: mockParseCookies,
}));

jest.mock('@/services/api/ApiUserService');

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
  }),
}));

describe('WelcomeForm', () => {
  const idEmailInput = 'email';
  const idLoginPassword = 'password';
  const idLoginButton = 'btnLogin';
  const idRegisterPassword1 = 'password1';
  const idRegisterPassword2 = 'password2';
  const idRegisterButton = 'btnRegister';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome form', () => {
    render(<WelcomeForm />);

    // está el input de email pero no el de los otros fragmentos
    expect(screen.getByTestId(idEmailInput)).toBeInTheDocument();
    expect(screen.queryByTestId(idLoginPassword)).not.toBeInTheDocument();
    expect(screen.queryByTestId(idRegisterPassword1)).not.toBeInTheDocument();
    expect(screen.queryByTestId(idRegisterPassword2)).not.toBeInTheDocument();
  });

  it('user verified; login ok', async () => {
    render(<WelcomeForm />);

    const emailInput = screen.getByTestId(idEmailInput);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(idLoginPassword)).not.toBeInTheDocument();

    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';

    (ApiUserService.VerifyUser as jest.Mock).mockImplementationOnce(() => Promise.resolve(true));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(ApiUserService.VerifyUser).toHaveBeenCalledTimes(1);
    });

    const passwordInput = screen.getByTestId(idLoginPassword);
    const btnLogin = screen.getByTestId(idLoginButton);

    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    (ApiUserService.SignIn as jest.Mock).mockImplementationOnce(
      (): Promise<SignedInUser> => Promise.resolve({ access_token: 'token', ok: true }),
    );

    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    fireEvent.click(btnLogin);

    await waitFor(() => {
      expect(ApiUserService.SignIn).toHaveBeenCalledTimes(1);
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/profile');
  });

  it('user verified; login fails, error displayed', async () => {
    render(<WelcomeForm />);
    const errorMessage = 'Usuario o contraseña no válidos';

    const emailInput = screen.getByTestId(idEmailInput);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(idLoginPassword)).not.toBeInTheDocument();

    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';

    (ApiUserService.VerifyUser as jest.Mock).mockImplementationOnce(() => Promise.resolve(true));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(ApiUserService.VerifyUser).toHaveBeenCalledTimes(1);
    });

    const passwordInput = screen.getByTestId(idLoginPassword);
    const btnLogin = screen.getByTestId(idLoginButton);

    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    (ApiUserService.SignIn as jest.Mock).mockImplementationOnce(
      (): Promise<SignedInUser> => Promise.resolve({ access_token: '', ok: false }),
    );

    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    fireEvent.click(btnLogin);

    await waitFor(() => {
      expect(ApiUserService.SignIn).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('user not verified; register ok', async () => {
    render(<WelcomeForm />);
    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';

    const emailInput = screen.getByTestId(idEmailInput);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(idLoginPassword)).not.toBeInTheDocument();

    (ApiUserService.VerifyUser as jest.Mock).mockImplementationOnce(() => Promise.resolve(false));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(ApiUserService.VerifyUser).toHaveBeenCalledTimes(1);
    });

    const password1Input = screen.getByTestId(idRegisterPassword1);
    const password2Input = screen.getByTestId(idRegisterPassword2);
    const btnRegister = screen.getByTestId(idRegisterButton);

    expect(password1Input).toBeInTheDocument();
    expect(password2Input).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();

    (ApiUserService.SignUp as jest.Mock).mockImplementationOnce(
      (): Promise<SignedUpUser> => Promise.resolve({ access_token: 'token', ok: true }),
    );

    fireEvent.change(password1Input, { target: { value: mockPassword } });
    fireEvent.change(password2Input, { target: { value: mockPassword } });
    fireEvent.click(btnRegister);

    await waitFor(() => {
      expect(ApiUserService.SignUp).toHaveBeenCalledTimes(1);
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/profile');
  });

  it('user not verified; register fails, error displayed', async () => {
    render(<WelcomeForm />);
    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';
    const errorMessage = 'Error al registrar al usuario';

    const emailInput = screen.getByTestId(idEmailInput);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(idLoginPassword)).not.toBeInTheDocument();

    (ApiUserService.VerifyUser as jest.Mock).mockImplementationOnce(() => Promise.resolve(false));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(ApiUserService.VerifyUser).toHaveBeenCalledTimes(1);
    });

    const password1Input = screen.getByTestId(idRegisterPassword1);
    const password2Input = screen.getByTestId(idRegisterPassword2);
    const btnRegister = screen.getByTestId(idRegisterButton);

    expect(password1Input).toBeInTheDocument();
    expect(password2Input).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();

    (ApiUserService.SignUp as jest.Mock).mockImplementationOnce(
      (): Promise<SignedUpUser> => Promise.resolve({ access_token: 'token', ok: false }),
    );

    fireEvent.change(password1Input, { target: { value: mockPassword } });
    fireEvent.change(password2Input, { target: { value: mockPassword } });
    fireEvent.click(btnRegister);

    await waitFor(() => {
      expect(ApiUserService.SignUp).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
