import React, { useState, useEffect } from "react";
import styles from "./AddReview.module.css";
import axios from "axios";
import CustomModal from "../../components/Modal/CustomModal";

function AddRating({ onChange }) {
  const [rating, setRating] = useState(5);


  const handleStar = (key) => {
    const newRating = (rating < key) ? key : key - 1;
    setRating(newRating);

    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;

        return (
          <img
            className={styles['star']}
            key={starIndex}
            src={starIndex <= rating ? "/LitLog/icons/star.svg" : "/LitLog/icons/star_gray.svg"}
            alt={`Star ${starIndex}`}
            onClick={() => handleStar(starIndex)}
          />
        );
      })}
    </div>
  );
}


function AddReview({ bookApiId, onCancel, onSubmit }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
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

const handleSubmit = () => {
  openModal(
    "Would you like to post your review?",
    "",
    "1",
    "confirm",
    async () => {
      try {
        const response = await axios.post(`/LitLog/api/books/review`, {
          bookApiId,
          content,
          rating,
        }, { withCredentials: true }
      );

        const result = response.data;

        if (result.isAlreadyReviewed){
          openModal("You have already submitted a review.", "", "1", "close");
          return;
        }

        if (result.success) {
          const newReview = {
            id: result.reviewId,
            userId: result.userId,
            content,
            rating,
            isLiked: false,
            likeCount: 0,
          };
          onSubmit(newReview);
        }

        setContent("");
        setRating(0);
      } catch (err) {
        console.error("Add review error:", err);
      }
    },
    null
  );
};


  const handleCancel = () => {
    setContent("");
    setRating(0);
    onCancel();
  };

  return (
    <>
    <div className={styles.addReviewContainer}>
      <h3 className={styles.addReviewTitle}>Add Review</h3>
      
      <textarea
        className={styles.textarea}
        placeholder="Write your review here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

  <div className={styles.buttonGroup}>
    <div className={styles.ratingContainer}>
      <AddRating onChange={(rating) => setRating(rating)}/>
    </div>

    

    <div className={styles.buttonsContainer}>
      <button className={styles.button} onClick={handleSubmit}>Submit</button>
      <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancel}>Cancel</button>
    </div>
  </div>
    </div>

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

export default AddReview;
