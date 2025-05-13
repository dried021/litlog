import React from "react";
import { Link } from "react-router-dom";

const ReviewEntry = ({ review, showMonth }) => {
  const date = new Date(review.creationDate);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const thumbnail = review.thumbnail || "/images/covernotavailable.png";

  const getThumbnail = (thumbnail) => {
    if (!thumbnail) return "/images/covernotavailable.png";
    if (thumbnail.includes("zoom=")) {
      return thumbnail.replace(/zoom=\d+/, "zoom=3");
    } else if (thumbnail.includes("=s")) {
      return thumbnail.replace(/=s\d+/, "=s400");
    }
    return thumbnail;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={i < rating ? "/icons/star.svg" : "/icons/star_gray.svg"}
        alt="별점"
      />
    ));
  };

  return (
    <div className="review-entry">
      <div className="entry-month">
        {showMonth && (
          <div className="month-box">
            <div className="month-label">{month}</div>
            <div className="year-label">{year}</div>
          </div>
        )}
      </div>
      <div className="day-label">{day}</div>
      <div className="book-info">
        <img className="book-thumbnail" src={getThumbnail(review.thumbnail)} alt="표지 이미지"/>
        <Link to={`/books/${review.bookApiId}`} className="book-title">
          {review.title}
        </Link>
      </div>
      <div className="entry-rating">{renderStars(review.rating)}</div>
      <div className="entry-like">
        <img
          src={
            review.liked
              ? "/icons/heart_filled.svg"
              : "/icons/heart_outline.svg"
          }
          alt="좋아요"
        />
      </div>
      <div className="entry-review">
        {review.content && <img src="/icons/review.svg" alt="리뷰"/>}
      </div>
    </div>
  );
};

export default ReviewEntry;
