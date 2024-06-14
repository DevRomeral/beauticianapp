// import { verify } from 'jsonwebtoken';
import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

import { verify } from './services/jwt_sign_verify';

// import { jwtVerify } from 'jose';
// import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(request: NextRequest) {
//   // console.log(`MW --> ${request.nextUrl}`);

//   if (request.nextUrl.pathname.includes('profile')) {
//     console.log('validating profile');
//     const token = request.cookies.get('myTokenName');
//     console.log(token);
//     if (token === undefined) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     try {
//       // const { payload } = jwtVerify(token, process.env.BACKEND_JWT_TOKEN_SECRET);
//       // console.log(payload);
//       // verify(token.toString(), process.env.BACKEND_JWT_TOKEN_SECRET ?? '');
//       const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.BACKEND_JWT_TOKEN_SECRET ?? ''));
//       console.log(payload);
//     } catch (error) {
//       console.log('Not verified');
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// const secret = process.env.NEXTAUTH_SECRET || 'secret';
const backendSecret = process.env.BACKEND_JWT_TOKEN_SECRET || 'secret';
// const token_name = process.env.BACKEND_JWT_TOKEN_NAME || 'myToken';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const nextAuthToken = req.nextauth.token;
    // console.log('MW', nextAuthToken);

    try {
      if (req.nextUrl.pathname.includes('profile')) {
        // Verificamos token del back
        const backToken = nextAuthToken?.token || '';
        verify(backToken, backendSecret);
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    // callbacks: {
    //   authorized: ({ token }) => {
    //     // console.log('Token en MW: ', token);
    //     // return token?.role === 'admin';
    //     return true;
    //   },
    // },
  },
);

// export { default } from 'next-auth/middleware';

// Configurar las rutas en las que se aplica el middleware
export const config = {
  matcher: [
    {
      source: '/profile',
    },
    '/api/auth/profile',
  ],
};
