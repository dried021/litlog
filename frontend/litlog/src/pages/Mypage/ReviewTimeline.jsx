import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewEntry from "../../pages/Mypage/ReviewEntry";
import TabMenu from "../../components/Mypage/TabMenu";
import './ReviewTimeline.css';

const ReviewTimeline = () => {
  const { userId, year } = useParams();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(year || currentYear);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 연도 목록 (최근 10년)
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  useEffect(() => {
    setSelectedYear(year || currentYear); // URL로 변경되었을 때 동기화
    setLoading(true);
    axios
      .get(
        `http://localhost:9090/api/members/${userId}/reviews/review-timeline/${year}`
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
    navigate(`/${userId}/reviews/${newYear}`);
  };

  return (
    <div className="review-timeline">
      <TabMenu userId={userId} />

      <div className="timeline-header">
        <h2>{selectedYear}년 리뷰 타임라인</h2>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : reviews.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => <ReviewEntry key={review.id} review={review} />)
      )}
    </div>
  );
};

export default ReviewTimeline;
