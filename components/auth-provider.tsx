'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default AuthProvider;
