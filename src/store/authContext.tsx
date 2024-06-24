import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ReactNode, createContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signupWithGoogleAccount: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user.email : null);
    });
    return () => unsubscribe();
  }, []);

  const provider = new GoogleAuthProvider();

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signupWithGoogleAccount = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const valueCtx: AuthContextType = {
    user,
    login,
    signup,
    signupWithGoogleAccount,
    logout,
  };

  return (
    <AuthContext.Provider value={valueCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
