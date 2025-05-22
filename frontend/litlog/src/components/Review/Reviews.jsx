import React, { useState, useEffect, useContext } from 'react';
import styles from './Reviews.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Pagination from "../../components/Pagination/Pagination";
import AddReview from "./AddReview";
import ReadMoreButton from '../Button/ReadMoreButton';
import { UserContext } from '../../libs/UserContext';
import CustomModal from "../Modal/CustomModal"; 
import defaultProfile from '../../assets/default_profile.png';



function Rating({ rating }) {
  return (
    <div>
      {Array.from({ length: rating }, (_, index) => (
        <img 
          className={styles['star']}
          key={index}
          src="/icons/star.svg"
          alt={`Image ${index + 1}`}
        />
      ))}
      {Array.from({ length: (5-rating) }, (_, index) => (
        <img 
          className={styles['star']}
          key={index}
          src="/icons/star_gray.svg"
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
}


function Review({ reviews, currentPage, reviewPerPage, handleLikeClick }) {
  const navigate = useNavigate();
  const [expandedReviewIds, setExpandedReviewIds] = useState([]);
  const toggleViewMore = (id) => {
    setExpandedReviewIds((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
    );
  };

    return (
    <div className={styles['review-list']}>
        {reviews.map((review, index) => {
        const adjustedIndex = index + (currentPage - 1) * reviewPerPage;
        const isExpanded = expandedReviewIds.includes(review.id);
        const shouldTruncate = review.content.length > 500 && !isExpanded;
        const displayedContent = shouldTruncate
          ? review.content.slice(0, 300) + '...'
          : review.content;
        return (
            <div key={review.id} className={((index+1)%5==0)?styles['review-item-last'] : styles['review-item']}>

            <div className={styles['index-box']}>
                <p className={styles['index-box-p']}>{adjustedIndex + 1}</p>
            </div>

            <div className={styles['user-profile']} onClick={() => navigate(`/${review.userId}`)}>
                <img src={defaultProfile} alt="profile" />
            </div>

            <div className={styles['review-content']}>
                <div className={styles['user-id']} onClick={() => navigate(`/${review.userId}/reviews/detail/${review.id}`)}>
                    <div className={styles['user-id-p']}>{review.nickname}</div>
                </div>
                <div className={styles['rating']}>
                    <Rating rating={review.rating} />
                </div>
                <div className={styles['content']}>
                  <div className={styles['content-p']}>{displayedContent}</div>
                  {review.content.length > 300 && (
                    <div className={styles['readmore-container']}>
                      <ReadMoreButton
                        isOpen={isExpanded}
                        handleReadMore={() => toggleViewMore(review.id)}
                      />
                    </div>
                  )}
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
  
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
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
      const response = await axios.get(`/api/books/reviews`, {
        params: { bookApiId, currentPage, isPopularity}, withCredentials: true
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
    if (user === null) {
      openModal(
        "You need to sign in to like reviews",
        "",
        "1",
        "confirm",
        () => {
          navigate('/sign-in', {
            state: { from: location.pathname },
            replace: true
          });
        },
        null
      );
      return;
    }
  
    try {
      const updatedReviews = reviews.map((review) => {
        if (review.id === reviewId) {
          const isLiked = !review.isLiked;
          const likeCount = isLiked ? review.likeCount + 1 : review.likeCount - 1;
  
          axios.post(
            `/api/books/reviews/like`,
            { reviewId, isLiked },
            { withCredentials: true }
          ).catch((err) => console.error("Like update error:", err));
  
          return { ...review, isLiked, likeCount };
        }
        return review;
      });
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error updating like status: ", error);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (user === null) {
      openModal(
        "You need to sign in to add a review",
        "",
        "1",
        "confirm",
        () => {
          navigate('/sign-in', {
            state: { from: location.pathname }, 
            replace: true
          });
        },
        null
      );
    } else {
      setIsAddingReview(true);    
    }
  };

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
                Popular
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
            <p className={styles.reviewstext}>No Reviews yet</p>
          )}

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
      )}
    </div>
  );
}

export default Reviews;
