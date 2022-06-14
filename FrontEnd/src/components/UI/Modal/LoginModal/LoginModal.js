import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfLoggedIn,
  login,
} from "../../../../store/populateStore/populateStore";
import Button from "../../Button/Button";
import InputField from "../../InputField/InputField";
import Loader from "../../Loader/Loader";

let initialRun = false;

const LoginModal = ({
  show = true,
  modalClosed = () => console.log("no options given"),
  ContinueText = "Login",
  title = "Login",
}) => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [showLocal, setShowLocal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleInputChange = (newInput, from) => {
    setInputs((state) => {
      return {
        ...state,
        [from.type]: newInput,
      };
    });
  };

  const handleClose = (choice) => {
    // this should also give what the user chose
    modalClosed(choice);
    dispatch(login(inputs.username, inputs.password));
    // setShowLocal(false);
  };
  // const handleShow = () => setShowLocal(true);

  useEffect(() => {
    if (show !== null) {
      setShowLocal(show);
    }
    if (user.loggedIn) {
      setShowLocal(false);
    }
  }, [show, user.loggedIn, user.loggingIn]);

  useEffect(() => {
    if (!initialRun) {
      dispatch(checkIfLoggedIn());
      initialRun = true;
    }
  }, []);

  const modalBody = !user.loggingIn ? (
    <Form>
      <InputField
        valueUpdate={handleInputChange}
        placeholder="Enter Username"
        type="username"
        value={inputs.username}
        label="Username"
      />
      <InputField
        valueUpdate={handleInputChange}
        placeholder="Enter Password"
        type="password"
        value={inputs.password}
        label="Password"
      />
      <Col col={6} className="text-center">
        <Button type="secondary" click={() => handleClose(true)}>
          {ContinueText}
        </Button>
      </Col>
    </Form>
  ) : (
    <Loader />
  );

  return (
    <Container>
      <Modal backdrop="static" show={showLocal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </Container>
  );
};
export default LoginModal;
