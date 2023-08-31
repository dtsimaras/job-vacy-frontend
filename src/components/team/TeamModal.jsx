import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import EditTeam from "./EditTeam";

// eslint-disable-next-line react/prop-types
function TeamModal({ show, handleClose, handleX, setTeamToEdit, teamToEdit }) {
  return (
    <>
      <Modal show={show} onHide={handleX}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTeam setTeam={setTeamToEdit} team={teamToEdit}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleX}>
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

export default TeamModal;
