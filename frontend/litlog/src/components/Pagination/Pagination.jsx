import React from 'react';
import './Pagination.css';

const Pagination = ({
    currentPage = 1,
    startPage = 1,  
    endPage = 5,
    pageBlock = 5,
    pageCount = 100,
    count = 0,
    onPageChange = () => {}
  }) => {
    
  if (count == 0) return null;

  const handlePageChange = (pageNum) => {
    if (pageNum !== currentPage) {
      onPageChange(pageNum);
    }
  };

  return (
    <div className="pagination-container">
      {startPage > pageBlock && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(startPage - 1)}
        >
          <i className="bi bi-chevron-left pagination-chevron"></i>
        </button>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
        <button
          key={pageNum}
          className={`pagination-button ${pageNum === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {pageCount > endPage && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(startPage + pageBlock)}
        >
          <i className="bi bi-chevron-right pagination-chevron"></i>
        </button>
      )}
    </div>
  );
};

export default Pagination;
