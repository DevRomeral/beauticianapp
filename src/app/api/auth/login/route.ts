import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // TODO: Comprobaciones de seguridad de email y password
  return NextResponse.json({ message: 'it works!' });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  // TODO: Comprobaciones de seguridad de email y password

  // TODO: Cambiar el id y el rol del usuario

  // Token recibido del back
  const backToken = jwt.sign(
    {
      id: 1,
      rol: 'admin',
      email,
      username: email,
      // Expira en 30 días
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    },
    process.env.BACKEND_JWT_TOKEN_SECRET ?? '',
  );

  // TODO: revisar el sameSite para configurarlo con el back
  const serialized = serialize(process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_NAME ?? '', backToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });

  const user = {
    id: 1,
    name: email,
    email: email,
    rol: 'admin',
    backToken: backToken,
  };

  const response = NextResponse.json({ ...user, message: 'login ok' });
  response.headers.set('Set-Cookie', serialized);
  return response;
}
