import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRWlb0XfoN5H-CkrINkvhevw6NhLguSGY",
  authDomain: "todo-app-9b64a.firebaseapp.com",
  projectId: "todo-app-9b64a",
  storageBucket: "todo-app-9b64a.appspot.com",
  messagingSenderId: "380545243433",
  appId: "1:380545243433:web:f47161fc186ced2e6a3f38",
  measurementId: "G-35WGHXES59",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
