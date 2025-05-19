import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./CustomModal.module.css";

const CustomModal = ({ 
  show, 
  onHide, 
  successMessage, 
  failMessage, 
  resultValue, 
  mode = "close", 
  callbackOnSuccess, 
  callbackOnFail 
}) => {
  const [userClicked, setUserClicked] = useState(false);

  const handleCallback = (isSuccess) => {
    setUserClicked(true);
    onHide();

    if (isSuccess && typeof callbackOnSuccess === "function") {
      callbackOnSuccess();
    } else if (!isSuccess && typeof callbackOnFail === "function") {
      callbackOnFail();
    }
  };

  const handleClose = () => {
    handleCallback(resultValue === "1");
  };

  const handleConfirm = () => {
    handleCallback(true);
  };

  const handleCancel = () => {
    handleCallback(false);
  };

  useEffect(() => {
    setUserClicked(false);
  }, [show]);

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      backdrop="static" 
      keyboard={false}
    >
      <Modal.Body className={styles["modal-body"]}>
        {resultValue === "1" ? successMessage : failMessage}
      </Modal.Body>

      <Modal.Footer className={styles["modal-footer"]}>
        {mode === "confirm" ? (
          <>
            <Button className="btn btn-primary" onClick={handleConfirm}>
              confirm
            </Button>
            <Button className="btn btn-danger" onClick={handleCancel}>
              cancel
            </Button>
          </>
        ) : (
          <Button className="btn btn-secondary" onClick={handleClose}>
            close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
