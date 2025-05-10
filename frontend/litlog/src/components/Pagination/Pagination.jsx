import React from 'react';
import './Pagination.css';

const Pagination = ({
  currentPage = 1,
  pageBlock = 5,
  pageCount = 1,
  onPageChange = () => {}
}) => {

  if (pageCount === 0) return null;

  // 계산 로직
  const startPage = Math.floor((currentPage - 1) / pageBlock) * pageBlock + 1;
  const endPage = Math.min(startPage + pageBlock - 1, pageCount);

  const handlePageChange = (pageNum) => {
    if (pageNum !== currentPage && pageNum > 0 && pageNum <= pageCount) {
      onPageChange(pageNum);
    }
  };

  return (
    <div className="pagination-container">
      {/* 왼쪽 화살표 */}
      {startPage > 1 && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(startPage - 1)}
        >
          <i className="bi bi-chevron-left pagination-chevron"></i>
        </button>
      )}

      {/* 페이지 버튼 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
        <button
          key={pageNum}
          className={`pagination-button ${pageNum === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {/* 오른쪽 화살표 */}
      {endPage < pageCount && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(endPage + 1)}
        >
          <i className="bi bi-chevron-right pagination-chevron"></i>
        </button>
      )}
    </div>
  );
};

export default Pagination;
