import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import Register from "./components/Register/Register";
import Homepage from "./components/Homepage/Homepage";
import { useContext } from "react";
import axios from "axios";
import ApplicationContext from "./components/context/ApplicationContext";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import LoginPage from "./components/Login/LoginPage";
import { ConditionalPageRender } from "./components/ConditionalRender";

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
            <Route path="/" element={<LoginPage />} />
          </>
        )}
        <Route path="/register" element={<Register api={api} />} />

        {loggedUser && loggedUser.roles.includes("ADMIN") &&
          <Route path="/AdminDashboard" element={
            <AdminDashboard api={api} />
          } />
        }
        <Route
          path="/ManagerDashboard"
          element={
            <ConditionalPageRender role={"MANAGER"}>
              <ManagerDashboard api={api} />
            </ConditionalPageRender>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
