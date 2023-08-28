import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useApi from '../../../hooks/useApi';
import "./style.css";

// Get todays date in order to set dates you can pick in the DatePicker 
const today = new Date();
const minStartDate = new Date();
minStartDate.setDate(today.getDate());

const LeaveRequestForm = () => {
    const [startDate, setStartDate] = useState(minStartDate);
    const [endDate, setEndDate] = useState(null);
    const [selectedType, setSelectedType] = useState('');
    const [leaveTypes, setLeaveTypes] = useState('');
    const [daysPerLeaveType, setDaysPerLeaveType] = useState();
    const [remainingDays, setRemainingDays] = useState(-1);
    const { get, post } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/leavetypes');
                const days = await get('/user/days');
                setLeaveTypes({ ...res.data });
                setDaysPerLeaveType(days.data);
            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (daysPerLeaveType !== undefined)
            setRemainingDays(daysPerLeaveType.find(element => element.type === selectedType)?.remaining || -1);
    }, [daysPerLeaveType, selectedType])

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleLeaveTypeChange = (event) => {
        setSelectedType(event.target.value);
        setRemainingDays(daysPerLeaveType.find(element => element.type === selectedType)?.remaining || -1);
    };

    const handleSubmit = () => {
        // event.preventDefault();
        try {
            post("user/requests", { startDate, endDate, type: selectedType })
                .then((res) => console.log(res.data))
                .finally(() => {
                    setStartDate(new Date());
                    setEndDate(null);
                    setSelectedType('');
                });
        } catch (err) {
            console.error("Something went wrong, error:", err);
        }
    };

    function showAvailability() {
        if (remainingDays > 0)
            return (<Form.Text>Available days: {remainingDays}</Form.Text>);
        return "";
    }

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="startDate">
                            <Form.Label column sm={3}>Start Date:</Form.Label>
                            <Col sm={9}>
                                <DatePicker
                                    closeOnScroll={true}
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    onChangeRaw={e => e.preventDefault()}
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={minStartDate}
                                    filterDate={isWeekday}
                                    dayClassName={date => isWeekday(date) ? "weekend" : ""}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="endDate">
                            <Form.Label column sm={3}>End Date:</Form.Label>
                            <Col sm={9}>
                                <DatePicker
                                    closeOnScroll={true}
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    onChangeRaw={e => e.preventDefault()}
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    filterDate={isWeekday}
                                    dayClassName={date => isWeekday(date) ? "weekend" : ""}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="leaveType">
                            <Form.Label>Type of Leave:</Form.Label>
                            <Form.Control as="select" value={selectedType} onChange={handleLeaveTypeChange}>
                                {
                                    Object.keys(leaveTypes).map((key, index) => (
                                        <option key={index} value={key}>
                                            {leaveTypes[key]}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                            {showAvailability()}
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LeaveRequestForm;