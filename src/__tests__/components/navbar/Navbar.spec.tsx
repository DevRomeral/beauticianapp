import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { render, screen } from '@testing-library/react';

import NavBar from '@/components/navbar/Navbar';

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
  }),
  usePathname: () => {},
}));

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    render(
      <LanguageWrapper>
        <NavBar />
      </LanguageWrapper>,
    );

    expect(screen.getByTestId('navbarLogoContainer')).toBeInTheDocument();
  });
});
