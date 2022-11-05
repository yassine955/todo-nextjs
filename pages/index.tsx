import { Fragment } from "react";
import { HeaderComponent } from "../components/Header";
import { LoginComponent } from "../components/Login";
import UserDashboard from "../components/UserDashboard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser, logout } = useAuth();

  console.log(currentUser);

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
