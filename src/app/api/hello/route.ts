import logger from '@/services/logger';
import { NextResponse } from 'next/server';

export function GET() {
  const msg = { message: 'Hello, World!' };
  logger.info('Requesting a hello', msg);
  return NextResponse.json(msg);
}
