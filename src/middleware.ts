import { NextRequest, NextResponse } from 'next/server';

import { backendJWTConfig } from './configs/BackendJWTConfig';
// import { getTokenFromCookies } from './utils/Cookies';
import { verifyToken } from './utils/JWT';

// Middleware combinado
export async function middleware(request: NextRequest) {
  try {
    // const nextUrl = request.nextUrl;

    // console.log('-----> Middleware! ' + nextUrl);
    const jwt = request.cookies.get(backendJWTConfig.tokenName);
    // console.log('Token: ' + jwt?.value);

    if (jwt === undefined) return redirectToLogin(request);

    // console.log('Verificando token');
    await verifyToken(jwt.value);
    // console.log('TOKEN VERIFICADO!');
  } catch (err) {
    console.error('Error en el middleware, redireccionando a login');
    return redirectToLogin(request);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/profile:path*', '/clientes:path*'],
};

/**
 * Redirecciona a la pantalla de Login en caso de no estar autorizado a una página sensible
 * @param request Request del navegador
 * @returns Redirección a la pantalla de login
 */
function redirectToLogin(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const originalUrl = `${pathname}${search}`;

  // Funciona a la primera, pero cambia la URL
  request.nextUrl.pathname = `/welcome`;
  request.nextUrl.searchParams.set('redirectTo', originalUrl);
  console.log('Original: ' + originalUrl);
  console.log('Rewritten: ' + request.nextUrl);
  return NextResponse.rewrite(request.nextUrl);

  // const loginUrl = new URL('/welcome', request.url);
  // loginUrl.searchParams.set('redirectTo', originalUrl);
  // console.log('Original URL: ' + originalUrl);
  // console.log('Login URL:', loginUrl.toString());
  // return NextResponse.redirect(loginUrl);

  // const headers = new Headers();
  // headers.set('redirect', '/welcome');

  // return NextResponse.next({
  //   headers,
  // });

  // request.nextUrl.pathname = `/welcome`;
  // request.nextUrl.searchParams.set('redirectTo', originalUrl);

  // console.log('Original URL: ' + originalUrl);
  // console.log('Rewritten URL: ' + request.nextUrl.toString());

  // return NextResponse.rewrite(request.nextUrl);
}
