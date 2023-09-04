import { useContext } from "react";
import ApplicationContext from "../../components/context/ApplicationContext";
import Login from "../../components/Login";
import Header from "../../components/Header";
import { useParams, useSearchParams } from "react-router-dom";

function Home() {
  const { loggedUser } = useContext(ApplicationContext);
  const queryParameters = new URLSearchParams(window.location.search);
  const role = queryParameters.get("role");
  const loggedIn = (
    <>
      <Header />
      <center>
        <h2>Hello, {loggedUser.firstname} </h2>
        {role && (
          <h3>You try to access part of the app you dont have the role for.</h3>
        )}
      </center>
    </>
  );

  const notloggedIn = <Login />;

  return <div>{loggedUser ? loggedIn : notloggedIn}</div>;
}

export default Home;
