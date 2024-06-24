import { SignedInUser } from '@/types/api/user/signed-in-user.model';
import { SignedUpUser } from '@/types/api/user/signed-up-user.model';
import { VerifiedUser } from '@/types/api/user/verified-user.model';
import axios from 'axios';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function VerifyUser(email: string): Promise<boolean> {
  // console.log('Verificando...');
  const response = await axios.post<VerifiedUser>(`${API_HOST}/user/verify`, {
    email,
  });
  const data = response.data;
  return data.verified;
}

export async function SignIn(email: string, password: string): Promise<SignedInUser> {
  // console.log('Iniciando sesión ...');
  const response = await axios.post<SignedInUser>(`${API_HOST}/user/signin`, {
    email,
    password,
  });
  return response.data;
}

export async function SignUp(email: string, password: string): Promise<SignedUpUser> {
  // console.log('Registrándose ...');
  const response = await axios.post<SignedUpUser>(`${API_HOST}/user/signup`, {
    email,
    password,
  });
  return response.data;
}
