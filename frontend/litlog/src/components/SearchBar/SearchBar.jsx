import React from 'react';
import './SearchBar.css';

const SearchBar = ({ handleSearch, value, onChange, placeholder = "Search..." }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedKeyword = value.trim();
    if (formattedKeyword) {
      handleSearch(formattedKeyword);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-form">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
