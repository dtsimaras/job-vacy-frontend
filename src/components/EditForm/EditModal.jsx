import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import EditUser from "../EditUser/EditUser";
import useApi from "../../hooks/useApi";

// eslint-disable-next-line react/prop-types
function EditModal({ item, fetchData }) {
  const { api } = useApi();
  const [show, setShow] = useState(false);
  const [editable, setEditable] = useState(item);

  const handleShow = () => {
    setShow(true);
  };

  const editUser = () => {
    return <EditUser editable={editable} setEditable={setEditable} />;
  };
  const editRequest = () => {
    return "Not Hello";
  };
  const handleClose = () => {
    setShow(false);
    if (editable.email !== undefined) {
      handleUserEdit();
    } else {
      handleRequestEdit();
    }
  };
  const handleUserEdit = () => {
    console.log(editable);
    api.put(`/admin/users/${editable.id}`, editable).finally(() => fetchData());
  };
  const handleRequestEdit = () => {
    console.log("Handle requesty edit");
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <FaEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* This is the body */}
          {editable.email !== undefined ? editUser() : editRequest()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
