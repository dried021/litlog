import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import axios from 'axios';
import Pagination from "../../components/Pagination/Pagination";
import AddReview from "./AddReview";

function Rating({ rating }) {
  return (
    <div>
      {Array.from({ length: rating }, (_, index) => (
        <img 
          className={styles['star']}
          key={index}
          src="/icons/star2.svg"
          alt={`Image ${index + 1}`}
        />
      ))}
      {Array.from({ length: (5-rating) }, (_, index) => (
        <img 
          className={styles['star']}
          key={index}
          src="/icons/emptyStar.svg"
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
}


function Review({ reviews, currentPage, reviewPerPage, handleLikeClick }) {
  const handleClickProfile = (userId) => {
    navigate(`/${userId}`);
    };


    return (
    <div className={styles['review-list']}>
        {reviews.map((review, index) => {
        const adjustedIndex = index + (currentPage - 1) * reviewPerPage;
        return (
            <div key={review.id} className={((index+1)%5==0)?styles['review-item-last'] : styles['review-item']}>

            <div className={styles['index-box']}>
                <p className={styles['index-box-p']}>{adjustedIndex + 1}</p>
            </div>

            <div className={styles['user-profile']} onClick={() => handleClickProfile(review.userId)}>
                <img src="/icons/profile.svg" alt="prodile" />
            </div>

            <div className={styles['review-content']}>
                <div className={styles['user-id']} onClick={() => handleClickProfile(review.userId)}>
                    <div className={styles['user-id-p']}>{review.nickname}</div>
                </div>
                <div className={styles['rating']}>
                    <Rating rating={review.rating} />
                </div>
                <div className={styles['content']}>
                    <div className={styles['content-p']}>{review.content}</div>
                </div>
            </div>

            <div className={styles['review-like']} onClick={() => handleLikeClick(review.id)}>
                {review.isLiked ? (
                <img src="/icons/heart_filled.svg" alt="Liked" />
                ) : (
                <img src="/icons/heart_outline.svg" alt="Not Liked" />
                )}
                <p className={styles['review-like-count']}>{review.likeCount}</p>
            </div>
            </div>
        );
        })}
    </div>
    );
}

function Reviews({ bookApiId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopularity, setIsPopularity] = useState(true);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const reviewPerPage = 5;

  const handleOptionClick = (option) => {
    setIsPopularity(option === "popularity");
    setCurrentPage(1);
  };

  useEffect(() => {
    if (bookApiId && !isAddingReview) {
      setLoading(true);
      getReviews(bookApiId, currentPage, isPopularity);
    }
  }, [bookApiId, currentPage, isPopularity, isAddingReview]);

  const getReviews = async (bookApiId, currentPage, isPopularity) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/reviews`, {
        params: { bookApiId, currentPage, isPopularity},
      });
      const { reviews, reviewsCount } = response.data;
      setReviews(reviews || []);
      setReviewsCount(reviewsCount || 0);
    } catch (error) {
      console.error("Fail to fetch reviews:", error);
      setReviews([]);
      setReviewsCount(0);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleLikeClick = async (reviewId) => {
    try{
        const updatedReviews = reviews.map((review) => {
            if (review.id === reviewId){
                const isLiked= !review.isLiked;
                const likeCount = isLiked? review.likeCount + 1 : review.likeCount -1;

                axios.post(`http://localhost:9090/books/reviews/like`, {
                    reviewId, isLiked
                }).catch((err) => console.error("Like update error:", err));

                return {...review, isLiked, likeCount};
            }
            return review;
        });
        setReviews(updatedReviews);
    }catch(error){
        console.error("Error updating like status: ", error);
    }
  };

  const handleAddReview = () => {
    setIsAddingReview(true);    
  }

  const handleCancelAddReview = () => {
    setIsAddingReview(false);
  }

  const handleReviewSubmitted = (newReview) => {
    setIsAddingReview(false);
    setReviews([newReview, ...reviews]);
    setReviewsCount(reviewsCount + 1);
  }

  return (
    <div className={styles["review-section"]}>
      {loading ? (
        <p className={styles.reviewstext}>Loading...</p>
      ) : (
        <>
          <div className={styles.optionsContainer}>
            <div className={styles.leftContainer}>
              <p 
                className={`${styles.option} ${isPopularity ? styles.optionActive : ""}`} 
                onClick={() => handleOptionClick("popularity")}
              >
                Popularity
              </p>
              <p 
                className={`${styles.option} ${!isPopularity ? styles.optionActive : ""}`} 
                onClick={() => handleOptionClick("newest")}
              >
                Newest
              </p>
            </div>

            <div className={styles.rightContainer}>
              <p className={styles.addReviewButton} onClick={handleAddReview}>
                Add Review
              </p>
            </div>
          </div>

          {isAddingReview ? (
            <AddReview
              bookApiId = {bookApiId}
              onCancel = {handleCancelAddReview}
              onSubmit = {handleReviewSubmitted}/>
          )
          :reviews.length > 0 ? (
            <>
              <Review
                reviews={reviews}
                currentPage={currentPage}
                reviewPerPage={reviewPerPage}
                handleLikeClick={handleLikeClick}
              />
              <Pagination
                currentPage={currentPage}
                pageCount={Math.ceil(reviewsCount / reviewPerPage)}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className={styles.reviewstext}>No reviews yet</p>
          )}
        </>
      )}
    </div>
  );
}

export default Reviews;
