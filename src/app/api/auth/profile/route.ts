// import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const nextAuthToken = await getToken({ req });

  try {
    const backToken = nextAuthToken?.token || '';
    const user = verify(backToken, process.env.BACKEND_JWT_TOKEN_SECRET ?? '');
    return NextResponse.json(user);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
