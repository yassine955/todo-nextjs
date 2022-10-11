import { Fragment } from "react";
import { LoginComponent } from "../components/Login";
import UserDashboard from "../components/UserDashboard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser, logout } = useAuth() as any;
  console.log(currentUser);

  return (
    <Fragment>
      {!currentUser && <LoginComponent />}
      {currentUser && <UserDashboard />}

      <h2
        onClick={() => {
          logout();
        }}
      >
        Logout
      </h2>
    </Fragment>
  );
};

export default Home;
