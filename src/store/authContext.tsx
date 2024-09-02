import { ReactNode, createContext, useState } from 'react';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signupWithGoogleAccount: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  login: (email: string, password: string) => Promise<void>,
  signup: (email: string, password: string) => Promise<void>,
  signupWithGoogleAccount: () => Promise<void>,
  logout: () => Promise<void>,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    console.log('login');
  };

  const signup = async (email: string, password: string) => {
    console.log('Signup');
  };

  const logout = async () => {
    console.log('logout');
  };

  const valueCtx = {
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={valueCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
