import React, { useState, useEffect, useRef } from "react";
import styles from "./ReviewHeader.module.css";
import { FormControlLabel, Switch } from "@mui/material";

const ReviewHeader = ({
  activeTab = "timeline",
  onTabChange,
  selectedYear,
  onYearChange,
  years = [],
  selectedRating,
  onRatingChange,
  ratingOptions = [1, 2, 3, 4, 5],
  likedOnly,
  onToggleLiked,
  withContentOnly,
  onToggleContent,
  onResetFilters,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // "year", "rating", "filter"
  const dropdownRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => setOpenDropdown(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* 오른쪽 필터 드롭다운 그룹 */}
      <div className={styles.filterGroup} ref={dropdownRef}>
        {/* Year Dropdown */}
        <div className={styles.dropdownWrapper}>
          <span
            className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "year" ? styles.active : ""}`}
            onClick={() => toggleDropdown("year")}
          >
            {selectedYear ? selectedYear : "Year"} ▾
          </span>
          {openDropdown === "year" && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => onYearChange({ target: { value: "" } })}>Any year</div>
              {years.map((year) => (
                <div
                  key={year}
                  className={styles.dropdownItem}
                  onClick={() => onYearChange({ target: { value: year } })}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rating Dropdown */}
        <div className={styles.dropdownWrapper}>
          <span
            className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "rating" ? styles.active : ""}`}
            onClick={() => toggleDropdown("rating")}
          >
            {selectedRating ? `${selectedRating}★` : "Rating"} ▾
          </span>
          {openDropdown === "rating" && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => onRatingChange({ target: { value: "" } })}>Any rating</div>
              {ratingOptions.map((rating) => (
                <div
                  key={rating}
                  className={styles.dropdownItem}
                  onClick={() => onRatingChange({ target: { value: rating } })}
                >
                  {rating}★
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Dropdown (Switches) */}
        <div className={styles.dropdownWrapper}>
          <span
            className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "filter" ? styles.active : ""}`}
            onClick={() => toggleDropdown("filter")}
          >
            Filter ▾
          </span>
          {openDropdown === "filter" && (
            <div className={styles.dropdownMenu}>
              <FormControlLabel
                control={<Switch checked={likedOnly} onChange={onToggleLiked} size="small" sx={{ ml: 1 }}/>}
                label={<span className={styles.filterLabel}>Liked Only</span>}
              />
              <FormControlLabel
                control={<Switch checked={withContentOnly} onChange={onToggleContent} size="small" sx={{ ml: 1 }}/>}
                label={<span className={styles.filterLabel}>With Review</span>}
              />
            </div>
          )}
        </div>


        {/* Reset */}
        <span className={styles.tabButton} onClick={onResetFilters}>
          <img src="/icons/refresh.svg" alt="Reset" className={styles.refreshIcon}/>
        </span>
      </div>
    </div>
  );
};

export default ReviewHeader;