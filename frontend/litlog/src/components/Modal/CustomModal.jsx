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

  /** 공통적인 callback 처리 함수 */
  const handleCallback = (isSuccess) => {
    setUserClicked(true);
    onHide();

    if (isSuccess && typeof callbackOnSuccess === "function") {
      callbackOnSuccess();
    } else if (!isSuccess && typeof callbackOnFail === "function") {
      callbackOnFail();
    }
  };

  /** 모달이 닫힐 때 실행되는 함수 */
  const handleClose = () => {
    handleCallback(resultValue === "1");
  };

  /** 확인 버튼 클릭 */
  const handleConfirm = () => {
    handleCallback(true);
  };

  /** 취소 버튼 클릭 */
  const handleCancel = () => {
    handleCallback(false);
  };

  /** 모달이 열릴 때마다 userClicked 초기화 */
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
              Confirm
            </Button>
            <Button className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button className="btn btn-secondary" onClick={handleClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
