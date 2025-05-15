import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ListEntry from "./ListEntry";
import ReviewHeader from "../../components/Mypage/ReviewHeader";
import TabMenu from "../../components/Mypage/TabMenu";
import styles from "./MyReviews.module.css";

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
  const [sortOption, setSortOption] = useState("latest");

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
          ? `http://localhost:9090/api/members/${userId}/reviews/review-list/${year}`
          : `http://localhost:9090/api/members/${userId}/reviews/review-list`
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
      .then((res) => {
        setTotalTimelineBooks(res.data.totalTimelineBooks);
        setTotalWrittenReviews(res.data.totalWrittenReviews);
      });
  }, [userId]);

  useEffect(() => {
    let filtered = reviews.filter((review) => {
      const matchesYear = !selectedYear || new Date(review.creationDate).getFullYear().toString() === selectedYear;
      const matchesRating = selectedRating === 0 || review.rating === selectedRating;
      const matchesLiked = !likedOnly || review.liked === true;
      const matchesContent = !withContentOnly || (typeof review.content === "string" && review.content.trim().length > 0);

      return matchesYear && matchesRating && matchesLiked && matchesContent;
    });

    if (sortOption === "likes") {
      filtered.sort((a, b) => b.likeCount - a.likeCount);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    }

    setFilteredReviews(filtered);
  }, [reviews, selectedYear, selectedRating, likedOnly, withContentOnly, sortOption]);

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

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    if (newYear) {
      navigate(`/${userId}/reviews/list/${newYear}`);
    } else {
      navigate(`/${userId}/reviews/list`);
    }
  };

  const handleRatingChange = (e) => {
    const val = parseInt(e.target.value);
    const finalVal = isNaN(val) ? 0 : val;
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
    setSearchParams({});
    navigate(`/${userId}/reviews/list`, { replace: true });
    setSortOption("latest");
  };

  return (
    <div className={styles["review-list"]}>
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
          filteredReviews.map((review) => (
            <ListEntry key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
