import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";

function Panel() {
    const [daysPerLeaveType, setDaysPerLeaveType] = useState();
    const { get } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const days = await get('/user/days'); // include property display in the dao in api : "Κανονική"
                setDaysPerLeaveType(days.data);
            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }
        fetchData();
    }, [])

    const showAvailability = () => {
        return daysPerLeaveType?.find(element => element.type === "KANONIKI")?.remaining;
    }


    return (
        <div>
          <p>Control Panel for Important - General Info</p>
            <h2>Διαθέσιμες μέρες κανονικής άδειας: {showAvailability()}</h2>
        </div>
    )
}

export default Panel