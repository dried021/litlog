import React, { useState, useEffect } from "react";
import styles from "./AddReview.module.css";
import axios from "axios";
import CustomModal from "../../components/Modal/CustomModal";

function AddRating({ onChange, onTouched }) {
  const [rating, setRating] = useState(1);
  const [touched, setTouched] = useState(false);

  const handleStar = (key) => {
    const newRating = (rating < key) ? key : key - 1;
    setRating(newRating);

    if (!touched) {
      setTouched(true);
      if (onTouched) onTouched();
    }

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
            src={starIndex <= rating ? "/icons/star2.svg" : "/icons/emptyStar.svg"}
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
  const [rating, setRating] = useState(1);
  const [ratingTouched, setRatingTouched ] = useState(false);
  const [modalData, setModalData] = useState({
    show:false,
    message: "",
    mode: "close",
  });

  const handleCloseModal = () => {
    setModalData({...modalData, show:false,});
  };

  const openModal = (message) => {
    setModalData({
      show:true,
      message,
      mode: "close",
    });
  };

  const handleSubmit = async () => {
    console.log(ratingTouched);
    if (!ratingTouched) {
      openModal("Please select a rating.")
      return;
    }

    try {
      const response = await axios.post(`http://localhost:9090/books/review`, {
        bookApiId,
        content,
        rating,
      });

      const result = response.data;

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
      <AddRating onChange={(rating) => setRating(rating)} onTouched={() =>setRatingTouched(true)}/>
    </div>

    

    <div className={styles.buttonsContainer}>
      <button className={styles.button} onClick={handleSubmit}>Submit</button>
      <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancel}>Cancel</button>
    </div>
  </div>
    </div>

  {/* 모달 컴포넌트 */}
  <CustomModal
    show={modalData.show}
    onHide={handleCloseModal}
    successMessage={modalData.message}
    failMessage={modalData.message}
    resultValue={"1"}
    mode="close"/>
  </>
  );
}

export default AddReview;
