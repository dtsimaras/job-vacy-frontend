import { useState, useEffect } from "react";

const ManagerDashboard = ({ api }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    api.get("admin/users").then((res) => setUsers(res.data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    return (
        <h2>Manager Dashboard</h2>
    )
}

export default ManagerDashboard;