import React from "react";

const ReviewEntry = ({ review }) => {
  console.log("리뷰 데이터 확인:", review);
  const date = new Date(review.creationDate);
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  const thumbnailSrc = review.thumbnail || "/images/covernotavailable.png";

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <img key={i} src="/icons/star.svg" alt="별점" width={16} />
    ));
  };

  return (
    <div className="review-entry">
      <div className="review-date">
        <div className="month">{month}</div>
        <div className="day">{day}</div>
        <div className="year">{year}</div>
      </div>

      <img
        className="thumbnail"
        src={thumbnailSrc}
        alt="표지 이미지"
        width={100}
        height={140}
      />

      <div className="review-info">
        <p className="book-title">{review.title}</p>
        <div className="rating">{renderStars(review.rating)}</div>
        <div className="icons">
          <img
            src={
              review.liked
                ? "/icons/heart_filled.svg"
                : "/icons/heart_outline.svg"
            }
            alt={review.liked ? "좋아요 O" : "좋아요 X"}
            width={20}
          />

          {review.content && (
            <img src="/icons/review.svg" alt="리뷰 O" width={20} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewEntry;
