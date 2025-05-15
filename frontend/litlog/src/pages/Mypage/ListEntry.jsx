import React from "react";
import { Link } from "react-router-dom";
import styles from "./MyReviews.module.css";

const ListEntry = ({ review }) => {
  const date = new Date(review.creationDate);
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return isNaN(date) ? "" : date.toLocaleDateString("en-US", options);
  };

  const thumbnail = review.thumbnail || "/images/covernotavailable.png";
  const contentPreview =
    review.content && review.content.length > 500
      ? review.content.slice(0, 500) + "..."
      : review.content;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={i < rating ? "/icons/star.svg" : "/icons/star_gray.svg"}
        alt="별점"
        className={styles["star-icon"]}
      />
    ));
  };

  return (
    <div className={styles["list-entry"]}>
      <div className={styles["list-thumbnail"]}>
        <img src={thumbnail} alt="표지 이미지" />
      </div>

      <div className={styles["list-info"]}>
        <div className={styles["list-title"]}>
          <Link to={`/${review.userId}/reviews/detail/${review.id}`}>
            {review.title}
          </Link>
          <span className={styles["list-author"]}>{review.authors}</span>
        </div>

        <div className={styles["list-meta"]}>
          <span className={styles["list-rating"]}>
            {renderStars(review.rating)}
          </span>
          {review.isLiked && (
            <span className={styles["book-like-icon"]}>
              <img src="/icons/heart_filled.svg" alt="책 좋아요" />
            </span>
          )}
        </div>

        <div className={styles["list-content"]}>
          {review.content && review.content.trim() !== "" ? (
            <span>
              {contentPreview}
              {review.content.length > 500 && (
                <Link to={`/${review.userId}/reviews/detail/${review.id}`} className={styles["more-inline"]}>more</Link>
              )}
            </span>
          ) : (
            <span className={styles["no-content-placeholder"]}></span>
          )}
        </div>

        <div className={styles["list-like"]}>
          <img src="/icons/heart_gray.svg" alt="리뷰 좋아요" />
          <span>{review.likeCount} Likes</span>
          <span className={styles["list-date"]}>Logged on {formatDate(review.creationDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default ListEntry;
