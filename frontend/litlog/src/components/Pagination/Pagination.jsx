import React from 'react';

const Pagination = ({ currentPage, startPage, endPage, pageBlock, pageCount, count, onPageChange }) => {
  if (count === 0) return null;

  const handlePageChange = (pageNum) => {
    if (pageNum !== currentPage) {
      onPageChange(pageNum);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-3 mt-1">
      {startPage > pageBlock && (
        <button className="btn btn-sm" onClick={() => handlePageChange(startPage - 1)}>
          <i className="bi bi-chevron-left"></i>
        </button>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) =>
        pageNum === currentPage ? (
          <span key={pageNum} className="badge bg-primary" style={{ fontSize: '1rem' }}>
            {pageNum}
          </span>
        ) : (
          <button
            key={pageNum}
            className="btn btn-sm text-decoration-none"
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        )
      )}

      {pageCount > endPage && (
        <button className="btn btn-sm" onClick={() => handlePageChange(startPage + pageBlock)}>
          <i className="bi bi-chevron-right"></i>
        </button>
      )}
    </div>
  );
};

export default Pagination;