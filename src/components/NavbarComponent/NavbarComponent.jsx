/* eslint-disable react/prop-types */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import ApplicationContext from "../context/ApplicationContext";

const NavbarComponent = ({ api }) => {
  const { loggedUser, setLoggedUser, setJwt } = useContext(ApplicationContext);
  const handleLogout = () => {
    api
      .post("auth/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setJwt("");
        setLoggedUser(false);
      });
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Attendance</Navbar.Brand>
        <Nav className="me-auto">
          {loggedUser && (
            <>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>

              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>Signed in as: {loggedUser.firstname}</Navbar.Text>
              </Navbar.Collapse>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );

  // if (!loggedUser) {

  //   return (
  //     <nav>
  //       <Link to={"/"}>Login</Link>
  //     </nav>
  //   );
  // }

  // return (
  //   <nav>
  //     Welcome, {loggedUser.firstname}
  //     {loggedUser.roles.includes("ADMIN") && <Link to={"AdminDashboard"}>AdminDashboard</Link>}
  //     {loggedUser.roles.includes("MANAGER") && <Link to={"ManagerDashboard"}>ManagerDashboard</Link>}
  //     <Link to={"/"}>Home</Link>
  //     <Link to={"/"} onClick={handleLogout}>
  //       Logout
  //     </Link>
  //   </nav>
  // );
};

export default NavbarComponent;
