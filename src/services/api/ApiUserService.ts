'use server';

import { ApiConfig } from '@/configs/ApiConfig';
import { backendJWTConfig } from '@/configs/BackendJWTConfig';
import { DashboardModel } from '@/types/api/user/dashboard.model';
import { SignedInUser } from '@/types/api/user/signed-in-user.model';
import { SignedUpUser } from '@/types/api/user/signed-up-user.model';
import { VerifiedUser } from '@/types/api/user/verified-user.model';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function VerifyUser(email: string): Promise<boolean> {
  // console.log('Verificando...');
  const response = await axios.post<VerifiedUser>(`${ApiConfig.url}/user/verify`, {
    email,
  });
  const data = response.data;
  return data.verified;
}

export async function SignIn(email: string, password: string): Promise<SignedInUser> {
  const response = await axios.post<SignedInUser>(
    `${ApiConfig.url}/user/signin`,
    {
      email,
      password,
    },
    { headers: ApiConfig.headers },
  );
  // console.log(response);

  await saveTokenToCookies(response.data.access_token);

  return response.data;
}

export async function SignUp(email: string, password: string): Promise<SignedUpUser> {
  const response = await axios.post<SignedUpUser>(
    `${ApiConfig.url}/user/signup`,
    {
      email,
      password,
    },
    { headers: ApiConfig.headers },
  );
  console.log(response);
  await saveTokenToCookies(response.data.access_token);
  return response.data;
}

export async function Dashboard(): Promise<DashboardModel> {
  const response = await axios.get<DashboardModel>(`${ApiConfig.url}/user/dashboard`, {
    withCredentials: true,
    headers: { Cookie: setAuthCookieToken() },
  });

  // console.log(response.data);
  return response.data;
}

export async function Logout() {
  // TODO ¿Llamada a BACK para que él también elimine algo?
  cookies().delete(backendJWTConfig.tokenName);
}

/**
 * @returns Obtiene el valor de la cabecera en HEADERS para la Cookie autorizada
 */
export function setAuthCookieToken(): string {
  const token = cookies().get(backendJWTConfig.tokenName);
  return `${token?.name}=${token?.value}`;
}

/**
 * Guarda el token recibido por el back en las cookies del navegador
 * @param token JWT recibido por el back
 */
export async function saveTokenToCookies(token: string) {
  cookies().set(backendJWTConfig.tokenName, token, {
    // TODO: ponerlo a true y ver cómo lo recuperamos en la sesión
    // httpOnly: true,
    httpOnly: backendJWTConfig.browserConfig.httpOnly,
    secure: backendJWTConfig.browserConfig.secure,
    sameSite: 'lax',
    maxAge: backendJWTConfig.browserConfig.maxAge,
    path: backendJWTConfig.browserConfig.path,
  });
}
