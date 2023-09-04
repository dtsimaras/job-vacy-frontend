import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

const EditUserForm = ({ editUser, setEditUser }) => {
  const handleChange = (e) => {
    const { id, checked, value } = e.target;
    if (e.target.type === "checkbox") {
      if (checked) {
        setEditUser({
          ...editUser,
          roles: [...editUser.roles, value],
        });
      } else {
        setEditUser({
          ...editUser,
          roles: [...editUser.roles.filter((role) => role !== value)],
        });
      }
    } else {
      setEditUser({ ...editUser, [id]: value });
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
              value={editUser.firstname}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="lastname">
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Doe"
              value={editUser.lastname}
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
              value={editUser.email}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
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
                checked={editUser.roles.includes("USER")}
                onChange={handleChange}
              />
              <Form.Check
                arial-label="Manager"
                label="Manager"
                name="manager"
                id="manager"
                value={"MANAGER"}
                checked={editUser.roles.includes("MANAGER")}
                onChange={handleChange}
              />
              <Form.Check
                // disabled
                arial-label="Admin"
                label="Admin"
                name="admin"
                id="admin"
                value={"ADMIN"}
                checked={editUser.roles.includes("ADMIN")}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </fieldset>
      </Form>
    </Container>
  );
};

export default EditUserForm;
