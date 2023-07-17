import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import ApplicationContext from "../context/ApplicationContext";

const Navbar = ({ api }) => {
  const { loggedUser, setLoggedUser,setJwt } = useContext(ApplicationContext);
  const handleLogout = () => {
    api
      .post("auth/logout")
      .then((res) => console.log(res))
      .catch(err=>console.log(err))
      .finally(() => {
        setJwt("");
        setLoggedUser(false);
      });
  };

  if (!loggedUser) {
    return (
      <nav>
        <Link to={"/"}>Login</Link>
      </nav>
    );
  }
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/"} onClick={handleLogout}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
