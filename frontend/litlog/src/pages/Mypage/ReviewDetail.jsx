import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReviewDetail.css';

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
    <div className="review-detail">
      <div className="review-left">
        <img
          className="book-thumbnail"
          src={review.thumbnail || '/images/covernotavailable.png'}
          alt="책 표지"
          width={120}
          height={180}
        />
      </div>

      <div className="review-right">
        <h2 className="book-title">
          {review.title} <span className="book-year">({formatPublishedYear(review.publishedDate)})</span>
        </h2>

        <div className="review-header">
          <span className="review-date">Logged on {formatDate(review.creationDate)}</span>
          <span className="rating-stars">{renderStars(review.rating)}</span>
        </div>

        <div className="review-content">
          {review.content}
        </div>

        <div className="review-like">
          <img
            src={review.isLiked ? '/icons/heart_filled.svg' : '/icons/heart_outline.svg'}
            alt="좋아요"
            width={18}
            height={18}
          />
          <span>{review.likeCount ?? 0} likes</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
