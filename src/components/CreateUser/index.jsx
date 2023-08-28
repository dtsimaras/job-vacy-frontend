import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import useApi from "../../hooks/useApi";
import { Container } from "react-bootstrap";

const CreateUser = ({ setActiveUsersView }) => {

  const { api } = useApi();
  const [registerFormData, setRegisterFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    roles: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("admin/users", registerFormData)
      .then((res) => console.log(res.data))
      .finally(() => setActiveUsersView("usersTab"));
  };

  const handleChange = (e) => {
    const { id, checked, value } = e.target;
    if (e.target.type === "checkbox") {
      if (checked) {
        setRegisterFormData({
          ...registerFormData,
          roles: [...registerFormData.roles, value],
        });
      } else {
        setRegisterFormData({
          ...registerFormData,
          roles: [...registerFormData.roles.filter((role) => role !== value)],
        });
      }
    } else {
      setRegisterFormData({ ...registerFormData, [id]: value });
    }
  };

  // return (
  //   <Container>
  //     <Form onSubmit={handleSubmit}>
  //       <FloatingLabel controlId="firstname" label="First Name" className="mb-3">
  //         <Form.Control type="text" placeholder="John" className="col-6" value={registerFormData.firstname} onChange={handleChange} />
  //       </FloatingLabel>

  //       <FloatingLabel controlId="password" label="Password">
  //         <Form.Control type="password" placeholder="Password" />
  //       </FloatingLabel>
  //     </Form>
  //   </Container>
  // );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Add a User</h2>
        <Form.Group as={Row} className="mb-3" controlId="firstname">
          <Form.Label column sm={1}>Firstname :</Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="John" value={registerFormData.firstname} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="lastname">
          <Form.Label column sm={1}>Lastname :</Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Doe" value={registerFormData.lastname} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm={1}>Email :</Form.Label>
          <Col sm={3}>
            <Form.Control type="email" placeholder="example@email.com" value={registerFormData.email} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Label column sm={1}>Password :</Form.Label>
          <Col sm={3}>
            <Form.Control type="password" placeholder="password" value={registerFormData.password} onChange={handleChange} />
          </Col>
        </Form.Group>
        {/* TODO: implement repeat password */}
        <fieldset>
          <Form.Group as={Row} className="mb-3 check">
            <Form.Label as="legend" column sm={1}>
              Roles :
            </Form.Label>
            <Col sm={3} className="d-flex justify-content-between align-items-center">
              <Form.Check
                arial-label="User"
                label="User"
                name="user"
                id="user"
                value={"USER"}
                onChange={handleChange}
              />
              <Form.Check
                arial-label="Manager"
                label="Manager"
                name="manager"
                id="manager"
                value={"MANAGER"}
                onChange={handleChange}
              />
              <Form.Check
                arial-label="Admin"
                label="Admin"
                name="admin"
                id="admin"
                value={"ADMIN"}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row} className="mb-3">
          <Col sm={2} className="d-flex justify-content-end pe-5">
            <Button variant="light" type="submit">Create User</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default CreateUser;
