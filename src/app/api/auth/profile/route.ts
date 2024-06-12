import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookies = req.headers.get('cookie') || '';
  const parsedCookies = parse(cookies);
  const { myTokenName } = parsedCookies;

  try {
    const user = verify(myTokenName, process.env.JWT_TOKEN_SECRET ?? '');
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
