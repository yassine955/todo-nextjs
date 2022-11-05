import React from "react";
import { CurrentUserTypes } from "../types/currentUser";

export const HeaderComponent = ({
  logout,
  currentUser,
}: {
  logout: any;
  currentUser: CurrentUserTypes;
}) => {
  return (
    <div className='bg-zinc-900 p-8 flex items-center'>
      <button
        className='bg-white py-1 px-2 font-bold rounded-md mr-8'
        onClick={() => {
          logout();
        }}
      >
        Uitloggen
      </button>

      <h1 className='text-white'>
        Welkom Gebruiker: <b>{currentUser?.email}</b>
      </h1>
    </div>
  );
};
