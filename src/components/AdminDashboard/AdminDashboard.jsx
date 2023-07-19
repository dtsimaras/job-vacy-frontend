import "./AdminDashboard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = ({ api }) => {
  const [users, setUsers] = useState([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    api.get("admin/users").then((res) => setUsers(res.data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisable = (id) => {
    api
      .delete(`admin/users/delete/${id}`)
      .then((res) => console.log(res.data))
      .finally(() =>
        setUsers([
          ...users.map((user) => {
            if (user.id === id) {
              user.enabled = false;
            }
            return user;
          }),
        ])
      );
  };
  const handleEnable = (id)=>{
    api
      .post(`admin/users/enable/${id}`)
      .then((res) => console.log(res.data))
      .finally(() =>
        setUsers([
          ...users.map((user) => {
            if (user.id === id) {
              user.enabled = true;
            }
            return user;
          }),
        ])
      );
  
  }

  return (
    <div>
      <h2>All the available users</h2>
      <button type="button" onClick={(e) => setEnabled(!enabled)}>
        {!enabled ? "See disabled" : "See enabled"}
      </button>

      <ul>
        {users
          .filter((user) => user.enabled !== enabled)
          .map((user) => {
            return (
              <li key={user.id}>
                <p>First Name : {user.firstname}</p>
                <p>Last Name : {user.lastname}</p>
                <p>Email : {user.email}</p>
                <p>Enabled: {user.enabled ? "true":"false"}</p>
                {!enabled ? (
                  <button onClick={() => handleDisable(user.id)}>
                    Disable User
                  </button>
                ) : (
                  <button onClick={() => handleEnable(user.id)}>
                    Enable User
                  </button>
                )}
              </li>
            );
          })}
      </ul>
      <Link to="/register">
        <button>Create User</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;
