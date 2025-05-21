import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ className = "", handleSearch, value, onChange, placeholder = "Search..." }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchBarForm} ${className || ''}`} >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
