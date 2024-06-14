import { create as sign } from '@/services/jwt_sign_verify';
import { serialize } from 'cookie';
import { User } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (password.includes('error')) throw 'Error triggered';

    // Token recibido del back
    const backToken = await sign(email, process.env.BACKEND_JWT_TOKEN_SECRET || '');

    // Configurar la cookie
    const serialized = serialize(process.env.BACKEND_JWT_TOKEN_NAME ?? '', backToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: 'admin',
      token: backToken,
    };

    const response = NextResponse.json(user);
    // TODO: no parece que la cookie se guarde en el navegador
    response.headers.set('Set-Cookie', serialized);

    return response;
  } catch (e) {
    return NextResponse.json({ error: 'Invalid credentials!', ok: false }, { status: 401 });
  }
}
