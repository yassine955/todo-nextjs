import React from "react";
import { CurrentUserTypes } from "../types/currentUser";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

export const HeaderComponent = ({
  logout,
  currentUser,
}: {
  logout: any;
  currentUser: CurrentUserTypes;
}) => {
  console.log({ currentUser });

  return (
    <div className='bg-zinc-900 p-8 flex items-center '>
      <button
        className='bg-white py-2 px-4 rounded inline-flex items-center mr-4'
        onClick={() => {
          logout();
        }}
      >
        <ArrowLeftOnRectangleIcon className='h-6 w-6 mr-4 text-black-500' />
        <span>Uitloggen</span>
      </button>

      {currentUser?.photoURL ? (
        <div>
          <img
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
            className='object-cover h-10 w-10 mr-8 ml-4'
          />
        </div>
      ) : null}

      <h1 className='text-white'>
        Welkom Gebruiker:{" "}
        {currentUser?.displayName ? (
          <b>{currentUser?.displayName}</b>
        ) : (
          <b>{currentUser?.email}</b>
        )}
      </h1>
    </div>
  );
};
