import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import styles from './ManageReview.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SortOptionButton from './SortOptionButton';
import DeleteReviewButton from '../Button/DeleteReviewButton';

function ManageReview() {
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('pageNum')) || 1);
  const [pageCount, setPageCount] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('searchKeyword') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('searchKeyword') || '');
  const [totalCount, setTotalCount] = useState(0);
  const [sortOption, setSortOption] = useState(1);

  const navigate = useNavigate();
  const reviewPerPage = 10;

  useEffect(() => {
    fetchReviews(currentPage, sortOption);
  }, [currentPage, searchKeyword, sortOption]);

  const fetchReviews = async (page, sortOption) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:9090/admin/review`, {
        params: { pageNum: page, searchKeyword, sortOption },
      });
      setReviews(response.data.comments || []);
      setPageCount(response.data.pageCount || 1);
      setTotalCount(response.data.totalCount || 0);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    navigate(`/admin/reviews?pageNum=${pageNum}&searchKeyword=${encodeURIComponent(searchKeyword)}`);
  };


  return (
    <div className={styles.reviewSection}>
      <SearchBar 
        className={styles.adminSearchBar}
        handleSearch={(searchKeyword)=>{
            const trimmed = searchKeyword.trim();
            if(!trimmed){
              setSearchKeyword(trimmed);
              setCurrentPage(1);
              navigate(`/admin/reviews`);
            }else{
              setSearchKeyword(trimmed);
              setCurrentPage(1);
              navigate(`/admin/reviews?pageNum=1&searchKeyword=${encodeURIComponent(trimmed)}`);
            }
        }} 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)} 
        placeholder="Search reviews..."
          />

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          {reviews.length > 0 ? (
            <>
            <div className={styles['option-container']}>
                <div className={styles['leftContainer']}>
                  {searchKeyword ? (
                    <p className={styles.searchResultP}>
                      Search results for <span className={styles.bold}>"{searchKeyword}"</span>. A total of {totalCount} reviews were found.
                    </p>
                  ) : (
                    <p className={styles.searchResultP}>
                      Total:  {totalCount} reviews
                    </p>
                  )}
                
                </div>

                <div className={styles['rightContainer']}>
                    <SortOptionButton onSortChange={(option) => {setSortOption(option); setCurrentPage(1)}}/>
                </div>
            </div>



              <div className={styles.reviewList}>
                {reviews.map((review, index) => {
                  const displayIndex = index + (currentPage - 1) * reviewPerPage;
                  return (
                    <div key={`${review.id}-${displayIndex}`} className={styles.reviewItem}>
                      <div className={styles.reviewRank}>
                        <p className={styles.reviewRankP}>{displayIndex + 1}</p>
                      </div>
                      <div className={styles.reviewInfo} onClick={() => navigate(`/books/${review.bookApiId}`)}>
                        <h3 className={styles.reviewId}>
                          {review.title} <span className={styles.reviewIdGray}>({review.bookApiId} | {review.authors})</span>
                        </h3>

                        <div className={styles.reviewInfo2}>
                            <p>{review.userId} | {review.nickname} | {review.creationDate?.substring(0, 10)}</p>
                        </div>
                        <div className={styles.content}>
                            <p>{review.rating}</p>
                        </div>
                        <div className={styles.content}>
                            <p>{review.content}</p>
                        </div>

                      </div>
                      <div className={styles.reviewButton}>
                        <DeleteReviewButton
                            collectionId={review.collectionId}
                            onDelete={(collectionId) => {
                                setreviews(prev => prev.filter(c => c.collectionId !== collectionId));
                                }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className={styles.noData}>No reviews found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default ManageReview;
