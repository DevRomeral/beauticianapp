import { backendJWTConfig } from '@/configs/BackendJWTConfig';
import { User } from '@/types/user';
import { jwtVerify } from 'jose';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest } from 'next/server';
import { TextEncoder } from 'text-encoding';

/**
 * Decodifica el token JWT y obtiene un usuario
 * @param jwt Token traído de back
 * @returns Usuario decodificado o usuario vacío
 */
export function fromJWTtoUser(jwt: string): User {
  if (jwt.length === 0) {
    const empty: User = {
      email: '',
      id: '',
      name: '',
      rol: '',
      username: '',
    };
    return empty;
  }
  const payload = JSON.parse(atob(jwt.split('.')[1]));
  const userFromPayload: User = {
    id: payload.id,
    email: payload.email,
    username: payload.username,
    name: payload.name,
    rol: payload.rol,
  };
  return userFromPayload;
}

/**
 * Obtiene el JWT de back desde las cookies de la request
 * @param request
 * @returns
 */
export function getTokenFromCookies(request: NextRequest): RequestCookie | undefined {
  const jwt = request.cookies.get(backendJWTConfig.tokenName);
  // console.log('JWT: ', jwt);
  return jwt;
}

/**
 * Verifica que el token es correcto
 * @param jwt Token traído desde el back
 */
export async function verifyToken(jwt: string) {
  // console.log('Verificando TOKEN');
  return await jwtVerify(jwt, new TextEncoder().encode(backendJWTConfig.secret));
}
