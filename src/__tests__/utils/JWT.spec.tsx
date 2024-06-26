import { jwtVerify } from '@/__mocks__/jose';
import { User } from '@/types/user';
import { fromJWTtoUser, getTokenFromCookies, verifyToken } from '@/utils/JWT';
import { NextRequest } from 'next/server';

// Mockear la función request.cookies.get
const mockRequestCookiesGet = jest.fn();

// Mockear el objeto request
const mockRequest: NextRequest = {
  cookies: {
    get: mockRequestCookiesGet,
  },
};

// Ahora configura el comportamiento del mock
beforeEach(() => {
  // Resetear el mock antes de cada prueba
  mockRequestCookiesGet.mockReset();
});

describe('JWT', () => {
  it('should return an empty user when the JWT is an empty string', () => {
    const jwt = '';
    const expectedUser: User = {
      email: '',
      id: '',
      name: '',
      rol: '',
      username: '',
    };

    const result = fromJWTtoUser(jwt);

    expect(result).toEqual(expectedUser);
  });

  it('should return a user object when the JWT is valid', () => {
    const payload = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      name: 'Test User',
      rol: 'user',
    };
    const base64Payload = btoa(JSON.stringify(payload));
    const jwt = `header.${base64Payload}.signature`;

    const expectedUser: User = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      name: payload.name,
      rol: payload.rol,
    };

    const result = fromJWTtoUser(jwt);

    expect(result).toEqual(expectedUser);
  });

  it('should throw an error when the JWT is malformed', () => {
    const malformedJWT = 'malformed.jwt.token';

    expect(() => fromJWTtoUser(malformedJWT)).toThrow();
  });

  it('should return undefined if token is not present', () => {
    // Configurar el mock para devolver undefined cuando se llame a request.cookies.get
    mockRequestCookiesGet.mockReturnValue(undefined);

    // Llamar a la función bajo prueba
    const result = getTokenFromCookies(mockRequest);

    // Verificar el resultado esperado
    expect(result).toBeUndefined();
  });

  it('should return the token if present', () => {
    const mockTokenValue = 'mocked-token-value';

    // Configurar el mock para devolver un valor específico cuando se llame a request.cookies.get
    mockRequestCookiesGet.mockReturnValue(mockTokenValue);

    // Llamar a la función bajo prueba
    const result = getTokenFromCookies(mockRequest);

    // Verificar el resultado esperado
    expect(result).toBe(mockTokenValue);
  });

  it('should verify token', async () => {
    const payload = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      name: 'Test User',
      rol: 'user',
    };
    const base64Payload = btoa(JSON.stringify(payload));
    const jwt = `header.${base64Payload}.signature`;

    const expectedUser: User = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      name: payload.name,
      rol: payload.rol,
    };

    (jwtVerify as jest.Mock).mockResolvedValue(payload);

    const result = await verifyToken(jwt);

    expect(result).toEqual(expectedUser);
  });

  it('should throw an error when the JWT is malformed', () => {
    const malformedJWT = 'malformed.jwt.token';

    expect(() => fromJWTtoUser(malformedJWT)).toThrow();
  });
});
