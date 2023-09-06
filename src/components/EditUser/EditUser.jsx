/* eslint-disable react/prop-types */
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

const EditUser = ({ editable, setEditable }) => {
  const handleChange = (e) => {
    const { id, checked, value } = e.target;
    if (e.target.type === "checkbox") {
      if (checked) {
        setEditable({
          ...editable,
          roles: [...editable.roles, value],
        });
      } else {
        setEditable({
          ...editable,
          roles: [...editable.roles.filter((role) => role !== value)],
        });
      }
    } else {
      setEditable({ ...editable, [id]: value });
    }
  };

  return (
    <Container>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="firstname">
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="John"
              value={editable.firstname}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="lastname">
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Doe"
              value={editable.lastname}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group  as={Row} className="mb-3" controlId="email">
          <Col sm={6}>
            <Form.Control
              disabled
              type="email"
              placeholder="example@email.com"
              value={editable.email}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group as={Row} className="mb-3" controlId="password">
          <Col sm={6}>
            <Form.Control
              type="password"
              placeholder="password"
              value={editable.password}
              onChange={handleChange}
            />
          </Col>
        </Form.Group> */}
        {/* TODO: implement repeat password */}
        <fieldset>
          <Form.Group as={Row} className="mb-3 check">
           
            <Col
              sm={6}
              className="d-flex justify-content-between align-items-center"
            >
              <Form.Check
                arial-label="User"
                label="User"
                name="user"
                id="user"
                value={"USER"}
                checked={editable.roles.includes("USER")}
                onChange={handleChange}
              />
              <Form.Check
                arial-label="Manager"
                label="Manager"
                name="manager"
                id="manager"
                value={"MANAGER"}
                checked={editable.roles.includes("MANAGER")}
                onChange={handleChange}
              />
              <Form.Check
                // disabled
                arial-label="Admin"
                label="Admin"
                name="admin"
                id="admin"
                value={"ADMIN"}
                checked={editable.roles.includes("ADMIN")}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </fieldset>
      </Form>
    </Container>
  );
};

export default EditUser;
