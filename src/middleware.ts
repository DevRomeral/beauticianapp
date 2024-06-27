import { NextRequest, NextResponse } from 'next/server';

import { backendJWTConfig } from './configs/BackendJWTConfig';
// import { getTokenFromCookies } from './utils/Cookies';
import { verifyToken } from './utils/JWT';

// Middleware combinado
export async function middleware(request: NextRequest) {
  try {
    const jwt = request.cookies.get(backendJWTConfig.tokenName);

    if (jwt === undefined) return redirectToLogin(request);

    console.log('Verificando token');
    await verifyToken(jwt.value);
  } catch (err) {
    console.error('Error en el middleware, redireccionando a login');
    return redirectToLogin(request);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    {
      source: '/profile',
    },
  ],
};

/**
 * Redirecciona a la pantalla de Login en caso de no estar autorizado a una página sensible
 * @param request Request del navegador
 * @returns Redirección a la pantalla de login
 */
function redirectToLogin(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const originalUrl = `${pathname}${search}`;

  const loginUrl = new URL('/welcome', request.url);
  loginUrl.searchParams.set('redirectTo', originalUrl);

  // console.log('URL', loginUrl);

  return NextResponse.redirect(loginUrl);
}
