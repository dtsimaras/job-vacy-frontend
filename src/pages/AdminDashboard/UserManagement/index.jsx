import { Tab, Tabs } from "react-bootstrap";
import DataTable from "../../../components/DataTable";
import CreateUser from "../../../components/CreateUser";
import { useState } from "react";

const UserManagement = () => {
  const [active, setActive] = useState('view-users');

  const handleSelectTab = (key) => {
    setActive(key);
  }

  return (
    <>

      <Tabs
        defaultActiveKey="view-users"
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={active}
        onSelect={handleSelectTab}
      >
        <Tab eventKey="view-users" title="All Users">
          <DataTable dataUrl={"admin/users"} />
        </Tab>
        <Tab eventKey="create-user" title="New User">
          <CreateUser setActive={setActive} />
        </Tab>
      </Tabs>
    </>
  )
};

export default UserManagement;
