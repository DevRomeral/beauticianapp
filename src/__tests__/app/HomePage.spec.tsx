import HomePage from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('renders home page', () => {
    render(<HomePage />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
