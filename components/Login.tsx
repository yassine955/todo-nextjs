import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";

export const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [logging, setLogging] = useState<boolean>(true);

  const { login, signup, currentUser, signUpWithGoogle } = useAuth() as any;

  async function SubmitHandler() {
    if (!email || !password) {
      setError("Geen email of wachtwoord gegeven!");
      return;
    }

    if (logging) {
      try {
        await login(email.toLowerCase(), password.toLowerCase());
      } catch (error) {
        setError("Verkeerde Email of wachtwoord");
      }
      return;
    }

    const res = await signup(email.toLowerCase(), password.toLowerCase());

    if (!res?.success) {
      setError(res?.msg);
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='w-full md:w-full lg:w-12/12 mx-auto md:mx-0'>
        <div className='bg-white p-10 flex flex-col w-full shadow-xl rounded-xl'>
          <h2 className='text-2xl font-bold text-gray-800 text-left mb-5'>
            {logging ? "Inloggen" : "Registreren"}
          </h2>
          <form action='' className='w-full'>
            <div id='input' className='flex flex-col w-full my-5'>
              <label htmlFor='username' className='text-gray-500 mb-2'>
                Email Adres
              </label>
              <input
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Adres'
                className='appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg'
              />
            </div>
            <div id='input' className='flex flex-col w-full my-5'>
              <label htmlFor='password' className='text-gray-500 mb-2'>
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                value={password}
                id='password'
                placeholder='Vul uw wachtwoord in'
                className='appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg'
              />
            </div>
            <div id='button' className='flex flex-col w-full my-5'>
              <button
                type='button'
                name='login'
                onClick={SubmitHandler}
                id='login'
                className='w-full py-4 bg-green-600 rounded-lg text-green-100'
              >
                <div className='flex flex-row items-center justify-center'>
                  <div className='mr-2'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      ></path>
                    </svg>
                  </div>
                  <div className='font-bold'>Toegang</div>
                </div>
              </button>
              <button
                type='button'
                onClick={async () => {
                  if (!email || !password) {
                    setError("");
                  }

                  return await signUpWithGoogle();
                }}
                className='w-full py-4 bg-gray-300 rounded-lg text-gray-600 mt-4'
              >
                <div className='flex flex-row items-center justify-center'>
                  <div className='mr-2'>
                    <img src='/icons8-google.svg' width={25} />
                  </div>
                  <div className='font-bold'>Google</div>
                </div>
              </button>
              <hr className='mt-8' />
              <div className='flex justify-evenly mt-5'>
                <p
                  onClick={() => setLogging(!logging)}
                  className='w-full text-center font-medium text-gray-500 cursor-pointer'
                >
                  {!logging ? "Inloggen" : "Registreren"}
                </p>
              </div>

              {error && <Alert error={error} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
