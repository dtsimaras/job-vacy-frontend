import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaveRequestForm = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [leaveType, setLeaveType] = useState('');

    const today = new Date();
    const minStartDate = new Date();
    minStartDate.setDate(today.getDate() + 5);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleLeaveTypeChange = (event) => {
        setLeaveType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO: need a useEffect to get the leavetypes. Maybe also change the leaveTypeEnum to have value-label pair so i can get the label to show from the api
        // use post form useApi() to create the leave request.
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Leave Type:', leaveType);

        // Reset form fields
        setStartDate(null);
        setEndDate(null);
        setLeaveType('');
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
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="leaveType">
                            <Form.Label>Type of Leave:</Form.Label>
                            <Form.Control as="select" value={leaveType} onChange={handleLeaveTypeChange}>
                                <option value="">Select Leave Type</option>
                                <option value="vacation">Vacation</option>
                                <option value="sick">Sick Leave</option>
                                <option value="personal">Personal Leave</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LeaveRequestForm;