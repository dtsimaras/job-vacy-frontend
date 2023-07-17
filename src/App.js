import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useContext } from "react";
import axios from "axios";
import ApplicationContext from "./components/context/ApplicationContext";

function App() {
  const { jwt,loggedUser } = useContext(ApplicationContext);

  const api = axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return (
    <div className="App">
      <Navbar api={api}/>

      <Routes>
        {loggedUser ? (
          <>
            <Route
              path="/"
              element={<AdminDashboard api={api} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/register" element={<Register api={api} />} />
      </Routes>
    </div>
  );
}

export default App;
