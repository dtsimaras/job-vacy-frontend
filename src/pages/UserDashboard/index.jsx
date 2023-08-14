import DataTable from "../../components/DataTable";
import Header from "../../components/Header";
import { Tab, Tabs } from "react-bootstrap";

function UserDashboard() {

  return (
    <>
      <Header />
      <Tabs defaultActiveKey="panel" id="uncontrolled-tab-example" className="mb-3">
        <Tab variant="light" eventKey="panel" title="Panel">
          <p>Control Panel for Important - General Info</p>
        </Tab>
        <Tab eventKey="requests" title="Requests">
          <DataTable dataUrl={"user/requests"} />
        </Tab>
      </Tabs>
    </>
  );
}

export default UserDashboard;
