import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CollectionMain.module.css'; 
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const CollectionPopularList = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const pageSize = 12; 


  const fetchPopularCollections = async (page = 1) => {
    try {
      const res = await axios.get(`http://localhost:9090/collections/popular?page=${page}&size=${pageSize}`, {
        withCredentials: true,
      });
      setCollections(res.data.book_collections || []);
      setPageCount(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPopularCollections(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.collectionWrapper}>
      <h2 className={styles.sectionTitle}>
        <img 
          src= "/icons/hand-thumbs-up-fill.svg" 
          alt="Popular This Week" 
          style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '6px' }} 
        />
        Popular This Week</h2>

      <div className={styles.collectionGrid}>
        {collections.map(col => {
          const thumbnails = col.thumbnails ?? (col.books || []).map(book => book.thumbnail);
          const stack = [...thumbnails.slice(0, 5)];
          while (stack.length < 5) stack.push(null);

          const imageWidth = 90;
          const stackMaxWidth = 266;
          const overlapCount = 5;
          const overlapOffset = (imageWidth * overlapCount - stackMaxWidth) / (overlapCount - 1);

          return (
            <div key={col.id} className={styles.card} onClick={() => navigate(`/collections/${col.id}`)}>
              <div className={styles.thumbnailStack}>
                {stack.map((img, idx) =>
                  img ? (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumbnail-${idx}`}
                      className={styles.stackedImg}
                      style={{
                        left: `${idx * (imageWidth - overlapOffset)}px`,
                        zIndex: 10 - idx,
                      }}
                    />
                  ) : (
                    <div
                      key={idx}
                      className={styles.placeholderBox}
                      style={{
                        left: `${idx * (imageWidth - overlapOffset)}px`,
                        zIndex: 10 - idx,
                      }}
                    />
                  )
                )}
                <div className={styles.overlay}>
                  <p className={styles.overlayText}>
                    {col.content?.length > 100
                      ? col.content.slice(0, 100) + "..."
                      : col.content}
                  </p>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.topRow}>
                  <h3 className={styles.title}>{col.title}</h3>
                  <span className={styles.bookCount}>{col.bookCount ?? col.books?.length ?? 0} books</span>
                </div>
                <div className={styles.bottomRow}>
                  <span className={styles.author}>by {col.nickname}</span>
                  <span className={styles.meta}>
                    <img src="/icons/heart_gray.svg" alt="likes" className={styles.icon1} />
                    {col.likeCount ?? 0}
                    &nbsp;&nbsp;
                    <img src="/icons/comment_gray.svg" alt="comments" className={styles.icon2} />
                    {col.commentCount ?? 0}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CollectionPopularList;
