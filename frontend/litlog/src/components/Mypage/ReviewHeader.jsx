import React from "react";
import styles from "./ReviewHeader.module.css";

const ReviewHeader = ({
  activeTab = "timeline",
  onTabChange,
  selectedYear,
  onYearChange,
  selectedRating,
  onRatingChange,
  likedOnly,
  onToggleLiked,
  withContentOnly,
  onToggleContent,
  onResetFilters,
}) => {
  return (
    <div className={styles.headerWrapper}>
      {/* 왼쪽 탭 */}
      <div className={styles.tabGroup}>
        <button
          className={`${styles.tabButton} ${activeTab === "timeline" ? styles.active : ""}`}
          onClick={() => onTabChange("timeline")}
        >
          Timeline
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "reviews" ? styles.active : ""}`}
          onClick={() => onTabChange("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* 오른쪽 필터 */}
      <div className={styles.filterGroup}>
        {/* 연도 드롭다운 */}
        <select
          className={styles.dropdown}
          value={selectedYear}
          onChange={onYearChange}
        >
          <option value="">Any year</option>
          {/* 연도 항목은 추후 동적으로 추가 */}
        </select>

        {/* 평점 드롭다운 */}
        <select
          className={styles.dropdown}
          value={selectedRating}
          onChange={onRatingChange}
        >
          <option value="">Any rating</option>
          {/* 평점 항목도 추후 동적으로 추가 */}
        </select>

        {/* 좋아요 토글 */}
        <div className={styles.toggleWrapper}>
          <label className={styles.switchLabel}>
            <input type="checkbox" checked={likedOnly} onChange={onToggleLiked} />
            <span className={styles.switchCustom}></span>
          </label>
          <span className={styles.icon}>♥️</span>
        </div>

        {/* 리뷰 내용 있는 것만 토글 */}
        <div className={styles.toggleWrapper}>
          <label className={styles.switchLabel}>
            <input type="checkbox" checked={withContentOnly} onChange={onToggleContent} />
            <span className={styles.switchCustom}></span>
          </label>
          <span className={styles.icon}>✏️</span>
        </div>

        {/* 리셋 버튼 */}
        <button className={styles.resetButton} onClick={onResetFilters}>🔄</button>
      </div>
    </div>
  );
};

export default ReviewHeader;
