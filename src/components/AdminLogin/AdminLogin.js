import "./AdminLogin.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApplicationContext from "../context/ApplicationContext";

const AdminLogin = () => {
    const login = axios.create({
        baseURL: "http://localhost:4000/api/v1/auth/login",
      });
      const navigate = useNavigate();
      const { setJwt,setLoggedUser } = useContext(ApplicationContext)  
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
              ...res.data["userDao"],
            });
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
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              value={loginFormData.email}
              onChange={handleChange}
              type="email"
              placeholder="email@exmaple.com"
              id="email"
              name="email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              value={loginFormData.password}
              onChange={handleChange}
              type="password"
              placeholder="********"
              id="password"
              name="password"
              required
            />
            <button className="link-btn" type="submit">
              Log In
            </button>
          </form>
        </div>
      );
};

export default AdminLogin;