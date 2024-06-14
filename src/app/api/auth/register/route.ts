import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  // const { name, email, password } = body;
  const { name, email } = body;

  // TODO: Comprobaciones de seguridad de email y password

  // TODO: Registrarle en BBDD

  const user = {
    id: 1,
    name: name,
    email: email,
    rol: 'admin',
  };

  const response = NextResponse.json(user);
  return response;
}
