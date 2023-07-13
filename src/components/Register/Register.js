import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ api }) => {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    roles: ["USER"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("admin/users", registerFormData)
      .then((res) => console.log(res.data))
      .finally(() => navigate("/admindashboard"));
  };
  const handleChange = (e) => {
    const { id, checked, value } = e.target;
    if (e.target.type === "checkbox") {
      if (checked) {
        setRegisterFormData({
          ...registerFormData,
          roles: [...registerFormData.roles, value],
        });
      } else {
        setRegisterFormData({
          ...registerFormData,
          roles: [...registerFormData.roles.filter((role) => role !== value)],
        });
      }
    } else {
      setRegisterFormData({ ...registerFormData, [id]: value });
    }
  };

  return (
    <div>
      <h2>Create a new user</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          value={registerFormData.firstname}
          name="firstname"
          onChange={handleChange}
          id="firstname"
          placeholder="Firstname"
        />

        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          value={registerFormData.lastname}
          name="lastname"
          onChange={handleChange}
          id="lastname"
          placeholder="Lastname"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={registerFormData.email}
          name="email"
          onChange={handleChange}
          id="email"
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={registerFormData.password}
          name="password"
          onChange={handleChange}
          id="password"
          placeholder="Password"
        />
        <label htmlFor="user">User</label>
        <input
          onChange={handleChange}
          disabled
          checked={registerFormData.roles.includes("USER")}
          type="checkbox"
          name="user"
          id="user"
        />

        <label htmlFor="manager">Manager</label>
        <input
          onChange={handleChange}
          checked={registerFormData.roles.includes("MANAGER")}
          type="checkbox"
          id="manager"
          name="manager"
          value="MANAGER"
        />

        <label htmlFor="admin">Admin</label>
        <input
          onChange={handleChange}
          checked={registerFormData.roles.includes("ADMIN")}
          type="checkbox"
          id="admin"
          name="admin"
          value="ADMIN"
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default Register;
