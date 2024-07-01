import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { mockBackendJWTConfig } from '@/__mocks__/configs/BackendJWTConfig';
import { LanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import { mockParseCookies } from '@/__mocks__/JWT';
import { mockSignIn, mockSignUp, mockVerifyUser } from '@/__mocks__/services/api/ApiCustomerService';
import { LoginFormConfig } from '@/screens/user/welcome/LoginForm';
import { RegisterFormConfig } from '@/screens/user/welcome/RegisterForm';
import WelcomeForm, { WelcomeFormConfig } from '@/screens/user/welcome/WelcomeForm';
import { SignedInUser } from '@/types/api/user/signed-in-user.model';
import { SignedUpUser } from '@/types/api/user/signed-up-user.model';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Mock de servicios y configuraciones
jest.mock('@/configs/BackendJWTConfig', () => ({
  backendJWTConfig: mockBackendJWTConfig,
}));

jest.mock('nookies', () => ({
  parseCookies: mockParseCookies,
}));

jest.mock('@/services/api/ApiUserService', () => ({
  VerifyUser: mockVerifyUser,
  SignIn: mockSignIn,
  SignUp: mockSignUp,
}));

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
  }),
}));

describe('WelcomeForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome form', () => {
    render(
      <LanguageWrapper>
        <WelcomeForm />
      </LanguageWrapper>,
    );

    // está el input de email pero no el de los otros fragmentos
    expect(screen.getByTestId(WelcomeFormConfig.emailId)).toBeInTheDocument();
    expect(screen.queryByTestId(LoginFormConfig.idInputPassword)).not.toBeInTheDocument();
    expect(screen.queryByTestId(RegisterFormConfig.idPassword1)).not.toBeInTheDocument();
    expect(screen.queryByTestId(RegisterFormConfig.idPassword2)).not.toBeInTheDocument();
  });

  it('user verified; login ok', async () => {
    render(
      <LanguageWrapper>
        <WelcomeForm />
      </LanguageWrapper>,
    );

    const emailInput = screen.getByTestId(WelcomeFormConfig.emailId);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(LoginFormConfig.idInputPassword)).not.toBeInTheDocument();

    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';

    mockVerifyUser.mockImplementationOnce(() => Promise.resolve(true));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(mockVerifyUser).toHaveBeenCalledTimes(1);
    });

    const passwordInput = screen.getByTestId(LoginFormConfig.idInputPassword) as HTMLInputElement;
    const btnLogin = screen.getByTestId(LoginFormConfig.idBtnLogin);

    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    mockSignIn.mockImplementationOnce(
      (): Promise<SignedInUser> => Promise.resolve({ access_token: 'token', ok: true }),
    );

    // TODO: no se por qué no se está cambiando el valor aquí
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    fireEvent.click(btnLogin);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledTimes(1);
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/profile');
  });

  it('user verified; login fails, error displayed', async () => {
    render(
      <LanguageWrapper>
        <WelcomeForm />
      </LanguageWrapper>,
    );

    const emailInput = screen.getByTestId(WelcomeFormConfig.emailId);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(LoginFormConfig.idInputPassword)).not.toBeInTheDocument();

    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';

    mockVerifyUser.mockImplementationOnce(() => Promise.resolve(true));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(mockVerifyUser).toHaveBeenCalledTimes(1);
    });

    const passwordInput = screen.getByTestId(LoginFormConfig.idInputPassword);
    const btnLogin = screen.getByTestId(LoginFormConfig.idBtnLogin);

    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    // Caso de contraseña vacía
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(btnLogin);

    expect(screen.getByText(LanguageConfig.messages.Welcome.Login.errors['empty-password'])).toBeInTheDocument();

    mockSignIn.mockImplementationOnce((): Promise<SignedInUser> => Promise.resolve({ access_token: '', ok: false }));

    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    fireEvent.click(btnLogin);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(LanguageConfig.messages.Welcome.Login.errors.unknown)).toBeInTheDocument();
  });

  it('user not verified; register ok', async () => {
    render(
      <LanguageWrapper>
        <WelcomeForm />
      </LanguageWrapper>,
    );
    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';

    const emailInput = screen.getByTestId(WelcomeFormConfig.emailId);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(LoginFormConfig.idInputPassword)).not.toBeInTheDocument();

    mockVerifyUser.mockImplementationOnce(() => Promise.resolve(false));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(mockVerifyUser).toHaveBeenCalledTimes(1);
    });

    const password1Input = screen.getByTestId(RegisterFormConfig.idPassword1);
    const password2Input = screen.getByTestId(RegisterFormConfig.idPassword2);
    const btnRegister = screen.getByTestId(RegisterFormConfig.idBtnRegister);

    expect(password1Input).toBeInTheDocument();
    expect(password2Input).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();

    mockSignUp.mockImplementationOnce(
      (): Promise<SignedUpUser> => Promise.resolve({ access_token: 'token', ok: true }),
    );

    fireEvent.change(password1Input, { target: { value: mockPassword } });
    fireEvent.change(password2Input, { target: { value: mockPassword } });
    fireEvent.click(btnRegister);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledTimes(1);
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/profile');
  });

  it('user not verified; register fails, error displayed', async () => {
    render(
      <LanguageWrapper>
        <WelcomeForm />
      </LanguageWrapper>,
    );
    const mockEmail = 'itsamemario@mail.com';
    const mockPassword = 'okidoki';

    const emailInput = screen.getByTestId(WelcomeFormConfig.emailId);

    // Verifica que el input de email esté presente y otros fragmentos no estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByTestId(LoginFormConfig.idInputPassword)).not.toBeInTheDocument();

    mockVerifyUser.mockImplementationOnce(() => Promise.resolve(false));

    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.focusOut(emailInput);

    await waitFor(() => {
      expect(mockVerifyUser).toHaveBeenCalledTimes(1);
    });

    const password1Input = screen.getByTestId(RegisterFormConfig.idPassword1);
    const password2Input = screen.getByTestId(RegisterFormConfig.idPassword2);
    const btnRegister = screen.getByTestId(RegisterFormConfig.idBtnRegister);

    expect(password1Input).toBeInTheDocument();
    expect(password2Input).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();

    mockSignUp.mockImplementationOnce(
      (): Promise<SignedUpUser> => Promise.resolve({ access_token: 'token', ok: false }),
    );

    fireEvent.change(password1Input, { target: { value: mockPassword } });
    fireEvent.change(password2Input, { target: { value: mockPassword } });
    fireEvent.click(btnRegister);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(LanguageConfig.messages.Welcome.Register.errors.unknown)).toBeInTheDocument();
  });
});
