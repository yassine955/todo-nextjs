import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export default function useFetchTodos() {
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [todos, setTodos] = useState<any>(null);

  const { currentUser } = useAuth() as any;

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodos(docSnap.data().todos);
          // setTodos('todos' in docSnap.data() ? docSnap.data().todos : {})
        } else {
          setTodos({});
        }
      } catch (err) {
        setError("Failed to load todos");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, error, todos, setTodos };
}
