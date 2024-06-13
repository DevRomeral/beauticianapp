// import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const token = await getToken({ req });

  console.log('Token (NextAuth) en api/auth/profile', token);
  console.log('Token (NextAuth) en api/auth/profile (RAW)', await getToken({ req, raw: true }));

  try {
    const user = verify(token.backToken, process.env.BACKEND_JWT_TOKEN_SECRET ?? '');
    return NextResponse.json(user);
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
