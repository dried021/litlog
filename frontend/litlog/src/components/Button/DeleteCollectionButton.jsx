import React, {useState} from 'react';
import axios from 'axios';
import styles from './DeleteButton.module.css';
import CustomModal from '../Modal/CustomModal';

function DeleteCollectionButton({ collectionId, onDelete }) {
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
      "Are you sure you want to delete this collection?",
      "",
      "1",
      "confirm",
      async () => {
        try {
          await axios.post(`http://localhost:9090/admin/collection`,
            { id: collectionId }, 
        );
          if (onDelete) onDelete(collectionId);
        } catch (error) {
          console.error('Failed to delete collection:', error);
          alert('Failed to delete collection.');
        }
      },
      null
    );
  };

  return (
    <>
    <button className={styles.deleteButton} onClick={handleDelete}>
      Delete Collection
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

export default DeleteCollectionButton;
