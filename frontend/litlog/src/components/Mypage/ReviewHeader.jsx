import React, { useState, useEffect, useRef } from "react";
import styles from "./ReviewHeader.module.css";
import "./tooltip.css";
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
  totalTimelineBooks,
  totalWrittenReviews,
  sortOption,
  onSortChange,
}) => {
  const [showTimelineTooltip, setShowTimelineTooltip] = useState(false);
  const [showReviewTooltip, setShowReviewTooltip] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const formatNumber = (num) => {
    return num?.toLocaleString?.() ?? "0";
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleMouseEnter = (setFn) => {
    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setFn(true), 400);
    };
  };

  const handleMouseLeave = (setFn) => {
    return () => {
      clearTimeout(timeoutRef.current);
      setFn(false);
    };
  };

  const getSortLabel = (field, direction) => {
    if (field === "date") {
      return direction === "desc" ? "Newest First" : "Oldest First";
    } else if (field === "popularity") {
      return direction === "desc" ? "Most Liked" : "Least Liked";
    } else if (field === "rating") {
      return direction === "desc" ? "Highest Rated" : "Lowest Rated";
    }
    return "Sort";
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
        <div
          className="tooltip-container header-tooltip"
          onMouseEnter={handleMouseEnter(setShowTimelineTooltip)}
          onMouseLeave={handleMouseLeave(setShowTimelineTooltip)}
        >
          <button
            className={`${styles.tabButton} ${styles.mainTab} ${activeTab === "timeline" ? styles.active : ""}`}
            onClick={() => onTabChange("timeline")}
          >
            TIMELINE
          </button>
          <div className="tooltip-text"
            style={{
              opacity: showTimelineTooltip ? 1 : 0,
              visibility: showTimelineTooltip ? "visible" : "hidden",
            }}
          > {formatNumber(totalTimelineBooks)} books
          </div>
        </div>

        <div
          className="tooltip-container header-tooltip"
          onMouseEnter={handleMouseEnter(setShowReviewTooltip)}
          onMouseLeave={handleMouseLeave(setShowReviewTooltip)}
        >
          <button
            className={`${styles.tabButton} ${styles.mainTab} ${activeTab === "list" ? styles.active : ""}`}
            onClick={() => onTabChange("list")}
          >
            LIST
          </button>
          <div className="tooltip-text"
            style={{
              opacity: showReviewTooltip ? 1 : 0,
              visibility: showReviewTooltip ? "visible" : "hidden",
            }}
          > {formatNumber(totalWrittenReviews)} reviews
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterGroup} ref={dropdownRef}>
        {/* Year */}
        <div className={styles.dropdownWrapper}>
          <span className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "year" ? styles.active : ""}`} onClick={() => toggleDropdown("year")}>
            {selectedYear || "Year"} ▾
          </span>
          {openDropdown === "year" && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => onYearChange("")}>
                Any year
              </div>
              <div className={styles.scrollArea}>
                {years.map((year) => {
                  const isSelected = selectedYear === String(year);
                  return (
                    <div
                      key={year}
                      className={`${styles.dropdownItem} ${isSelected ? styles.disabled : ""}`}
                      onClick={() => {
                        if (!isSelected) onYearChange(String(year));
                      }}
                    >
                      {year}
                    </div>
                  );
                })}
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
              <div className={styles.dropdownItem} onClick={() => onRatingChange(0)}>
                Any rating
              </div>
              <div className={styles.dropdownItem}>
                <div className={styles.ratingRow}>
                  <Rating name="interactive-rating" value={Number(selectedRating) || 0}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        onRatingChange(newValue);
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
        
        {/* Sort */}
        <div className={styles.dropdownWrapper}>
          <span className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "sort" ? styles.active : ""}`} onClick={() => toggleDropdown("sort")}>
            Sort by {getSortLabel(sortOption.field, sortOption.direction)} ▾
          </span>
          {openDropdown === "sort" && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>LOGGED DATE</div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "date", direction: "desc" })}>
                  Newest First
                </div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "date", direction: "asc" })}>
                  Oldest First
                </div>
              </div>

              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>POPULARITY</div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "popularity", direction: "desc" })}>
                  Most Liked
                </div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "popularity", direction: "asc" })}>
                  Least Liked
                </div>
              </div>

              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>YOUR RATING</div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "rating", direction: "desc" })}>
                  Highest First
                </div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "rating", direction: "asc" })}>
                  Lowest First
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reset */}
        <span className={styles.tabButton} onClick={onResetFilters}>
          <img src="/LitLog/icons/refresh.svg" alt="Reset" className={styles.refreshIcon} />
        </span>
      </div>
    </div>
  );
};

export default ReviewHeader;