import { useState, useEffect } from "react";
import DataTable from "../../../components/DataTable"
import useApi from "../../../hooks/useApi";

function LeaveManagement() {
  const [leaveTypes, setLeaveTypes] = useState('');
  const { get} = useApi();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await get('/leavetypes');
            setLeaveTypes({ ...res.data });
        } catch (err) {
            console.error("Error fetching data:", err)
        }
    }
    fetchData();
}, [])


  const dataFormatter = (element, header) => {
    if (header === "type") {
      return leaveTypes[element[header]];
    }
    if (Array.isArray(element[header])) {
        const arr = [...element[header]].reverse();
        return arr.join("/");
    }
    return element[header];
};

  return (
    <>
        <DataTable formatter={dataFormatter} dataUrl={"user/requests"} />
    </>
  )
}

export default LeaveManagement