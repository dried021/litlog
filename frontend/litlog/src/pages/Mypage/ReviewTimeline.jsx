import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewEntry from "./ReviewEntry";
import ReviewHeader from "../../components/Mypage/ReviewHeader";
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

  const [activeTab, setActiveTab] = useState("timeline");
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);

  const [years, setYears] = useState([]);

  useEffect(() => {
    setLoading(true);
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
        setError("Failed to load reviews.");
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, [userId, year]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/members/${userId}/join-year`)
      .then((res) => {
        const joinYear = res.data; 
        const yearList = [];
        for (let y = currentYear; y >= joinYear; y--) {
          yearList.push(y);
        }
        setYears(yearList);
      })
      .catch(() => {
        setYears([currentYear]);
      });
  }, [userId]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    if (newYear) {
      navigate(`/${userId}/reviews/${newYear}`);
    } else {
      navigate(`/${userId}/reviews`);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleLiked = () => {
    setShowLikedOnly((prev) => !prev);
  };

  const handleRatingChange = (e) => {
    setRatingFilter(parseInt(e.target.value));
  };

  const handleResetFilters = () => {
    setShowLikedOnly(false);
    setRatingFilter(0);
  };

  const filteredReviews = reviews.filter((review) => {
    const meetsRating = ratingFilter === 0 || review.rating === ratingFilter;
    const meetsLiked = !showLikedOnly || review.liked === true;
    return meetsRating && meetsLiked;
  });

  return (
    <div className="review-timeline">
      <TabMenu userId={userId} />

      <ReviewHeader
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
        years={years}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showLikedOnly={showLikedOnly}
        onToggleLiked={handleToggleLiked}
        ratingFilter={ratingFilter}
        onRatingChange={handleRatingChange}
        onResetFilters={handleResetFilters}
        message={
          filteredReviews.length === 0
            ? "No reviews found."
            : `${filteredReviews[0].nickname}, you left reviews for ${filteredReviews.length} books during ${
                selectedYear || "all years"
              }.`
        }
      />

      <div className="review-table">
        <div className="table-header">
          <div>MONTH</div>
          <div>DAY</div>
          <div className="book-header">BOOK</div>
          <div className="rating-header">RATING</div>
          <div>LIKE</div>
          <div>REVIEW</div>
        </div>

        {filteredReviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Share your first review!</p>
        ) : (
          filteredReviews.map((review, idx) => {
            const prev = filteredReviews[idx - 1];
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
