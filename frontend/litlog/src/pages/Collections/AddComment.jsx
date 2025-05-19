import React, { useState } from 'react';
import styles from './AddComment.module.css';
import CustomModal from "../../components/Modal/CustomModal";

const AddComment = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    mode: "close",
    resultValue: "1",
  });

  const openModal = ({ message, mode = "close", resultValue = "1", callbackOnSuccess = null, callbackOnFail = null }) => {
    setModalData({
      show: true,
      message,
      mode,
      resultValue,
      callbackOnSuccess,
      callbackOnFail
    });
  };

  const handleCloseModal = () => {
    setModalData(prev => ({ ...prev, show: false }));
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      openModal({ message:'Enter your comment.'});
      return;
    }
    onSubmit(content);
    setContent('');
  };

  return (
    <div className={styles.addCommentContainer}>
      <h3 className={styles.addCommentTitle}>Add Comment</h3>
      <textarea
        className={styles.textarea}
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handleSubmit}>Submit</button>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>Cancel</button>
      </div>
      <CustomModal
        show={modalData.show}
        onHide={handleCloseModal}
        successMessage={modalData.message}
        failMessage={modalData.message}
        resultValue={modalData.resultValue}
        mode={modalData.mode}
        callbackOnSuccess={modalData.callbackOnSuccess}
        callbackOnFail={modalData.callbackOnFail}
      />
    </div>
  );
};

export default AddComment;
