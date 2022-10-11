import { deleteField, doc, setDoc } from "firebase/firestore";
import React, { Fragment, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import useFetchTodos from "../hooks/fetchTodos";
import TodoCard from "./TodoCard";

export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth() as any;

  const [edit, setEdit] = useState<any>(null);
  const [todo, setTodo] = useState<any>("");
  const [edittedValue, setEdittedValue] = useState<any>("");

  const { todos, setTodos, loading, error } = useFetchTodos();

  console.log(todos);

  async function handleAddTodo() {
    if (!todo) {
      return;
    }

    const newKey =
      Object.keys(todos).length === 0
        ? 1
        : Math.max(...(Object.keys(todos) as any)) + 1;

    setTodos({
      ...todos,
      [newKey]: todo,
    });

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: todo,
        },
      },
      { merge: true }
    );
    setTodo("");
  }

  async function handleEditTodo() {
    if (!edittedValue) {
      return;
    }

    const newKey = edit;
    setTodos({ ...todos, [newKey]: edittedValue });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: edittedValue,
        },
      },
      { merge: true }
    );
    setEdit(null);
    setEdittedValue("");
  }

  function handleAddEdit(todoKey: any) {
    return () => {
      console.log(todos[todoKey]);
      console.log("bannan");
      setEdit(todoKey);
      setEdittedValue(todos[todoKey]);
    };
  }

  function handleDelete(todoKey: any) {
    return async () => {
      const tempObj = { ...todos };
      delete tempObj[todoKey];

      setTodos(tempObj);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  }

  return (
    <Fragment>
      <div className='flex items-stretch'>
        <input
          type='text'
          placeholder='Enter todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>ADD</button>
      </div>

      {loading && <h1>Loading...</h1>}

      {!loading && (
        <>
          {Object.keys(todos).map((todo, i) => {
            return (
              <TodoCard
                handleEditTodo={handleEditTodo}
                key={i}
                handleAddEdit={handleAddEdit}
                edit={edit}
                todoKey={todo}
                edittedValue={edittedValue}
                setEdittedValue={setEdittedValue}
                handleDelete={handleDelete}
              >
                {todos[todo]}
              </TodoCard>
            );
          })}
        </>
      )}
    </Fragment>
  );
}
