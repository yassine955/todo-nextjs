import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [logging, setLogging] = useState<boolean>(true);

  const { login, signup, currentUser } = useAuth() as any;

  console.log(currentUser);

  async function SubmitHandler() {
    if (!email || !password) {
      setError("Geen email of wachtwoord gegeven!");
      return;
    }

    if (logging) {
      try {
        const res = await login(email, password);
      } catch (error) {
        console.log(error);
        setError("Incorrent email or password");
      }
      return;
    }

    await signup(email, password);
  }

  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-center py-4 uppercase'>
        {logging ? "Login" : "register"}
      </h1>

      <input
        className='px-4 py-2 bg-neutral-100 rounded-md mb-4'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='text'
        placeholder='Email Address'
      />
      <input
        className='px-4 py-2 bg-neutral-100 rounded-md mb-4'
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        value={password}
        placeholder='Password'
      />
      <button
        style={{
          width: "fit-content",
        }}
        className='bg-black text-white font-bold rounded-md p-2 self-center mb-2'
        onClick={SubmitHandler}
      >
        Submit
      </button>

      <button
        className='text-white rounded-md p-2 self-center bg-green-700 capitalize'
        onClick={() => setLogging(!logging)}
      >
        {!logging ? "login" : "register"}
      </button>

      {error && (
        <div className='max-w-[40ch] bg-red-500 font-bold text-white  p-2 rounded-md mt-4 self-center'>
          {error}
        </div>
      )}
    </div>
  );
};
