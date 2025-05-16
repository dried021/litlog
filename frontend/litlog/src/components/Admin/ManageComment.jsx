import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import styles from './ManageComment.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SortOptionButton from './SortOptionButton';
import DeleteCollectionButton from '../Button/DeleteCollectionButton';
import DeleteCommentButton from '../Button/DeleteCommentButton';

function ManageComment() {
  const [searchParams] = useSearchParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('pageNum')) || 1);
  const [pageCount, setPageCount] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('searchKeyword') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('searchKeyword') || '');
  const [totalCount, setTotalCount] = useState(0);
  const [sortOption, setSortOption] = useState(1);
  // -> 1이 관련성 2가 regdate 내림차 3이 오름차

  const navigate = useNavigate();
  const commentPerPage = 10;

  useEffect(() => {
    fetchComments(currentPage, sortOption);
  }, [currentPage, searchKeyword, sortOption]);

  const fetchComments = async (page, sortOption) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:9090/admin/comment`, {
        params: { pageNum: page, searchKeyword, sortOption },
      });
      setComments(response.data.comments || []);
      setPageCount(response.data.pageCount || 1);
      setTotalCount(response.data.totalCount || 0);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    navigate(`/admin/comments?pageNum=${pageNum}&searchKeyword=${encodeURIComponent(searchKeyword)}`);
  };


  return (
    <div className={styles.commentSection}>
      <SearchBar 
        className={styles.adminSearchBar}
        handleSearch={(searchKeyword)=>{
            const trimmed = searchKeyword.trim();
            if (trimmed) {
              setSearchKeyword(trimmed);
              setCurrentPage(1);
              navigate(`/admin/comments?pageNum=1&searchKeyword=${encodeURIComponent(trimmed)}`);
            }
        }} 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)} 
        placeholder="Search Comments..."
          />

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          {comments.length > 0 ? (
            <>
            <div className={styles['option-container']}>
                <div className={styles['leftContainer']}>
                  {searchKeyword ? (
                    <p className={styles.searchResultP}>
                      Search results for <span className={styles.bold}>"{searchKeyword}"</span>. A total of {totalCount} comments were found.
                    </p>
                  ) : (
                    <p className={styles.searchResultP}>
                      Total:  {totalCount} comments
                    </p>
                  )}
                
                </div>

                <div className={styles['rightContainer']}>
                    <SortOptionButton onSortChange={(option) => {setSortOption(option); setCurrentPage(1)}}/>
                </div>
            </div>



              <div className={styles.commentList}>
                {comments.map((comment, index) => {
                  const displayIndex = index + (currentPage - 1) * commentPerPage;
                  return (
                    <div key={`${comment.id}-${displayIndex}`} className={styles.commentItem}>
                      <div className={styles.commentRank}>
                        <p className={styles.commentRankP}>{displayIndex + 1}</p>
                      </div>
                      <div className={styles.commentInfo} onClick={() => navigate(`/collections/${comment.collectionId}`)}>
                        <h3 className={styles.commentId}>
                          {comment.collectionTitle} <span className={styles.commentIdGray}>({comment.collectionAuthor} | {comment.creationDate?.substring(0, 10)})</span>
                        </h3>

                        <div className={styles.commentInfo2}>
                            <p>{comment.nickname} | {comment.userId} | {comment.creationDate?.substring(0, 10)}</p>
                        </div>
                        <div className={styles.content}>
                            <p>{comment.content}</p>
                        </div>

                      </div>
                      <div className={styles.commentButton}>
                        <DeleteCollectionButton
                            collectionId={comment.collectionId}
                            onDelete={(collectionId) => {
                                setComments(prev => prev.filter(c => c.collectionId !== collectionId));
                                }}/>
                        <DeleteCommentButton
                            commentId={comment.id}
                            onDelete={(id) => {
                                setComments(prev => prev.filter(c => c.id !== id));
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
            <p className={styles.noData}>No comments found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default ManageComment;
