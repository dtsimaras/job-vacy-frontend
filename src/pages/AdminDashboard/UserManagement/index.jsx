import { Tab, Tabs } from "react-bootstrap";
import DataTable from "../../../components/DataTable";
import CreateUser from "../../../components/CreateUser";

const UserManagement = () => {
  return (
    <>

      <Tabs
        defaultActiveKey="view-users"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab variant="light" eventKey="view-users" title="All Users">
          <DataTable dataUrl={"admin/users"} />
        </Tab>
        <Tab eventKey="create-user" title="New User">
        <CreateUser />
        </Tab>
      </Tabs>
    </>
  )
};

export default UserManagement;
