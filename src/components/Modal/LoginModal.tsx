import React from "react";
import {
    Modal,
    Button,
} from "react-bootstrap";

const LoginModal = ({
    showModal,
    handleCloseModal,
}) => {
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
          <Modal.Title>Add New Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {/* Modal content here */}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
              Close
          </Button>
          <Button variant="primary" onClick={() => { /* handle submission */ }}>
              Save Changes
          </Button>
      </Modal.Footer>
  </Modal>
    );
};

export default LoginModal;
