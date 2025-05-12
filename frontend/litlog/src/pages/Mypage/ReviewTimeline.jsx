import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewEntry from "./ReviewEntry";
import TabMenu from "../../components/Mypage/TabMenu";
import "./ReviewTimeline.css";

const ReviewTimeline = () => {
  const { userId, year } = useParams();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(year || "");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  useEffect(() => {
    setSelectedYear(year || "");
    setLoading(true);
    axios
      axios
      .get(
        year
          ? `http://localhost:9090/api/members/${userId}/reviews/review-timeline/${year}`
          : `http://localhost:9090/api/members/${userId}/reviews/review-timeline`
      )
      .then((res) => {
        setReviews(res.data);
        setError(null);
      })
      .catch(() => {
        setError("불러오기 실패");
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, [userId, year]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    if (newYear) {
      navigate(`/${userId}/reviews/${newYear}`);
    } else {
      navigate(`/${userId}/reviews`);
    }
  };

  return (
    <div className="review-timeline">
      <TabMenu userId={userId} />

      <div className="timeline-header">
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">전체</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {reviews.length > 0 && (
          <p className="summary-text">
            {reviews[0].nickname}, you left reviews for {reviews.length} books during {selectedYear}.
            <br/>
            Keep sharing your thoughts — we love hearing them!
          </p>
        )}
      </div>

      <div className="review-table">
        <div className="table-header">
          <div>MONTH</div>
          <div>DAY</div>
          <div className="book-header">BOOK</div>
          <div className="rating-header">RATING</div>
          <div>LIKE</div>
          <div>REVIEW</div>
        </div>
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Share your first review!</p>
        ) : (
          reviews.map((review, idx) => {
            const prev = reviews[idx - 1];
            const prevMonth = prev && new Date(prev.creationDate).getMonth();
            const currMonth = new Date(review.creationDate).getMonth();
            const showMonth = !prev || prevMonth !== currMonth;

            return (
              <ReviewEntry
                key={review.id}
                review={review}
                showMonth={showMonth}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReviewTimeline;
