import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ReviewDetail.module.css'; 
import TabMenu from "../../components/Mypage/TabMenu";

const ReviewDetail = () => {
  const { userId, reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const formatPublishedDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toISOString().slice(0, 10); // yyyy-MM-dd
  };

  if (!review) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <TabMenu userId={userId} />
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to={`/books/${review.bookApiId}`}>
            <img className={styles.thumbnail} src={review.thumbnail || '/images/covernotavailable.png'} alt="책 표지"/>
          </Link>
        </div>

        <div className={styles.right}>
          <h2 className={styles.title}>
            <Link to={`/books/${review.bookApiId}`} className={styles.titleLink}>
              {review.title}
            </Link>
            <span className={styles.author}>{review.authors}</span>
          </h2>
          <div className={styles.meta}>
            {review.publisher} &nbsp;|&nbsp; {formatPublishedDate(review.publishedDate)} &nbsp;|&nbsp; {review.pageCount}pg
          </div>

          <div className={styles.header}>
            <span className={styles.stars}>{renderStars(review.rating)}</span>
            <span>Logged on {formatDate(review.creationDate)}</span>
          </div>

          <div className={styles.content}>
            {review.content}
          </div>

          <div className={styles.footerRow}>
            <div className={styles.likes}>
              <img src="/icons/heart_filled.svg" alt="좋아요" />
              <span>{review.likeCount ?? 0} Likes</span>
            </div>

            <div className={styles.actions}>
              <div className={styles.tooltipContainer}>
                <img src="/icons/edit.svg" alt="Edit" className={styles.iconButton1} />
                <div className={styles.tooltipText}>Edit</div>
              </div>
              <div className={styles.tooltipContainer}>
                <img src="/icons/delete.svg" alt="Delete" className={styles.iconButton2} />
                <div className={styles.tooltipText}>Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
