import "./App.css";
import { Routes, Route } from "react-router-dom";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import Register from "./components/Register/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute element={<AdminDashboard />} requiredRoles={['ADMIN']} />
          }
        />
        <Route
          path="/manager"
          element={
            <PrivateRoute element={<ManagerDashboard />} requiredRoles={['MANAGER']} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
