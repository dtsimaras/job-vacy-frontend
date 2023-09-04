import { Tab, Tabs } from "react-bootstrap";
// import DataTable from "../../../components/DataTable";
// import CreateUser from "../../../components/CreateUser";
import { useState } from "react";
import TeamView from "../../../components/team/TeamView";
import EditModal from "../../../components/EditForm/EditModal";
import TeamModal from "../../../components/team/TeamModal";
import EditTeam from "../../../components/team/EditTeam";

const TeamManagement = () => {
  const [active, setActive] = useState("view-team");

  const handleSelectTab = (key) => {
    setActive(key);
  };

  const [show, setShow] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState([]);
  const handleX = () => setShow(false);
  const handleShow = (team) => {
    setShow(true);
    setTeamToEdit(team);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="view-team"
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={active}
        onSelect={handleSelectTab}
      >
        <Tab eventKey="view-team" title="View All Teams">
          <TeamView handleShow={handleShow} />
          <TeamModal
            teamToEdit={teamToEdit}
            setTeamToEdit={setTeamToEdit}
            handleClose={handleClose}
            show={show}
            handleX={handleX}
          />
          {/* <DataTable dataUrl={"admin/team"} /> */}
        </Tab>
        <Tab eventKey="create-user" title="Create Team(Todo)" disabled>
          {/* <CreateUser setActive={setActive} /> */}
        </Tab>
      </Tabs>
    </>
  );
};
export default TeamManagement;
