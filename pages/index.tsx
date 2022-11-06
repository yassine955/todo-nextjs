import { Fragment, useEffect, useState } from "react";
import { HeaderComponent } from "../components/Header";
import { LoadingComponent } from "../components/Loading";
import { LoginComponent } from "../components/Login";
import UserDashboard from "../components/UserDashboard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser, logout } = useAuth();

  return (
    <Fragment>
      {currentUser && (
        <HeaderComponent logout={logout} currentUser={currentUser} />
      )}
      <div className='container mx-auto px-32 py-32'>
        {!currentUser && <LoginComponent />}
        {currentUser && <UserDashboard />}
      </div>
    </Fragment>
  );
};

export default Home;
