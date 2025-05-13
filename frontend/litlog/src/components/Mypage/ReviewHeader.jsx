import React, { useState, useEffect, useRef } from "react";
import styles from "./ReviewHeader.module.css";
import { FormControlLabel, Switch } from "@mui/material";
import Rating from '@mui/material/Rating';

const ReviewHeader = ({
  activeTab = "timeline",
  onTabChange,
  selectedYear,
  onYearChange,
  years = [],
  selectedRating, 
  onRatingChange,
  likedOnly,
  onToggleLiked,
  withContentOnly,
  onToggleContent,
  onResetFilters,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

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
      {/* Tabs */}
      <div className={styles.tabGroup}>
        <button
          className={`${styles.tabButton} ${styles.mainTab} ${activeTab === "timeline" ? styles.active : ""}`}
          onClick={() => onTabChange("timeline")}>Timeline
        </button>
        <button
          className={`${styles.tabButton} ${styles.mainTab} ${activeTab === "reviews" ? styles.active : ""}`}
          onClick={() => onTabChange("reviews")}>Reviews
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filterGroup} ref={dropdownRef}>
        {/* Year */}
        <div className={styles.dropdownWrapper}>
          <span
            className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "year" ? styles.active : ""}`}
            onClick={() => toggleDropdown("year")}
          > 
            {selectedYear || "Year"} ▾
          </span>
          {openDropdown === "year" && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => onYearChange({ target: { value: "" } })}>
                Any year
              </div>
              <div className={styles.scrollArea}>
                {years.map((year) => (
                  <div key={year} className={styles.dropdownItem} onClick={() => onYearChange({ target: { value: year } })}>
                    {year}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className={styles.dropdownWrapper}>
          <span
            className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "rating" ? styles.active : ""}`}
            onClick={() => toggleDropdown("rating")}
          >
            {selectedRating ? `${selectedRating}★` : "Rating"} ▾
          </span>
          {openDropdown === "rating" && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => onRatingChange({ target: { value: "" } })}>
                Any rating
              </div>
              <div className={styles.dropdownItem}>
                <div className={styles.ratingRow}>
                  <Rating name="interactive-rating" value={Number(selectedRating) || 0}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        onRatingChange({ target: { value: newValue } });
                      }
                    }} precision={1} size="small"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter */}
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
                control={<Switch checked={likedOnly} onChange={onToggleLiked} size="small" sx={{ ml: 1 }} />}
                label={<span className={styles.filterLabel}>Liked Only</span>}
              />
              {onToggleContent && (
                <FormControlLabel
                  control={<Switch checked={withContentOnly} onChange={onToggleContent} size="small" sx={{ ml: 1 }} />}
                  label={<span className={styles.filterLabel}>With Review</span>}
                />
              )}
            </div>
          )}
        </div>

        {/* Reset */}
        <span className={styles.tabButton} onClick={onResetFilters}>
          <img src="/icons/refresh.svg" alt="Reset" className={styles.refreshIcon} />
        </span>
      </div>
    </div>
  );
};

export default ReviewHeader;
