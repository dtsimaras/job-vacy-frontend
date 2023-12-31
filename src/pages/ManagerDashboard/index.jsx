import Header from "../../components/Header";
import { Tab, Tabs } from "react-bootstrap";
import DataTable from "./DataTable";

const formatter = (element, header) => {
  if (typeof element[header] === "boolean") {
      return element[header] ? "Yes" : "No";
  }
  if (Array.isArray(element[header])) {
      const arr = [...element[header]].reverse();
      return arr.join("/");
  }
  return element[header];
}

const ManagerDashboard = () => {

  return (
    <>
      <Header />
      <Tabs
        defaultActiveKey="panel"
        className="mb-3"
      >
        <Tab eventKey="panel" title="Panel">
          Calendar
        </Tab>
        <Tab eventKey="members" title="Members">
        <DataTable dataUrl={"manager/members"} />
        </Tab>
        <Tab eventKey="leave-requests" title="Leave Requests">
        <DataTable formatter={formatter} dataUrl={"manager/requests"} />
        </Tab>
      </Tabs>
    </>
  )
}

export default ManagerDashboard;