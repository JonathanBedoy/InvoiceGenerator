import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Button from "../Button/Button";




const CautionModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = (choice) => {
    // this should also give what the user chose
    props.modalClosed(choice)
    setShow(false)
  };
  // const handleShow = () => setShow(true);

  useEffect(() => {
    if (props.show !== null) {
      setShow(props.show)
    }


  }, [props.show])

  return (
    <Container>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal backdrop='static' show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{props.title ? props.title : 'Warning'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.cautionText ? props.cautionText : 'Are you sure?'}</Modal.Body>
        <Modal.Footer>
          <Row>
            <Col col={6}>
              <Button type="danger" click={() => handleClose(false)}>
                {props.CancelText ? props.CancelText : 'Cancel'}
              </Button>
            </Col>
            <Col col={6}>
              <Button type="secondary" click={() => handleClose(true)}>
              {props.ContinueText ? props.ContinueText : 'Confirm'}
              </Button>
            </Col>
          </Row>


        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default CautionModal