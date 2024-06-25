export const backendJWTConfig = {
  tokenName: process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_NAME || '',
  secret: process.env.BACKEND_JWT_TOKEN_SECRET || '',
  browserConfig: {
    // TODO: ponerlo a true y ver cómo lo recuperamos en la sesión
    // httpOnly: true,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: '/',
  },
};
