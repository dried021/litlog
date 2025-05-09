import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewEntry from "../../pages/Mypage/ReviewEntry";
import TabMenu from "../../components/Mypage/TabMenu";
import './ReviewTimeline.css';

const ReviewTimeline = () => {
  const { userId, year } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:9090/api/members/${userId}/reviews/review-timeline/${year}`
      )
      .then((res) => {
        setReviews(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("불러오기 실패");
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, [userId, year]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="review-timeline">
      <TabMenu userId={userId} />
      <h2>{year}년 리뷰 타임라인</h2>
      {reviews.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => <ReviewEntry key={review.id} review={review} />)
      )}
    </div>
  );
};

export default ReviewTimeline;
