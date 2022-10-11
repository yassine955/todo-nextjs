import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState<any>(null);

  function signup(email: any, password: any) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  function login(email: any, password: any) {
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
