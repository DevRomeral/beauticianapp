import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { LanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import { mockLogout } from '@/__mocks__/services/api/ApiUserService';
import { SessionContextType, SessionProvider } from '@/contexts/SessionContext';
import { User } from '@/types/user';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import NavBar, { NavBarConfig } from '@/components/navbar/Navbar';

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
  }),
  usePathname: () => {},
}));

jest.mock('@/services/api/ApiUserService', () => ({
  Logout: mockLogout,
}));

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const openClass = 'open';
    const closeClass = 'close';

    const mockUpdateToken = jest.fn();

    const initialContext: SessionContextType = {
      token: '',
      user: null,
      updateToken: mockUpdateToken,
    };

    render(
      <SessionProvider initialState={initialContext}>
        <LanguageWrapper>
          <NavBar />
        </LanguageWrapper>
      </SessionProvider>,
    );

    expect(screen.getByTestId(NavBarConfig.navbarLogoContainer)).toBeInTheDocument();
    expect(screen.getByTestId(NavBarConfig.btnLogInId)).toBeInTheDocument();
    expect(screen.getByText(LanguageConfig.messages.Navbar['drawer-menu'].welcome)).toBeInTheDocument();
    expect(screen.getByTestId(NavBarConfig.drawerMenuId)).toHaveClass(closeClass);

    fireEvent.click(screen.getByTestId(NavBarConfig.btnDrawerMenuId));

    await waitFor(() => {
      expect(screen.getByTestId(NavBarConfig.drawerMenuId)).toHaveClass(openClass);
    });

    fireEvent.click(screen.getByTestId(NavBarConfig.linkSettingsId));

    await waitFor(() => {
      expect(screen.getByTestId(NavBarConfig.drawerMenuId)).toHaveClass(closeClass);
    });
  });

  it('should render default if user is logged', async () => {
    const newToken = 'new_mocked_jwt_token';
    const name = 'Clive Rosfield';
    const mockUpdateToken = jest.fn();
    const mockNewUserResponse: User = {
      id: '2',
      email: 'test2@example.com',
      username: 'testuser2',
      name,
      rol: 'user2',
    };

    const initialContext: SessionContextType = {
      token: newToken,
      user: mockNewUserResponse,
      updateToken: mockUpdateToken,
    };

    render(
      <SessionProvider initialState={initialContext}>
        <LanguageWrapper>
          <NavBar />
        </LanguageWrapper>
      </SessionProvider>,
    );

    expect(screen.getByTestId(NavBarConfig.btnLogOutId)).toBeInTheDocument();
    expect(screen.getByText(`¡Hola, ${name}!`)).toBeInTheDocument();

    expect(screen.getByTestId(NavBarConfig.drawerMenuId)).toHaveClass('close');

    fireEvent.click(screen.getByTestId(NavBarConfig.btnLogOutId));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
    // expect(mockUpdateToken).toHaveBeenCalledTimes(1);
    // expect(mockRouterPush).toHaveBeenCalledTimes(1);
  });
});
