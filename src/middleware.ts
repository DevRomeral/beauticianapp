import { NextRequest, NextResponse } from 'next/server';

import { getTokenFromCookies, verifyToken } from './utils/JWT';

export async function middleware(request: NextRequest) {
  const jwt = getTokenFromCookies(request);

  if (jwt === undefined) return redirectToLogin(request);

  try {
    await verifyToken(jwt.value);
  } catch (err) {
    console.error(err);
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

  console.log('URL', loginUrl);

  return NextResponse.redirect(loginUrl);
}
