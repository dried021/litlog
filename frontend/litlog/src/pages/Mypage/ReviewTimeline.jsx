import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TimelineEntry from "./TimelineEntry";
import ReviewHeader from "../../components/Mypage/ReviewHeader";
import TabMenu from "../../components/Mypage/TabMenu";
import styles from './MyReviews.module.css';
import "../../components/Mypage/tooltip.css";

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

  const [totalTimelineBooks, setTotalTimelineBooks] = useState(0);
  const [totalWrittenReviews, setTotalWrittenReviews] = useState(0);

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

  useEffect(() => {
    axios.get(`http://localhost:9090/api/members/${userId}/review-counts`)
      .then(res => {
        setTotalTimelineBooks(res.data.totalTimelineBooks);
        setTotalWrittenReviews(res.data.totalWrittenReviews);
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
      navigate(`/${userId}/reviews/timeline/${newYear}`);
    } else {
      navigate(`/${userId}/reviews/timeline`);
    }
  };

  const handleTabChange = (tab) => {
    if (tab === "timeline") {
      navigate(`/${userId}/reviews/timeline`);
    } else {
      navigate(`/${userId}/reviews/list`);
    }
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
    navigate(`/${userId}/reviews/timeline`, { replace: true });
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
    <div className={styles["review-timeline"]}>
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
        totalTimelineBooks={totalTimelineBooks}
        totalWrittenReviews={totalWrittenReviews}
      />

      <div className={styles["review-table"]}>
        <div className={styles["table-header"]}>
          <div>MONTH</div>
          <div>DAY</div>
          <div className={styles["book-header"]}>BOOK</div>
          <div className={styles["rating-header"]}>RATING</div>
          <div>LIKE</div>
          <div>REVIEW</div>
        </div>

        {filteredReviews.length === 0 ? (
          <p className={styles["no-reviews"]}>No Reviews</p>
        ) : (
          filteredReviews.map((review, idx) => {
            const prev = filteredReviews[idx - 1];
            const prevMonth = prev && new Date(prev.creationDate).getMonth();
            const currMonth = new Date(review.creationDate).getMonth();
            const showMonth = !prev || prevMonth !== currMonth;

            return (
              <TimelineEntry
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
