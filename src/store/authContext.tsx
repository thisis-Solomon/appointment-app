// src/store/authContext.tsx
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Navigate } from "react-router-dom";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      <Navigate to="/" />;
    }
  };

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      <Navigate to="/" />;
    }
  };

  const signupWithGoogleAccount = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    if (user) {
      <Navigate to="/" />;
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const valueCtx = {
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
