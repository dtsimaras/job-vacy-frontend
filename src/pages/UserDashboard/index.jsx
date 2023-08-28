import Header from "../../components/Header";
import { Tab, Tabs } from "react-bootstrap";
import LeaveRequestForm from "./LeaveRequestForm";
import Panel from "./Panel";
import LeaveManagement from "./LeavesManagement";

function UserDashboard() {

  return (
    <>
      <Header />
      <Tabs defaultActiveKey="panel" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="panel" title="Panel">
          <Panel />
        </Tab>
        <Tab eventKey="requests" title="Requests">
          <LeaveManagement />
        </Tab>
        <Tab eventKey="newrequest" title="New">
          <LeaveRequestForm />
        </Tab>
      </Tabs>
    </>
  );
}

export default UserDashboard;
