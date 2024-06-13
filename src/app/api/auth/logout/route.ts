import { parse, serialize } from 'cookie';
import { verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || '';
    const parsedCookies = parse(cookies);
    const { myTokenName } = parsedCookies;

    if (!myTokenName) {
      return NextResponse.json({ message: 'No token was found' }, { status: 401 });
    }

    verify(myTokenName, process.env.BACKEND_JWT_TOKEN_SECRET ?? '');

    // TODO: revisar el sameSite para configurarlo con el back
    const serialized = serialize('myTokenName', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.headers.set('Set-Cookie', serialized);

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'An error happened when trying to logout the user' }, { status: 401 });
  }
}
