import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CurrentUserTypes } from "../types/currentUser";

const AuthContext = createContext<{
  currentUser: CurrentUserTypes | undefined;
  login: any;
  logout: any;
  signup: any;
}>({
  currentUser: null!,
  login: null,
  logout: null,
  signup: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<CurrentUserTypes>();
  const [loading, setLoading] = useState<boolean>();

  function signup(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  });

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
