import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ReviewDetail.module.css'; 
import TabMenu from "../../components/Mypage/TabMenu";

const ReviewDetail = () => {
  const { userId, reviewId } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:9090/api/members/${userId}/reviews/${reviewId}`);
        setReview(res.data);
      } catch (err) {
        console.error('Fail to load', err);
      }
    };

    fetchReviewDetail();
  }, [userId, reviewId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={i < rating ? '/icons/star.svg' : '/icons/star_gray.svg'}
        alt="별점"
        width={18}
        height={18}
      />
    ));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', options);
  };

  const formatPublishedYear = (dateStr) => {
    if (!dateStr) return '출판년도';
    const date = new Date(dateStr);
    return isNaN(date) ? '출판년도' : date.getFullYear();
  };

  if (!review) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <TabMenu userId={userId} />
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            className={styles.thumbnail}
            src={review.thumbnail || '/images/covernotavailable.png'}
            alt="책 표지"
          />
        </div>

        <div className={styles.right}>
          <h2 className={styles.title}>
            {review.title}
            <span className={styles.year}> ({formatPublishedYear(review.publishedDate)})</span>
          </h2>

          <div className={styles.header}>
            <span>Logged on {formatDate(review.creationDate)}</span>
            <span className={styles.stars}>{renderStars(review.rating)}</span>
          </div>

          <div className={styles.content}>
            {review.content}
          </div>

          <div className={styles.like}>
            <img
              src={review.isLiked ? '/icons/heart_filled.svg' : '/icons/heart_outline.svg'}
              alt="좋아요"
            />
            <span>{review.likeCount ?? 0} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
