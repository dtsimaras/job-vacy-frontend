import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import CreateUser from "../../../components/admin/user/CreateUser";
import AdminUsersTable from "../../../components/admin/user/AdminUsersTable";

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
          {/* <DataTable dataUrl={"admin/users"} /> */}
          <AdminUsersTable />
        </Tab>
        <Tab eventKey="create-user" title="New User">
          <CreateUser setActive={setActive} />
        </Tab>
      </Tabs>
    </>
  );
};

export default UserManagement;
