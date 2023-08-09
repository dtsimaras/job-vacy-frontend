import { useState } from "react";
import UserManagement from "./UserManagement";
import Header from "../../components/Header";
import { Tabs, Tab, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import CreateUser from "../../components/CreateUser";
import Panel from "./Panel";

function AdminDashboard() {
  const [activeUsersView, setActiveUsersView] = useState("users");

  const users = <UserManagement />;
  const createUser = <CreateUser setActiveUsersView={setActiveUsersView} />;

  const userViews = {
    users,
    createUser,
  };

  return (
    <div>
      <Header />
      <Tabs
        defaultActiveKey="panel"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab variant="light" eventKey="panel" title="Panel">
          <p>Control Panel for Important - General Info</p>
          <p>
            The first thing admin wants to see. Calendar? Pie for requests? etc.
          </p>

          <Panel />
        </Tab>
        <Tab eventKey="users" title="Users">
          <ToggleButtonGroup
            type="radio"
            name="options"
            value={activeUsersView}
          >
            <ToggleButton
              variant="outline-light"
              id="tbg-radio-1"
              value={"users"}
              onChange={() => setActiveUsersView("users")}
            >
              Users
            </ToggleButton>
            <ToggleButton
              variant="outline-light"
              id="tbg-radio-2"
              value={"createUser"}
              onChange={() => setActiveUsersView("createUser")}
            >
              Create User
            </ToggleButton>
          </ToggleButtonGroup>
          {userViews[activeUsersView]}
        </Tab>
        <Tab eventKey="teams" title="Teams" disabled>
          Tab content for Team Management
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
