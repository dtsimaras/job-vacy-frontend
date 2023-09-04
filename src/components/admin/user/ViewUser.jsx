import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { Container } from "react-bootstrap";

const ViewUser = () => {
  const [user, setUser] = useState({})
  const { userId } = useParams();
  const { api } = useApi();

  // const isManager = location.state.roles.includes("MANAGER");

  useEffect(() => {
    //todo: Get User Info and Requests. If manager get Team members also. 
  }, []);


  //! This is ONLY for Manager
  return (
    <>
      <Container>
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        this is for Manager only maybe do tabs? 
        <ol>
          <li>Team Member</li>
        </ol>
        <ul>
          <li>User Request</li>
        </ul>
      </Container>
    </>
  );
};
export default ViewUser;
