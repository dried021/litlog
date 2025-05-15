import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ListEntry from "./ListEntry";
import ReviewHeader from "../../components/Mypage/ReviewHeader";
import TabMenu from "../../components/Mypage/TabMenu";
import styles from "./MyReviews.module.css";

const ReviewList = () => {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [likedOnly, setLikedOnly] = useState(false);
  const [withContentOnly, setWithContentOnly] = useState(false);
  const [sortOption, setSortOption] = useState("latest");

  const [totalTimelineBooks, setTotalTimelineBooks] = useState(0);
  const [totalWrittenReviews, setTotalWrittenReviews] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9090/api/members/${userId}/reviews/review-list`)
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch(() => {
        setReviews([]);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/members/${userId}/join-year`)
      .then((res) => {
        const joinYear = res.data;
        const currentYear = new Date().getFullYear();
        const yearList = [];
        for (let y = currentYear; y >= joinYear; y--) {
          yearList.push(y);
        }
        setYears(yearList);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/members/${userId}/review-counts`)
      .then((res) => {
        setTotalTimelineBooks(res.data.totalTimelineBooks);
        setTotalWrittenReviews(res.data.totalWrittenReviews);
      });
  }, [userId]);

  useEffect(() => {
    let filtered = [...reviews];

    if (selectedYear) {
      filtered = filtered.filter(
        (r) => new Date(r.creationDate).getFullYear().toString() === selectedYear
      );
    }
    if (selectedRating) {
      filtered = filtered.filter((r) => r.rating === selectedRating);
    }
    if (likedOnly) {
      filtered = filtered.filter((r) => r.liked === true);
    }
    if (withContentOnly) {
      filtered = filtered.filter(
        (r) => r.content && r.content.trim() !== ""
      );
    }

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
    if (tab === "reviews") {
      navigate(`/${userId}/reviews/list`); 
    } else {
      navigate(`/${userId}/reviews/${tab}`);
    }
  };

  const handleResetFilters = () => {
    setSelectedYear("");
    setSelectedRating(0);
    setLikedOnly(false);
    setWithContentOnly(false);
    setSortOption("latest");
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleRatingChange = (e) => {
    const val = parseInt(e.target.value);
    setSelectedRating(isNaN(val) ? 0 : val);
  };

  const handleToggleLiked = () => {
    setLikedOnly((prev) => !prev);
  };

  const handleToggleContent = () => {
    setWithContentOnly((prev) => !prev);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <div className={styles["review-timeline"]}>
      <TabMenu userId={userId} />

      <ReviewHeader
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        years={years}
        activeTab="reviews"
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

      <div className={styles["review-list"]}>
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
