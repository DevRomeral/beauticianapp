import { mockApiConfig } from '@/__mocks__/configs/ApiConfig';
import { mockBackendJWTConfig } from '@/__mocks__/configs/BackendJWTConfig';
import { backendJWTConfig } from '@/configs/BackendJWTConfig';
import {
  Logout,
  saveTokenToCookies,
  SignIn,
  SignUp,
  VerifyUser,
  setAuthCookieToken,
} from '@/services/api/ApiUserService';
import { SignedInUser } from '@/types/api/user/signed-in-user.model';
import { SignedUpUser } from '@/types/api/user/signed-up-user.model';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

jest.mock('@/configs/BackendJWTConfig', () => ({
  backendJWTConfig: mockBackendJWTConfig,
}));

jest.mock('@/configs/ApiConfig', () => ({
  ApiConfig: mockApiConfig,
}));

// Mock de `cookies()` para interceptar la llamada a `set`
const mockCookieValue = 'value';
const mockSetCookie = jest.fn();
const mockDeleteCookie = jest.fn();
const mockGetCookie = jest.fn().mockReturnValue({ name: backendJWTConfig.tokenName, value: mockCookieValue });

jest.mock('next/headers', () => ({
  cookies: () => ({
    set: mockSetCookie,
    delete: mockDeleteCookie,
    get: mockGetCookie,
  }),
}));

describe('ApiUserService', () => {
  const email = 'test@example.com';
  const password = 'password';
  let mock: axiosMockAdapter;

  beforeAll(() => {
    mock = new axiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should return true from verify user', async () => {
    mock.onPost(`${mockApiConfig.url}/user/verify`, { email }).reply(200, { verified: true });

    const result = await VerifyUser(email);

    expect(result).toBe(true);
  });

  it('should return false from verify user', async () => {
    mock.onPost(`${mockApiConfig.url}/user/verify`, { email }).reply(200, { verified: false });

    const result = await VerifyUser(email);

    expect(result).toBe(false);
  });

  it('should throw an error when the API call to verify user fails', async () => {
    mock.onPost(`${mockApiConfig.url}/user/verify`, { email }).reply(500);

    await expect(VerifyUser(email)).rejects.toThrow('Request failed with status code 500');
  });

  it('should return the token when the user signs in', async () => {
    const access_token = 'token';
    const expectedResult: SignedInUser = {
      ok: true,
      access_token,
    };
    mock.onPost(`${mockApiConfig.url}/user/signin`, { email, password }).reply(200, expectedResult);

    const result = await SignIn(email, password);

    expect(result.ok).toBe(true);
    expect(result.access_token).toBe(access_token);
  });

  it('should return the token when the user signs up', async () => {
    const access_token = 'token';
    const expectedResult: SignedUpUser = {
      ok: true,
      access_token,
    };
    mock.onPost(`${mockApiConfig.url}/user/signup`, { email, password }).reply(200, expectedResult);

    const result = await SignUp(email, password);

    expect(result.ok).toBe(true);
    expect(result.access_token).toBe(access_token);
  });

  it('should deletes the token when loggin out', async () => {
    await Logout();

    expect(mockDeleteCookie).toHaveBeenCalledTimes(1);
  });

  it('should return the token in a cookie format', async () => {
    const expected = `${backendJWTConfig.tokenName}=${mockCookieValue}`;

    const response = await setAuthCookieToken();

    expect(response).toBe(expected);
  });

  it('should save token to cookies with correct options', async () => {
    const access_token = 'token';

    await saveTokenToCookies(access_token);

    // Verifica que `set` fue llamado con los argumentos correctos
    expect(mockSetCookie).toHaveBeenCalledWith(mockBackendJWTConfig.tokenName, access_token, {
      httpOnly: false,
      secure: expect.any(Boolean),
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
    });
  });
});
