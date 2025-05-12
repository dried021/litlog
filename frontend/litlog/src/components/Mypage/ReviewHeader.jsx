import React from "react";
import styles from "./ReviewHeader.module.css";

const ReviewHeader = ({
  selectedYear,
  handleYearChange,
  years = [],
  activeTab = "timeline",
  onTabChange,
  onToggleLiked,
  showLikedOnly,
  ratingFilter,
  onRatingChange,
  onResetFilters,
  message
}) => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.topRow}>
        <div className={styles.tabGroup}>
          <button className={`${styles.tabButton} ${activeTab === "timeline" ? styles.active : ""}`} 
          onClick={() => onTabChange("timeline")}>Timeline</button>
          <button className={`${styles.tabButton} ${activeTab === "reviews" ? styles.active : ""}`}
            onClick={() => onTabChange("reviews")}>Reviews</button>
        </div>

        <div className={styles.controlGroup}>
          <select value={selectedYear} onChange={handleYearChange} className={styles.yearSelect}>
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

            <div className={styles.ratingFilter}>
            <label htmlFor="ratingRange">★</label>
            <input id="ratingRange" type="range" min="1" max="5" value={ratingFilter} onChange={onRatingChange}/>
            <span>{ratingFilter}</span>
            </div>

            <label className={styles.switch}>
            <input type="checkbox" checked={showLikedOnly} onChange={onToggleLiked} />
            <span className={styles.slider}></span>
            </label>
            
            <button className={styles.resetButton} onClick={onResetFilters}>Reset</button>
        </div>
      </div>

      {message && <div className={styles.messageBox}>{message}</div>}
    </div>
  );
};

export default ReviewHeader; 
