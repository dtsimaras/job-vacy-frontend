import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";

const ManagerDashboard = ({ api }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    try {
      get("manager/teammembers")
        .then((res) => setTeamMembers(res.data));
      get("manager/teamrequests")
        .then((res) => setTeamMembers(res.data));
    } catch (err) {
      console.log(`Something went wrong, error: ${err}`);
    }

  }, []);


  return (
    <h2>Manager Dashboard</h2>
  )
}

export default ManagerDashboard;