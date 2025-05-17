import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './WeeklyPopularReviews.module.css';
import { useNavigate } from 'react-router-dom';
import defaultThumbnail from '../../assets/default_thumbnail.png';

const WeeklyPopularReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9090/books/popularReviewList', {
      params: { currentPage: 1 }
    })
      .then(res => setReviews(res.data.slice(0, 3))) // 상위 3개만 표시
      .catch(err => console.error('Fail to fetch popular reviews:', err));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Popular Reviews This Week</h3>
        <button className={styles.moreBtn} onClick={() => navigate('/books')}>
          More →
        </button>
      </div>
      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.reviewItem}>
          <img
            src={review.thumbnail ?? defaultThumbnail}
            alt={review.title}
            className={styles.thumbnail}
            onClick={() => navigate(`/books/${review.bookApiId}`)}
          />
          <div className={styles.info}>
            <div className={styles.title} onClick={() => navigate(`/books/${review.bookApiId}`)}>{review.title}</div>
            <div className={styles.meta}>
              <span className={styles.user}>{review.userId}</span>
              <span className={styles.date}> | {formatDate(review.creationDate)}</span>
            </div>
            <div className={styles.rating}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <div className={styles.content}>
              {review.content}
            </div>
            <div className={styles.likes}>
              ❤️ {review.likeCount}
            </div>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyPopularReviews;
