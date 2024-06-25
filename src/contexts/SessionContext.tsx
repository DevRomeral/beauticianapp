'use client';

import { backendJWTConfig } from '@/configs/BackendJWTConfig';
import { User } from '@/types/user';
import { fromJWTtoUser } from '@/utils/JWT';
import { parseCookies } from 'nookies';
import { createContext, useContext, useEffect, useState, FC } from 'react';

interface SessionContextType {
  token: string | null;
  user: User | null;
  updateToken: (newToken: string) => void;
}

const SessionContext = createContext<SessionContextType>({
  token: null,
  user: null,
  updateToken: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const SessionProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: si el token es creado como "httpOnly", no podremos acceder a él aquí y el login no será automático
    const cookies = parseCookies();
    const jwt = cookies[backendJWTConfig.tokenName];
    // console.log('------>', cookies);

    if (jwt) {
      setToken(jwt);
      setUser(fromJWTtoUser(jwt));
    }
  }, []);

  const updateToken = (newToken: string) => {
    setToken(newToken);
    setUser(fromJWTtoUser(newToken));
  };

  return <SessionContext.Provider value={{ token, user, updateToken }}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextType => useContext(SessionContext);
