import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from './MyReviews.module.css';
import "../../components/Mypage/tooltip.css";

const TimelineEntry = ({ review, showMonth }) => {
  const date = new Date(review.creationDate);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const thumbnail = review.thumbnail || "/LitLog/images/covernotavailable.png";

  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img key={i} src={i < rating ? "/LitLog/icons/star.svg" : "/LitLog/icons/star_gray.svg"} alt="별점"/>
    ));
  };

  return (
    <div className={styles["review-entry"]}>
      <div className={styles["entry-month"]}>
        {showMonth && (
          <div className={styles["month-box"]}>
            <div className={styles["month-label"]}>{month}</div>
            <div className={styles["year-label"]}>{year}</div>
          </div>
        )}
      </div>
      <div className={styles["day-label"]}>{day}</div>
      <div className={styles["book-info"]}>
        <img className={styles["book-thumbnail"]} src={thumbnail} alt="표지 이미지"/>
        <Link to={`/${review.userId}/reviews/detail/${review.id}`} className={styles["book-title"]}>
          {review.title}
        </Link>
      </div>
      <div className={styles["entry-rating"]}>{renderStars(review.rating)}</div>
      <div className={styles["entry-like"]}>
        <img
          src={
            review.liked
              ? "/LitLog/icons/heart_filled.svg"
              : "/LitLog/icons/heart_outline.svg"
          }
          alt="좋아요"
        />
      </div>
      <div className={styles["entry-review"]}>
        {review.content && (
          <div
            className="tooltip-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/${review.userId}/reviews/detail/${review.id}`}>
              <img src="/LitLog/icons/review.svg" alt="리뷰" />
            </Link>
            <div
              className="tooltip-text"
              style={{
                opacity: showTooltip ? 1 : 0,
                visibility: showTooltip ? "visible" : "hidden",
              }}
            >
              Read the review
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineEntry;
