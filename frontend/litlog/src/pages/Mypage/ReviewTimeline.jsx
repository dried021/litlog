import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ReviewEntry from "./ReviewEntry";
import ReviewHeader from "../../components/Mypage/ReviewHeader";
import TabMenu from "../../components/Mypage/TabMenu";
import "./ReviewTimeline.css";

const ReviewTimeline = () => {
  const { userId, year } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(year || "");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("timeline");

  const [showLikedOnly, setShowLikedOnly] = useState(searchParams.get("liked") === "true");
  const [withContentOnly, setWithContentOnly] = useState(searchParams.get("withReview") === "true");
  const [ratingFilter, setRatingFilter] = useState(parseInt(searchParams.get("rating")) || 0);

  const [years, setYears] = useState([]);

  useEffect(() => {
    setSelectedYear(year || "");
  }, [year]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        year
          ? `http://localhost:9090/api/members/${userId}/reviews/review-timeline/${year}`
          : `http://localhost:9090/api/members/${userId}/reviews/review-timeline`
      )
      .then((res) => {
        console.log("✅ 리뷰 타임라인 데이터:", res.data);
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

  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === false || value === 0) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

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
    const updated = !showLikedOnly;
    setShowLikedOnly(updated);
    updateSearchParams({ liked: updated });
  };

  const handleToggleContent = () => {
    const updated = !withContentOnly;
    setWithContentOnly(updated);
    updateSearchParams({ withReview: updated });
  };

  const handleRatingChange = (e) => {
    const val = parseInt(e.target.value);
    const finalVal = isNaN(val) ? 0 : val;
    setRatingFilter(finalVal);
    updateSearchParams({ rating: finalVal });
  };

  const handleResetFilters = () => {
    setShowLikedOnly(false);
    setWithContentOnly(false);
    setRatingFilter(0);
    setSearchParams({});
    navigate(`/${userId}/reviews`, { replace: true });
  };

  const filteredReviews = reviews.filter((review) => {
    const content = review.content;
    const meetsRating = ratingFilter === 0 || review.rating === ratingFilter;
    const meetsLiked = !showLikedOnly || review.liked === true;
    const meetsContent =
      !withContentOnly || (typeof content === "string" && content.trim().length > 0);
    return meetsRating && meetsLiked && meetsContent;
  });

  return (
    <div className="review-timeline">
      <TabMenu userId={userId} />

      <ReviewHeader
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        years={years}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedRating={ratingFilter}
        onRatingChange={handleRatingChange}
        likedOnly={showLikedOnly}
        onToggleLiked={handleToggleLiked}
        withContentOnly={withContentOnly}
        onToggleContent={handleToggleContent}
        onResetFilters={handleResetFilters}
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
          <p className="no-reviews">No Reviews</p>
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
