import React, { useState, useEffect } from 'react';
import styles from './ReviewList.module.css';
import axios from 'axios';
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from 'react-router-dom';

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

function Review({ reviews, currentPage, reviewPerPage}) {
    const navigate = useNavigate();
    
    const handleClickProfile = (userId) => {
      // 수정 Implement profile redirection logic
      console.log(userId);
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };
    

    return (
      <div className={styles['review-list']}>
          {reviews.map((review, index) => (
              <div key={review.id} className={((index+1)%5==0)?styles['review-item-last'] : styles['review-item']}>

              <div className={styles['index-box']}>
                  <p className={styles['index-box-p']}>{index + (currentPage - 1) * reviewPerPage + 1}</p>
              </div>

              <div className={styles['book-thumbnail']} onClick={()=> navigate("/books/"+review.bookApiId)}>
                <img src={review.thumbnail ?? '/images/covernotavailable.png'}/>
              </div>

              <div className={styles['review-content']}>
                <div className={styles['book-title']} onClick={()=> navigate("/books/"+review.bookApiId)}>
                  <div className={styles['book-title-p']}>{review.title}</div>
                  <div className={styles['author']}>{review.authors}</div>
                </div>

                <div className={styles['user-id']} onClick={() => handleClickProfile(review.userId)}>
                  <div className={styles['user-id-p']}>{review.userId}</div>
                  {review.creationDate ? <div className={styles['separator']}>|</div> : null}
                  <div className={styles['creation-date']}>{formatDate(review.creationDate)}</div>
                </div>

                <div className={styles['rating']}>
                    <Rating rating={review.rating} />
                </div>

                <div className={styles['content']}>
                    <div className={styles['content-p']}>{review.content}</div>
                </div>
              </div>

              <div className={styles['review-like']}>
                  <img src="/icons/heart_filled.svg" alt="Liked" />
                  <p className={styles['review-like-count']}>{review.likeCount}</p>
              </div>
              </div>
          ))}
      </div>
    );
}

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewPerPage = 5;

  const title = "Popular Reviews This Week";

  useEffect(() => {

      setLoading(true);
      getReviews(currentPage);

  }, [currentPage]);

  const getReviews = async ( currentPage) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/popularReviewList`, {
        params: {currentPage},
      });
      const reviews = response.data;
      setReviews(reviews || []);
    } catch (error) {
      console.error("Fail to fetch reviews:", error);
      setReviews([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <>
      <div className={styles["review-section"]}>
        <h3 className="bookslider-title">{title}</h3>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            {reviews.length > 0 ? (
              <>
                <Review
                  reviews={reviews}
                  currentPage={currentPage}
                  reviewPerPage={reviewPerPage}
                />
                <Pagination
                  currentPage={currentPage}
                  pageCount={Math.ceil(20 / reviewPerPage)}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <p className="no-reviews">No Reviews</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ReviewList;
