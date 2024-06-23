import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext } from "react";
import { auth } from "../firebase/config";

const AuthContext = createContext({
  user: "",
  login: () => Promise<void>,
  signup: () => Promise<void>,
});

export const AuthContextProvider = ({ children }) => {
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
  const valueCtx = {
    login,
    signup,
    signupWithGoogleAccount,
  };
  return (
    <AuthContext.Provider value={valueCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
