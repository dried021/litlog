import React, { useState, useEffect } from 'react';
import styles from './WeeklyPopularReviews.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Rating({ rating }) {
  return (
    <div>
      {Array.from({ length: rating }, (_, index) => (
        <img 
          className={styles['star']}
          key={`full-${index}`}
          src="/icons/star2.svg"
          alt="별"
        />
      ))}
      {Array.from({ length: 5 - rating }, (_, index) => (
        <img 
          className={styles['star']}
          key={`empty-${index}`}
          src="/icons/emptyStar.svg"
          alt="빈별"
        />
      ))}
    </div>
  );
}

const WeeklyPopularReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9090/books/popularReviewList', {
      params: { currentPage: 1 }
    })
      .then(res => setReviews((res.data || []).slice(0, 3)))
      .catch(err => console.error('Fail to fetch popular reviews:', err));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncate = (text, maxLength = 20) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <div className={styles["container"]}>
      <div className={styles["review-section"]}>
        <div className={styles["review-header"]}>
          <h3 className="bookslider-title">Popular Reviews This Week</h3>
          <button
            className={styles["moreBtn"]}
            onClick={() => navigate('/books')}
            style={{ background: 'none', border: 'none', color: 'teal', cursor: 'pointer', fontWeight: 'bold' }}
          >
            More →
          </button>
        </div>

        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={styles["review-item"]}
          >
            <div className={styles["book-thumbnail"]} onClick={() => navigate(`/books/${review.bookApiId}`)}>
              <img
                src={review.thumbnail ?? '/images/covernotavailable.png'}
                alt={review.title}
              />
            </div>

            <div className={styles["review-content"]}>
              <div className={styles["book-title"]} onClick={() => navigate(`/books/${review.bookApiId}`)}>
                <div className={styles["book-title-p"]}>
                  {truncate(review.title, 10)}
                </div>
                <div className={styles["author"]}>{review.authors}</div>
              </div>

              <div className={styles["user-id"]} onClick={() => navigate(`/${review.userId}`)}>
                <div className={styles["user-id-p"]}>{review.nickname}</div>
                <div className={styles["separator"]}>|</div>
                <div className={styles["creation-date"]}>{formatDate(review.creationDate)}</div>
              </div>

              <div className={styles["rating"]}>
                <Rating rating={review.rating} />
              </div>

              <div className={styles["content"]}>
                <div className={styles["content-p"]}>
                  {truncate(review.content, 20)}
                </div>
              </div>
            </div>

            <div className={styles["review-like"]}>
              <img src="/icons/heart_filled.svg" alt="like" />
              <p className={styles["review-like-count"]}>{review.likeCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPopularReviews;
