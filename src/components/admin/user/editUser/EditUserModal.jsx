import { Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import EditUserForm from "./EditUserForm";

/* eslint-disable react/prop-types */
const editUserModal = ({
  handleCloseWithSaving,
  show,
  handleCloseWithoutSaving,
  editUser,
  setEditUser,
  handleShowEdit,
}) => {
  return (
    <>
      <FaEdit style={{ cursor: "pointer" }} onClick={handleShowEdit} />

      <Modal show={show} onHide={handleCloseWithoutSaving}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUserForm editUser={editUser} setEditUser={setEditUser} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWithoutSaving}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseWithSaving}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default editUserModal;
