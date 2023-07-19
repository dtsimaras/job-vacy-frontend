import "./Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import FormContainer from "../FormContainer/FormContainer";

import ApplicationContext from "../context/ApplicationContext";

const Login = () => {
  const login = axios.create({
    baseURL: "http://localhost:4000/api/v1/auth/login",
  });
  const navigate = useNavigate();
  const { setJwt,setLoggedUser } = useContext(ApplicationContext);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login
      .post('', loginFormData)
      .then((res) => {
        setJwt(res.data["token"]);
        setLoggedUser({
          ...res.data["userDao"]
        });
        console.log(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => navigate("/"));
   };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginFormData({ ...loginFormData, [id]: value });
  };

  return (
    <div>
      <FormContainer>
        <h2>Login Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="email@exmaple.com" value={loginFormData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={loginFormData.password} onChange={handleChange}/>
          </Form.Group>
          <Button variant="secondary" type="submit">Login</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Login;
