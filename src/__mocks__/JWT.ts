import { mockTokenName } from '@/__mocks__/configs/BackendJWTConfig';
import { User } from '@/types/user';

export const mockFromJWTtoUserResponse: User = {
  id: '1',
  email: 'test@example.com',
  username: 'testuser',
  name: 'Test User',
  rol: 'user',
};

export const mockFromJWTtoUser = jest.fn(() => mockFromJWTtoUserResponse);

export const mockParseCookies = jest.fn(() => ({
  tokenName: mockTokenName,
}));
