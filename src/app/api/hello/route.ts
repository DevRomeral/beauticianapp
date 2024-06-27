import { NextResponse } from 'next/server';

export function GET() {
  const msg = { message: 'Hello, World!' };
  return NextResponse.json(msg);
}
