import { mockFromJWTtoUser } from '@/__mocks__/JWT';
import HomePage from '@/app/page';
import { render, screen } from '@testing-library/react';

// Mockeamos la parte de la sesión
jest.mock('@/utils/JWT', () => ({
  fromJWTtoUser: mockFromJWTtoUser,
}));

describe('Home Page', () => {
  it('renders home page', () => {
    render(<HomePage />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
