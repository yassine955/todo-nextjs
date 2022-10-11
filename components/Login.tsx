import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLogging, setIsLogging] = useState<boolean>(true);

  const { login, signup, currentUser } = useAuth() as any;
  console.log(currentUser);

  async function SubmitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (isLogging) {
      try {
        await login(email, password);
      } catch (error) {
        setError("Incorrent email or password");
      }
      return;
    }

    await signup(email, password);
  }

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='text'
        placeholder='Email Address'
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        value={password}
        placeholder='Password'
      />
      <button onClick={SubmitHandler}>Submit</button>

      <h1 onClick={() => setIsLogging(!isLogging)}>
        {!isLogging ? "login" : "register"}
      </h1>
    </div>
  );
};
