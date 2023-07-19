import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Homepage from "./components/Homepage/Homepage";
import { useContext } from "react";
import axios from "axios";
import ApplicationContext from "./components/context/ApplicationContext";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";

function App() {
  const { jwt, loggedUser } = useContext(ApplicationContext);

  const api = axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return (
    <div className="App">
      <NavbarComponent api={api} />
      <Routes>
        {loggedUser ? (
          <>
            <Route path="/" element={<Homepage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
        <Route path="/register" element={<Register api={api} />} />
        <Route path="/AdminDashboard" element={<AdminDashboard api={api} />} />
        <Route
          path="/ManagerDashboard"
          element={<ManagerDashboard api={api} />}
        />
      </Routes>
    </div>
  );
}

export default App;
