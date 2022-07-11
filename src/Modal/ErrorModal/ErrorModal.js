import React, { useState } from 'react'
import { Button , Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

const ErrorModal = ({ message }) => {

    const [show, setShow] = useState(true)
    const handleClose = () => setShow(false);
    
    return ReactDOM.createPortal(
        <Modal show={show}  onHide= { handleClose} centered={true} backdrop>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick= { handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      , document.getElementById('portal')
    );
  }


export default ErrorModal;

