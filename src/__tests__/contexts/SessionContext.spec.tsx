import { mockTokenName } from '@/__mocks__/configs/BackendJWTConfig';
import { mockFromJWTtoUserResponse } from '@/__mocks__/JWT';
import { backendJWTConfig } from '@/configs/BackendJWTConfig';
import { SessionContextType, SessionProvider, useSession } from '@/contexts/SessionContext';
import { User } from '@/types/user';
import { act, render, renderHook, screen } from '@testing-library/react';
import React from 'react';

jest.mock('nookies', () => ({
  parseCookies: jest.fn(() => ({
    [backendJWTConfig.tokenName]: mockTokenName,
  })),
}));

const newToken = 'new_mocked_jwt_token';
const mockNewUserResponse: User = {
  id: '2',
  email: 'test2@example.com',
  username: 'testuser2',
  name: 'Test User 2',
  rol: 'user2',
};

// Mock de fromJWTtoUser
jest.mock('@/utils/JWT', () => ({
  fromJWTtoUser: jest.fn((token: string) => {
    if (token === newToken) return mockNewUserResponse;
    else return mockFromJWTtoUserResponse;
  }),
}));

describe('SessionContext', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should provide session context with initial token and user', () => {
    render(
      <SessionProvider>
        <SessionInfo />
      </SessionProvider>,
    );

    // Verifica que el componente SessionInfo muestra correctamente la información inicial
    expect(screen.getByText('Token: ' + mockTokenName)).toBeInTheDocument();
    expect(screen.getByText('User ID: ' + mockFromJWTtoUserResponse.id)).toBeInTheDocument();
    expect(screen.getByText('User Name: ' + mockFromJWTtoUserResponse.name)).toBeInTheDocument();
    expect(screen.getByText('User Email: ' + mockFromJWTtoUserResponse.email)).toBeInTheDocument();
  });

  it('should update token and user when updateToken is called', () => {
    // Define el estado inicial del contexto de sesión mockeado
    const initialContext: SessionContextType = {
      token: mockTokenName,
      user: mockFromJWTtoUserResponse,
      updateToken: () => {}, // Esta función no se debería utilizar en las pruebas
    };

    // Renderiza el hook dentro de un proveedor de contexto con el estado inicial mockeado
    const { result } = renderHook(() => useSession(), {
      wrapper: ({ children }) => <SessionProvider initialState={initialContext}>{children}</SessionProvider>,
    });

    // Verifica que el token y el usuario se actualizan correctamente
    expect(result.current.token).toBe(initialContext.token);
    expect(result.current.user).toEqual({
      id: mockFromJWTtoUserResponse.id,
      name: mockFromJWTtoUserResponse.name,
      email: mockFromJWTtoUserResponse.email,
      rol: mockFromJWTtoUserResponse.rol,
      username: mockFromJWTtoUserResponse.username,
    });

    // Simula la llamada a updateToken con un nuevo token
    act(() => {
      result.current.updateToken(newToken);
    });

    expect(result.current.token).toBe(newToken);
    expect(result.current.user).toEqual({
      id: mockNewUserResponse.id,
      name: mockNewUserResponse.name,
      email: mockNewUserResponse.email,
      rol: mockNewUserResponse.rol,
      username: mockNewUserResponse.username,
    });
  });
});

// Componente de prueba para mostrar información de sesión
const SessionInfo: React.FC = () => {
  const { token, user } = useSession();

  return (
    <div>
      <p>Token: {token}</p>
      <p>User ID: {user?.id}</p>
      <p>User Name: {user?.name}</p>
      <p>User Email: {user?.email}</p>
    </div>
  );
};
