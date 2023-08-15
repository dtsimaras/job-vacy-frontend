import DataTable from "../../components/DataTable";
import Header from "../../components/Header";
import { Tab, Tabs } from "react-bootstrap";
import LeaveRequestForm from "./LeaveRequestForm";

function UserDashboard() {

  return (
    <>
      <Header />
      <Tabs defaultActiveKey="panel" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="panel" title="Panel">
          <p>Control Panel for Important - General Info</p>
        </Tab>
        <Tab eventKey="requests" title="Requests">
          <DataTable dataUrl={"user/requests"} />
        </Tab>
        <Tab eventKey="newrequest" title="New">
          <LeaveRequestForm />
        </Tab>
      </Tabs>
    </>
  );
}

export default UserDashboard;
