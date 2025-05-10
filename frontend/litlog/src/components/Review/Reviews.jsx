import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import axios from 'axios';
import Pagination from "../../components/Pagination/Pagination";

function Rating({ rating }) {
  return (
    <div>
      {Array.from({ length: rating }, (_, index) => (
        <img
          key={index}
          src="/icons/star2.svg"
          alt={`Image ${index + 1}`}
          style={{ width: "10px", margin: "2px" }}
        />
      ))}
    </div>
  );
}

function Review({ reviews, currentPage, reviewPerPage, isLiked, handleLikeClick }) {

  const handleClickProfile = (userId) => {
    // Implement profile redirection logic
  };

  return (
    <div className={styles['review-list']}>
      {reviews.map((review, index) => {
        const adjustedIndex = index + (currentPage - 1) * reviewPerPage;
        return (
          <div key={review.id} className={styles['review-item']}>
            <div className={styles['index-box']}>
              <p className={styles['index-box-p']}>{adjustedIndex + 1}</p>
            </div>
            <div
              className={styles['user-profile']}
              onClick={() => handleClickProfile(review.userId)}
            >
              <img src="/icons/profile.svg" alt="프로필 자리임" />
            </div>
            <div
              className={styles['user-id']}
              onClick={() => handleClickProfile(review.userId)}
            >
              <p className={styles['user-id-p']}>{review.userId}</p>
            </div>
            <div className={styles['rating']}>
              <Rating rating={review.rating} />
            </div>
            <div className={styles['content']}>
              <p className={styles['content-p']}>{review.content}</p>
            </div>
            <div className={styles['review-like']} onClick={() => handleLikeClick(review.id)}>
              {isLiked ? (
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
  const [isLiked, setIsLiked] = useState(false);

  const reviewPerPage = 5;

  useEffect(() => {
    if (bookApiId) {
      setLoading(true);
      getReviews(bookApiId, currentPage);
    }
  }, [bookApiId, currentPage]);

  const getReviews = async (bookApiId, currentPage) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/reviews`, {
        params: { bookApiId, currentPage },
      });

      const { reviews, reviewsCount } = response.data;
      setReviews(reviews || []);
      setReviewsCount(reviewsCount);

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

  const handleLikeClick = (reviewId) => {
    console.log("Like clicked for review:", reviewId);
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles["review-section"]}>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : reviews.length > 0 ? (
        <>
          <Review
            reviews={reviews}
            currentPage={currentPage}
            reviewPerPage={reviewPerPage}
            isLiked={isLiked}
            handleLikeClick={handleLikeClick}
          />
          <Pagination
            currentPage={currentPage}
            pageCount={Math.ceil(reviewsCount / reviewPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="no-reviews">No reviews yet</p>
      )}
    </div>
  );
}

export default Reviews;
