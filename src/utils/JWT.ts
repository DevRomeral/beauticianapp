import { backendJWTConfig } from '@/configs/BackendJWTConfig';
import { User } from '@/types/user';
import { jwtVerify } from 'jose';
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
 * Verifica que el token es correcto
 * @param jwt Token traído desde el back
 */
export async function verifyToken(jwt: string) {
  return await jwtVerify(jwt, new TextEncoder().encode(backendJWTConfig.secret));
}
