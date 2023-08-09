import "./App.css";
import { Routes, Route } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
import CreateUser from "./components/CreateUser";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./utils/PrivateRoute";

import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin routes */}
        <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} requiredRoles={['ADMIN']} />} />
        <Route path="/admin/create-user" element={<PrivateRoute element={<CreateUser />} requiredRoles={['ADMIN']} />} />

        {/* Manager routes */}
        <Route path="/manager" element={<PrivateRoute element={<ManagerDashboard />} requiredRoles={['MANAGER']} />} />
      </Routes>
    </div>
  );
}

export default App;
