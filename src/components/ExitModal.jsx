import React from 'react';
import {Modal} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function ExitModal(props) {
  const navigate = useNavigate();

  function exit() {
    navigate('/');
    window.open(props.linkPay);
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
        You're leaving...
    </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
            This action will take you to a third-party payment system.
        </h6>
      </Modal.Body>
      <Modal.Footer>
        <div style={{textAlign: 'center', width: '100%'}}>
          <button className="campsites_card_button" onClick={exit} style={{width: 110, marginRight: '10px'}}>Proceed</button>
          <button className="campsites_card_button" onClick={props.onHide} style={{width: 110, backgroundColor: 'grey'}}>Cancel</button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ExitModal