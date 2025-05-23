import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ListEntry from "./ListEntry";
import ReviewHeader from "../../components/Mypage/ReviewHeader";
import TabMenu from "../../components/Mypage/TabMenu";
import styles from "./MyReviews.module.css";
import Pagination from "../../components/Pagination/Pagination";
import ProfileSummary from '../../components/Profile/ProfileSummary';

const ReviewList = () => {
  const { userId, year } = useParams();
  const [selectedYear, setSelectedYear] = useState(year || "");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [years, setYears] = useState([]);
  const currentYear = new Date().getFullYear();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("list");

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
          ? `/LitLog/api/members/${userId}/reviews/review-list/${year}`
          : `/LitLog/api/members/${userId}/reviews/review-list`
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
      .get(`/LitLog/api/members/${userId}/join-year`)
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
    axios.get(`/LitLog/api/members/${userId}/review-counts`)
      .then((res) => {
        setTotalTimelineBooks(res.data.totalTimelineBooks);
        setTotalWrittenReviews(res.data.totalWrittenReviews);
      });
  }, [userId]);

  useEffect(() => {
    const { field, direction } = sortOption;
    let filtered = reviews.filter((review) => {
      const matchesYear = !selectedYear || new Date(review.creationDate).getFullYear().toString() === selectedYear;
      const matchesRating = selectedRating === 0 || review.rating === selectedRating;
      const matchesLiked = !likedOnly || review.isLiked === true;
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
      navigate(`/${userId}/reviews/list/${value}`);
    } else {
      navigate(`/${userId}/reviews/list`);
    }
  };

  const handleRatingChange = (value) => {
    const finalVal = isNaN(value) ? 0 : value;
    setSelectedRating(finalVal);
    updateSearchParams({ rating: finalVal });
  };

  const handleToggleLiked = () => {
    const updated = !likedOnly;
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
    navigate(`/${userId}/reviews/list`, { replace: true });
  };

  return (
    <div className={styles["review-list"]}>
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

      <div className={styles["review-item"]}>
        {filteredReviews.length === 0 ? (
          <p className={styles["no-reviews"]}>No Reviews</p>
        ) : (
          paginatedReviews.map((review) => (
            <ListEntry key={review.id} review={review} />
          ))
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

export default ReviewList;
