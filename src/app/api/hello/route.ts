import logger from '@/services/logger';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const msg = { message: 'Hello, World!' };
  logger.info('Requesting a hello', msg);
  return NextResponse.json(msg);
}
