import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

const EditTeam = ({ team, setTeam }) => {
  const [manager, setManager] = useState("");
  const [managers, setManagers] = useState([]);
  const { api } = useApi();

  useEffect(() => {
    api
      .get("admin/team/managers")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <form>
      <div className="form-wrapper">
        <select
          name="managers"
          id="managers"
          value={team.manager.email}
          onChange={(e) => setManager(e.target.value)}
        >
          <option value={team.manager.email}>{team.manager.email}</option>
          {managers.map((newManager, key) => (
            <option key={key} value={newManager.id}>
              {newManager.email}
            </option>
          ))}
        </select>
      </div>
      <h3>
        Manager: {team.manager.email} <button>edit</button>
      </h3>
      <h4>
        Members:{" "}
        <ul>
          {team.members.map((member, key2) => (
            <li key={key2}>
              {member.email} <button>Remove</button>
            </li>
          ))}
          <button>add</button>
        </ul>
      </h4>
    </form>
  );
};
export default EditTeam;
