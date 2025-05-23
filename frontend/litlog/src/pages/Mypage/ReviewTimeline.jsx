import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TimelineEntry from "./TimelineEntry";
import ReviewHeader from "../../components/Mypage/ReviewHeader";
import TabMenu from "../../components/Mypage/TabMenu";
import styles from './MyReviews.module.css';
import "../../components/Mypage/tooltip.css";
import Pagination from "../../components/Pagination/Pagination";
import ProfileSummary from '../../components/Profile/ProfileSummary';

const ReviewTimeline = () => {
  const { userId, year } = useParams();
  const [selectedYear, setSelectedYear] = useState(year || "");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [years, setYears] = useState([]);
  const currentYear = new Date().getFullYear();
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("timeline");

  const [selectedRating, setSelectedRating] = useState(parseInt(searchParams.get("rating")) || 0);
  const [likedOnly, setLikedOnly] = useState(searchParams.get("liked") === "true");
  const [withContentOnly, setWithContentOnly] = useState(searchParams.get("withReview") === "true");

  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortOption, setSortOption] = useState({
    field: "date",     
    direction: "desc", 
  });
    
  const [totalTimelineBooks, setTotalTimelineBooks] = useState(0);
  const [totalWrittenReviews, setTotalWrittenReviews] = useState(0);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 20;
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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

  useEffect(() => {
    const { field, direction } = sortOption;
    let filtered = reviews.filter((review) => {
      const matchesYear = !selectedYear || new Date(review.creationDate).getFullYear().toString() === selectedYear;
      const matchesRating = selectedRating === 0 || review.rating === selectedRating;
      const matchesLiked = !likedOnly || review.liked === true;
      const matchesContent = !withContentOnly || (typeof review.content === "string" && review.content.trim().length > 0);

      return matchesYear && matchesRating && matchesLiked && matchesContent;
    });

    filtered.sort((a, b) => {
      if (field === "date") {
        return direction === "desc"
          ? new Date(b.creationDate) - new Date(a.creationDate)
          : new Date(a.creationDate) - new Date(b.creationDate);
      } else if (field === "popularity") {
        return direction === "desc" ? b.likeCount - a.likeCount : a.likeCount - b.likeCount;
      } else if (field === "rating") {
        return direction === "desc" ? b.rating - a.rating : a.rating - b.rating;
      }
      return 0;
    });

    setFilteredReviews(filtered);
  }, [reviews, selectedYear, selectedRating, likedOnly, withContentOnly, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, selectedRating, likedOnly, withContentOnly, sortOption]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/${userId}/reviews/${tab}`);
  };

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

  const handleYearChange = (value) => {
    setSelectedYear(value);
    if (value) {
      navigate(`/${userId}/reviews/timeline/${value}`);
    } else {
      navigate(`/${userId}/reviews/timeline`);
    }
  };

  const handleRatingChange = (value) => {
    const finalVal = isNaN(value) ? 0 : value;
    setSelectedRating(finalVal);
    updateSearchParams({ rating: finalVal });
  };

  const handleToggleLiked = () => {
    const updated = !likedOnly
    setLikedOnly(updated);
    updateSearchParams({ liked: updated });
  };

  const handleToggleContent = () => {
    const updated = !withContentOnly;
    setWithContentOnly(updated);
    updateSearchParams({ withReview: updated });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleResetFilters = () => {
    setSelectedYear("");
    setSelectedRating(0);
    setLikedOnly(false);
    setWithContentOnly(false);
    setSortOption({ field: "date", direction: "desc" });
    setSearchParams({});
    navigate(`/${userId}/reviews/timeline`, { replace: true });
  };

  return (
    <div className={styles["review-timeline"]}>
      <ProfileSummary/>
      <TabMenu userId={userId} />

      <ReviewHeader
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        years={years}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedRating={selectedRating}
        onRatingChange={handleRatingChange}
        likedOnly={likedOnly}
        onToggleLiked={handleToggleLiked}
        withContentOnly={withContentOnly}
        onToggleContent={handleToggleContent}
        onResetFilters={handleResetFilters}
        totalTimelineBooks={totalTimelineBooks}
        totalWrittenReviews={totalWrittenReviews}
        sortOption={sortOption}
        onSortChange={handleSortChange}
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
          paginatedReviews.map((review, idx) => {
            const prev = paginatedReviews[idx - 1];
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
      <Pagination
        currentPage={currentPage}
        pageCount={Math.ceil(filteredReviews.length / reviewsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ReviewTimeline;
