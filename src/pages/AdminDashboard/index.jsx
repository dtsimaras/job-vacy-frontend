import UserManagement from "./UserManagement";
import Header from "../../components/Header";
import Panel from "./Panel";
import { Tab, Tabs } from "react-bootstrap";

function AdminDashboard() {

  return (
    <>
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
          <UserManagement />
        </Tab>
        <Tab eventKey="teams" title="Teams" disabled>
          Tab content for Team Management
        </Tab>
      </Tabs>
    </>
  );
}

export default AdminDashboard;
