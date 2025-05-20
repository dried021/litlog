import React, { useState, useEffect, useRef } from "react";
import styles from "./CollectionHeader.module.css";

const CollectionHeader = ({
  activeTab = "created",
  onTabChange,
  sortOption,
  onSortChange,
  onResetFilters,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const getSortLabel = (field, direction) => {
    if (field === "date") {
      return direction === "desc" ? "Newest First" : "Oldest First";
    } else if (field === "like") {
      return direction === "desc" ? "Most Liked" : "Least Liked";
    } else if (field === "comment") {
      return direction === "desc" ? "Most Commented" : "Least Commented";
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
        <button
          className={`${styles.tabButton} ${styles.mainTab} ${activeTab === "created" ? styles.active : ""}`}
          onClick={() => onTabChange("created")}
        >
          CREATED
        </button>
        <button
          className={`${styles.tabButton} ${styles.mainTab} ${activeTab === "liked" ? styles.active : ""}`}
          onClick={() => onTabChange("liked")}
        >
          LIKED
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filterGroup} ref={dropdownRef}>
        {/* Sort */}
        <div className={styles.dropdownWrapper}>
          <span
            className={`${styles.tabButton} ${styles.filterTab} ${openDropdown === "sort" ? styles.active : ""}`}
            onClick={() => toggleDropdown("sort")}
          >
            Sort by {getSortLabel(sortOption.field, sortOption.direction)} ▾
          </span>
          {openDropdown === "sort" && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>CREATED DATE</div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "date", direction: "desc" })}>
                  Newest First
                </div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "date", direction: "asc" })}>
                  Oldest First
                </div>
              </div>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>POPULARITY</div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "like", direction: "desc" })}>
                  Most Liked
                </div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "like", direction: "asc" })}>
                  Least Liked
                </div>
              </div>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>COMMENTS</div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "comment", direction: "desc" })}>
                  Most Commented
                </div>
                <div className={styles.dropdownItem} onClick={() => onSortChange({ field: "comment", direction: "asc" })}>
                  Least Commented
                </div>
              </div>
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

export default CollectionHeader;
