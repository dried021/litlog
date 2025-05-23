import React, {useState} from 'react';
import axios from 'axios';
import styles from './DeleteButton.module.css';
import CustomModal from '../Modal/CustomModal';

function DeleteReviewButton({ reviewId, onDelete }) {
  const [modalData, setModalData] = useState({
      show:false,
      message: "",
      mode: "close",
    });
  
    const handleCloseModal = () => {
      setModalData({...modalData, show:false,});
    };
  
    const openModal = (
      successMessage, 
      failMessage = "", 
      resultValue="1",  
      mode="close",
      callbackOnSuccess=null,
      callbackOnFail=null) => {
    setModalData({
      show:true,
      successMessage,
      failMessage, 
      resultValue, 
      mode,
      callbackOnSuccess, 
      callbackOnFail
    });
  };
  
  const handleDelete = () => {
    openModal(
      "Are you sure you want to delete this review?",
      "",
      "1",
      "confirm",
      async () => {
        try {
          await axios.post(`/LitLog/api/admin/review`,
            { id: reviewId }, 
        );
          if (onDelete) onDelete(reviewId);
        } catch (error) {
          console.error('Failed to delete review:', error);
          alert('Failed to delete review.');
        }
      },
      null
    );
  };

  return (
    <>
    <button className={styles.deleteButton} onClick={handleDelete}>
      Delete Review
    </button>
    <CustomModal
    show={modalData.show}
    onHide={handleCloseModal}
    successMessage={modalData.successMessage}
    failMessage={modalData.failMessage}
    resultValue={modalData.resultValue}
    mode={modalData.mode}
    callbackOnSuccess={modalData.callbackOnSuccess}
    callbackOnFail={modalData.callbackOnFail}/>
</>
  );
}

export default DeleteReviewButton;
