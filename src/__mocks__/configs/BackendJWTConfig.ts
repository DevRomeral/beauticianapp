export const mockTokenName = 'mocked-token-name';

export const mockBackendJWTConfig = {
  tokenName: mockTokenName,
  secret: 'mocked-secret',
  browserConfig: {
    // TODO: ponerlo a true y ver cómo lo recuperamos en la sesión
    // httpOnly: true,
    httpOnly: false,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: '/',
  },
};
