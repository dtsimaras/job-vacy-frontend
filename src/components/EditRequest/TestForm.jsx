import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import useApi from "../../hooks/useApi";
import { DateLocalizer } from "react-big-calendar";

const TestForm = ({ request, setRequest }) => {
  const [formData, setFormData] = useState({
    ...request,
    startDate: Date.parse(request.startDate),
    endDate: Date.parse(request.endDate),
  });
  const { get } = useApi();

  const [leaveTypes, setLeaveTypes] = useState("");
  const fetchData = async () => {
    try {
      const res = await get("/leavetypes");
      setLeaveTypes({ ...res.data });
      //   setFormData({ ...formData, type: Object.keys(res.data)[0] });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    console.table(formData);
    console.table(request);
  };

  useEffect(() => {
    setRequest({ ...formData });
  }, [formData]);

  return (
    <form style={{ display: "grid" }}>
      <h2>Hello FormData here!!</h2>
      <DatePicker
        closeOnScroll={true}
        onChange={(d) => setFormData({ ...formData, startDate: d })}
        id="startDate"
        dateFormat="dd/MM/yyyy"
        className="form-control"
        selected={formData.startDate}
        onChangeRaw={(e) => e.preventDefault()}
        startDate={formData.startDate}
        endDate={formData.endDate}
        // minDate={new Date()}
      />
      <DatePicker
        closeOnScroll={true}
        id="endDate"
        onChange={(d) => setFormData({ ...formData, endDate: d })}
        dateFormat="dd/MM/yyyy"
        className="form-control"
        selected={formData.endDate}
        onChangeRaw={(e) => e.preventDefault()}
        startDate={formData.startDate}
        endDate={formData.endDate}
        minDate={formData.startDate}
      />
      <select
        name="type"
        id="type"
        value={formData.type}
        onChange={(event) =>
          setFormData({ ...formData, type: event.target.value })
        }
      >
        {Object.keys(leaveTypes).map((key, index) => (
          <option key={index} value={key}>
            {leaveTypes[key]}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleClick}>
        click
      </button>
    </form>
  );
};
export default TestForm;
