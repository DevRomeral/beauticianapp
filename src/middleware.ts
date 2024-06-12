// import { verify } from 'jsonwebtoken';

import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // console.log(`MW --> ${request.nextUrl}`);

  if (request.nextUrl.pathname.includes('profile')) {
    console.log('validating profile');
    const token = request.cookies.get('myTokenName');
    console.log(token);
    if (token === undefined) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // const { payload } = jwtVerify(token, process.env.JWT_TOKEN_SECRET);
      // console.log(payload);
      // verify(token.toString(), process.env.JWT_TOKEN_SECRET ?? '');
      const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_TOKEN_SECRET ?? ''));
      console.log(payload);
    } catch (error) {
      console.log('Not verified');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configurar las rutas en las que se aplica el middleware
export const config = {
  matcher: [
    {
      source: '/profile',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    '/api/auth/profile',
    '/login',
  ],
};
