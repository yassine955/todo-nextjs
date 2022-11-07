import { deleteField, doc, setDoc } from "firebase/firestore";
import React, { Fragment, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import useFetchTodos from "../hooks/fetchTodos";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Alert } from "./Alert";

export default function UserDashboard() {
  const { currentUser } = useAuth() as any;

  const [edit, setEdit] = useState<any>(null);
  const [todo, setTodo] = useState<any>("");
  const [errors, setError] = useState<string>("");
  const [edittedValue, setEdittedValue] = useState<any>("");

  const { todos, setTodos, loading, error } = useFetchTodos();

  async function handleAddTodo() {
    if (!todo) {
      setError("Vul een todo in, hij is nu nog leeg");
      return;
    }

    setError("");

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
      <div className='flex flex-col'>
        <div id='input' className='flex flex-col w-full my-5'>
          <label htmlFor='todo' className='text-gray-500 mb-2'>
            Vul iets in...
          </label>
          <input
            type='text'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder='Vul een todo in'
            className='appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg'
          />
        </div>

        <button
          type='button'
          onClick={handleAddTodo}
          className='w-full py-4 bg-green-600 rounded-lg text-green-100 mb-4'
        >
          <div className='flex flex-row items-center justify-center'>
            <div className='mr-2'>
              <PlusCircleIcon className='h-6 w-6 mr-4 text-white' />
            </div>
            <div className='font-bold'>
              {loading ? "Loading..." : "Toevoegen"}
            </div>
          </div>
        </button>

        {errors && <Alert error={errors} />}

        {loading && (
          <div role='status' className='p-4 self-center'>
            <svg
              aria-hidden='true'
              className='w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              ></path>
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              ></path>
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </div>

      {!loading && (
        <Fragment>
          {Object.keys(todos).length === 0 ? (
            <Alert error='U heeft momenteel geen todos, voeg er een toe 😊' />
          ) : (
            Object.keys(todos).map((todo, i) => {
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
            })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
