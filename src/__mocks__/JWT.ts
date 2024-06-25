import { mockTokenName } from '@/__mocks__/configs/BackendJWTConfig';

export const mockFromJWTtoUser = jest.fn(() => ({
  id: '1',
  email: 'test@example.com',
  username: 'testuser',
  name: 'Test User',
  rol: 'user',
}));

export const mockParseCookies = jest.fn(() => ({
  tokenName: mockTokenName,
}));
