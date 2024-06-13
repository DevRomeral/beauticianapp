import LoginForm from '@/screens/LoginForm/LoginForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as nextAuthReact from 'next-auth/react';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
  }),
}));

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

describe('LoginForm', () => {
  const inputPlaceholderEmail = 'micorreo@mail.com';
  const inputPlaceholderPassword = '•••••••••';
  const idBtnSubmit = 'btnSubmit';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(inputPlaceholderEmail)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(inputPlaceholderPassword)).toBeInTheDocument();
    expect(screen.getByTestId(idBtnSubmit)).toBeInTheDocument();
  });

  it('submits login form successfully', async () => {
    // nextAuthReactMocked.useSession.mockImplementation((_options?: UseSessionOptions<boolean> | undefined) => {
    //   return { data: null, status: 'loading' };
    // });

    const inputValueEmail = 'test@example.com';
    const inputValuePassword = 'password123';

    nextAuthReactMocked.signIn.mockImplementation(() => Promise.resolve({ error: '', status: 200, ok: true, url: '' }));

    render(<LoginForm />);

    const inputEmail = screen.getByPlaceholderText(inputPlaceholderEmail);
    const inputPassword = screen.getByPlaceholderText(inputPlaceholderPassword);
    const btnSubmit = screen.getByTestId(idBtnSubmit);

    fireEvent.change(inputEmail, { target: { value: inputValueEmail } });
    fireEvent.change(inputPassword, { target: { value: inputValuePassword } });

    fireEvent.click(btnSubmit);

    await waitFor(() => {
      expect(nextAuthReactMocked.signIn).toHaveBeenCalledTimes(1);
    });
    expect(nextAuthReactMocked.signIn).toHaveBeenCalledWith('credentials', {
      email: inputValueEmail,
      password: inputValuePassword,
      redirect: false,
      // redirectTo: '/profile',
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/profile');
  });

  it('shows error message on login failure', async () => {
    const inputValueEmail = 'test@example.com';
    const inputValuePassword = 'password123';
    const errorMessage = 'I made up this error';

    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({ error: errorMessage, status: 401, ok: false, url: '' }),
    );

    render(<LoginForm />);

    const inputEmail = screen.getByPlaceholderText(inputPlaceholderEmail);
    const inputPassword = screen.getByPlaceholderText(inputPlaceholderPassword);
    const btnSubmit = screen.getByTestId(idBtnSubmit);

    fireEvent.change(inputEmail, { target: { value: inputValueEmail } });
    fireEvent.change(inputPassword, { target: { value: inputValuePassword } });

    fireEvent.click(btnSubmit);

    await waitFor(() => {
      expect(nextAuthReactMocked.signIn).toHaveBeenCalledTimes(1);
    });

    expect(nextAuthReactMocked.signIn).toHaveBeenCalledWith('credentials', {
      email: inputValueEmail,
      password: inputValuePassword,
      redirect: false,
    });

    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
