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
          src="/icons/star.svg"
          alt="별"
        />
      ))}
      {Array.from({ length: 5 - rating }, (_, index) => (
        <img 
          className={styles['star']}
          key={`empty-${index}`}
          src="/icons/star_gray.svg"
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
    const fetchMultiplePages = async () => {
      let all = [];
      let page = 1;
      while (all.length < 6) {
        try {
          const res = await axios.get('http://localhost:9090/books/popularReviewList', {
            params: { currentPage: page }
          });
          const data = res.data || [];
          if (data.length === 0) break; 
          all = all.concat(data);
          page += 1;
        } catch (err) {
          console.error('Failed to fetch popular reviews:', err);
          break;
        }
      }
      setReviews(all.slice(0, 6)); 
    };

    fetchMultiplePages();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncate = (text, maxLength = 20) => {
    if (typeof text !== 'string') return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["review-section"]}>
        <div className={styles["review-header"]}>
          <div className={styles["header"]}>
            <p>Popular Reviews This Week</p>  
          </div>
          <button
            className={styles["moreBtn"]}
            onClick={() => navigate('/books')}
          >
            more
          </button>
        </div>
        <div className={styles["review-grid"]}>
          {reviews.map((review) => (
            <div key={review.id} className={styles["review-item"]}>
              {/* 상단: 썸네일 + 정보 */}
              <div className={styles["top-section"]}>
                <div className={styles["book-thumbnail"]} onClick={() => navigate(`/books/${review.bookApiId}`)}>
                  <img
                    src={review.thumbnail ?? '/images/covernotavailable.png'}
                    alt={review.title}
                  />
                </div>
                <div className={styles["info-section"]}>
                  <div className={styles["title-author"]} onClick={() => navigate(`/books/${review.bookApiId}`)}>
                    <p className={styles["book-title"]}>{truncate(review.title, 20)}</p>
                    <p className={styles["author"]}>{review.authors}</p>
                  </div>

                  <div className={styles["rating"]}>
                    <Rating rating={review.rating} />
                  </div>

                  <div className={styles["user-meta"]} onClick={() => navigate(`/${review.userId}`)}>
                    <span className={styles["nickname"]}>{review.nickname}</span>
                    <span className={styles["dot"]}>•</span>
                    <span className={styles["creation-date"]}>{formatDate(review.creationDate)}</span>
                  </div>
                </div>
              </div>

              {/* 중간: 리뷰 본문 */}
              <div className={styles["content"]}>
                <p>{truncate(review.content, 120)}</p>
              </div>

              {/* 하단: 좋아요 */}
              <div className={styles["review-like"]}>
                <img src="/icons/heart_filled.svg" alt="like" />
                <p className={styles["review-like-count"]}>{review.likeCount}</p>Likes
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyPopularReviews;
