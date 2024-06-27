'use server';

import { backendJWTConfig } from '@/configs/BackendJWTConfig';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Obtiene el JWT de back desde las cookies de la request
 * @param request
 * @returns
 */
export async function getTokenFromCookies(request: NextRequest): Promise<RequestCookie | undefined> {
  const jwt = request.cookies.get(backendJWTConfig.tokenName);
  // console.log('JWT: ', jwt);
  return jwt;
}

export async function changeLanguage(lang: string) {
  cookies().set('NEXT_LOCALE', lang);
}
