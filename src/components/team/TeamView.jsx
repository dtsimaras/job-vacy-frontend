import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const TeamView = ({ handleShow }) => {
  const { api } = useApi();

  const [allTeams, setAllTeams] = useState([]);
  useEffect(() => {
    api
      .get("admin/team/")
      .then((res) => {
        setAllTeams([...res.data]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (team) => {
    handleShow(team);
  };

  return (
    <ul>
      {allTeams.map((team, key) => (
        <li key={key} onClick={() => handleClick(team)}>
          Manager:{team.manager.lastname} {team.manager.firstname} /{" "}
          {team.manager.email}
          <ul>
            {team.members.map((member, key2) => (
              <li key={key2}>
                {member.lastname} {member.firstname} / {member.email}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
export default TeamView;
