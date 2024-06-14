import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    /**
     * Token que recibimos del backend
     */
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    /**
     * Token que recibimos del backend
     */
    token: string;
  }
}
