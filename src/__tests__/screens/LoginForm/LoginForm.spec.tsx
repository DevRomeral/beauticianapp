import LoginForm from '@/screens/LoginForm/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
  }),
}));

describe('Login Form', () => {
  const inputPlaceholderEmail = 'micorreo@mail.com';
  const inputPlaceholderPassword = '•••••••••';
  const idBtnSubmit = 'btnSubmit';

  it('renders login form', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(inputPlaceholderEmail)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(inputPlaceholderPassword)).toBeInTheDocument();
    expect(screen.getByTestId(idBtnSubmit)).toBeInTheDocument();
  });

  it('submits login form', async () => {
    render(<LoginForm />);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    const iEmail = screen.getByPlaceholderText(inputPlaceholderEmail);
    const iPass = screen.getByPlaceholderText(inputPlaceholderPassword);
    const btnSubmit = screen.getByTestId(idBtnSubmit);

    fireEvent.change(iEmail, { target: { value: 'test@example.com' } });
    fireEvent.change(iPass, { target: { value: 'password123' } });

    fireEvent.click(btnSubmit);

    await screen.findByTestId(idBtnSubmit);

    expect(mockRouterPush).toHaveBeenCalledWith('/profile');
  });
});
