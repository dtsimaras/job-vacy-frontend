import "./LoginPage.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ApplicationContext from "../context/ApplicationContext";

const LoginPage = () => {
  const login = axios.create({
    baseURL: "http://localhost:4000/api/v1/auth/login",
  });
  const navigate = useNavigate();
  const { setJwt, setLoggedUser } = useContext(ApplicationContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login
      .post("", loginFormData)
      .then((res) => {
        setJwt(res.data["token"]);
        setLoggedUser({
          ...res.data["userDao"],
        });
        console.log(res.data);
        setErrorMessage(null);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log(err)
      })
      .finally(() => navigate("/"));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginFormData({ ...loginFormData, [id]: value });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2 className="login-h2">Login Form</h2>
        <div className="login-wrapper">
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            className="login-input"
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
            onChange={handleChange}
          />
        </div>
        <div className="login-wrapper">
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            className="login-input"
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleChange}
          />
        </div>
        <div className="login-actions-wrapper">
          <button className="login-btn" type="submit">
            Login
          </button>
        </div>
      </form>
      <label>{errorMessage}</label>
    </div>
  );
};
export default LoginPage;
