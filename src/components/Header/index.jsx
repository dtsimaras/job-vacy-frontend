import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from "react";
import ApplicationContext from "../context/ApplicationContext";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

const NavbarComponent = () => {
  const { loggedUser, setLoggedUser, setJwt } = useContext(ApplicationContext);
  const { api } = useApi();
  const navigate = useNavigate();

  const handleLogout = () => { //TODO: refactor this? Should I move it in useApi or not?
    api
      .post("auth/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setJwt("");
        setLoggedUser(false);
        navigate("/");
      });
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Job Vacy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>

            <NavDropdown title="Dashboard" id="basic-nav-dropdown">
              {loggedUser.roles.includes("ADMIN") &&
                <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>}
              {loggedUser.roles.includes("MANAGER") &&
                <NavDropdown.Item href="/manager">Manager</NavDropdown.Item>}
              {loggedUser.roles.includes("USER") &&
                <NavDropdown.Item href="/user">User</NavDropdown.Item>}
            </NavDropdown>

            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            {/* <Navbar.Text>Signed in as: {loggedUser.firstname}</Navbar.Text> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
