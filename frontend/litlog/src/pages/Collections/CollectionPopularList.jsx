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
      alert("Failed to load all collections.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPopularCollections(currentPage);
  }, [currentPage]);


  const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };

  return (
    <div className={styles.collectionWrapper}>
      <h2 className={styles.sectionTitle}>🔥 Popular This Week</h2>

      <div className={styles.collectionGrid}>
        {collections.map(col => (
          <div key={col.id} className={styles.collectionCard}>
            <div className={styles.thumbnailStack} onClick={() => navigate(`/collections/${col.id}`)}>
              {(col.books || []).slice(0, 6).map((book, index) => (
                <img
                  key={index}
                  src={book.thumbnail}
                  alt="book"
                  className={styles.thumbnailImage}
                  style={{ left: `${index * 40}px`, zIndex: 10 - index }}
                />
              ))}
            </div>
            <div className={styles.collectionBody}>
              <h4 className={styles.collectionTitle} onClick={() => navigate(`/collections/${col.id}`)}>{col.title}</h4>
              <p className={styles.collectionAuthor}>@{col.nickname}</p>
              <p className={styles.collectionDesc}>{col.content}</p>
              <p className={styles.collectionDate}>📅 {formatDate(col.creationDate)}</p>
              <div className={styles.collectionMeta}>
                <span>❤️ {col.likeCount}</span>
                <span>💬 {col.commentCount}</span>
              </div>
            </div>
          </div>
        ))}
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
