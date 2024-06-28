import { getTokenFromCookies } from '@/utils/Cookies';
import { NextRequest } from 'next/server';

// Mockear la función request.cookies.get
const mockRequestCookiesGet = jest.fn();
const mockRequestCookiesSet = jest.fn();

// Mockear el objeto request
const mockRequest: NextRequest = {
  cookies: {
    get: mockRequestCookiesGet,
    set: mockRequestCookiesSet,
  },
};

// Ahora configura el comportamiento del mock
beforeEach(() => {
  // Resetear el mock antes de cada prueba
  mockRequestCookiesGet.mockReset();
});

describe('Cookies', () => {
  it('should return undefined if token is not present', async () => {
    // Configurar el mock para devolver undefined cuando se llame a request.cookies.get
    mockRequestCookiesGet.mockReturnValue(undefined);

    // Llamar a la función bajo prueba
    const result = await getTokenFromCookies(mockRequest);

    // Verificar el resultado esperado
    expect(result).toBeUndefined();
  });

  it('should return the token if present', async () => {
    const mockTokenValue = 'mocked-token-value';

    // Configurar el mock para devolver un valor específico cuando se llame a request.cookies.get
    mockRequestCookiesGet.mockReturnValue(mockTokenValue);

    // Llamar a la función bajo prueba
    const result = await getTokenFromCookies(mockRequest);

    // Verificar el resultado esperado
    expect(result).toBe(mockTokenValue);
  });
});
