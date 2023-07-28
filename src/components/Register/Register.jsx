/* eslint-disable react/prop-types */
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Register = ({ api }) => {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    roles: [""],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("admin/users", registerFormData)
      .then((res) => console.log(res.data))
      .finally(() => navigate("/"));
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

  return (
    <div className="register-form">
      <Form onSubmit={handleSubmit}>
        <h2 className="h2-register">Create a new user</h2>
        <Form.Group as={Row} className="mb-3" controlId="firstname">
          <Form.Label column sm={1}>
            Firstname :
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="firstname" placeholder="Firstname" value={registerFormData.firstname} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="lastname">
          <Form.Label column sm={1}>
            Lastname :
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="lastname" placeholder="Lastname" value={registerFormData.lastname} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm={1}>
            Email :
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="email" placeholder="Email" value={registerFormData.email} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Label column sm={1}>
            Password :
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="password" placeholder="Password" value={registerFormData.password} onChange={handleChange}/>
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row} className="mb-3 check">
            <Form.Label as="legend" column sm={1}>
              Roles :
            </Form.Label>
            <Col sm={2} className="d-flex justify-content-between align-items-center">
              <Form.Check  
                arial-label="User"
                label="User"
                name="user"
                id="user"
              />
              <Form.Check
                arial-label="Manager"
                label="Manager"
                name="manager"
                id="manager"
              />
              <Form.Check
                arial-label="Admin"
                label="Admin"
                name="admin"
                id="admin"
              />
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row} className="mb-3">
          <Col sm={2} className="d-flex justify-content-end pe-5">
            <Button variant="outline-success" type="submit">Create User</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
