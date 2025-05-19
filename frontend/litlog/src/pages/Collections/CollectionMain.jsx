import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CollectionMain.module.css';
import Pagination from '../../components/Pagination/Pagination';  

const CollectionMain = () => {
  const navigate = useNavigate();
  const [popularCollections, setPopularCollections] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1); 
  const pageSize = 12; 

  
  useEffect(() => {
    fetchPopularCollections();
  }, []);

  useEffect(() => {
    fetchAllCollections(sortBy, currentPage);
  }, [sortBy, currentPage]);

  const fetchPopularCollections = async () => {
    try {
      const res = await axios.get('http://localhost:9090/collections/popular');
      setPopularCollections(res.data.book_collections || []);
    } catch (err) {
      console.error('Failed to load popular collections.', err);
    }
  };

  const fetchAllCollections = async (sort, page = 1) => {
    try {
      const res = await axios.get(`http://localhost:9090/collections?sort=${sort}&page=${page}&size=${pageSize}`);
      setAllCollections(res.data.book_collections || []);
      setPageCount(res.data.totalPages || 1); 
    } catch (err) {
      console.error('Failed to load all collections.', err);
    }
  };

  const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };

  const CollectionCard = ({ col, navigate }) => {
    console.log('Collection content', col);
    return(
  <div key={col.id} className={styles.collectionCard}>
    <div className={styles.thumbnailStack} onClick={() => navigate(`/collections/${col.id}`)}>
      {(col.books || []).slice(0, 6).map((book, index) => (
        <img
          key={index}
          src={book.thumbnail}
          alt="book thumbnail"
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
);
};


  return (
    <div className={styles.collectionWrapper}>
      <div className={styles.collectionHeader}>
        <h2>Start your collection!<br />
          Gather your favorite books and<br />
          share your reading journey with the world.
        </h2>
        <button onClick={() => navigate('/collections/new')} className={styles.collectionCreateBtn}>
          + Create My Collection
        </button>
      </div>

      <section className={styles.popularSection}>
        <div className={styles.sectionHeader}>
          <h3>🔥 Popular This Week</h3>
          <span className={styles.moreBtn} onClick={() => navigate('/collections/list')}>MORE</span>
        </div>

        <div className={styles.collectionGrid}>  
          {popularCollections.slice(0, 3).map(col => (
            <CollectionCard key={col.id} col={col} navigate={navigate} />
          ))}
        </div>
      </section>


      <section className={styles.allSection}>
        <div className={styles.collectionSort}>
          <span
            className={sortBy === 'popular' ? styles.active : ''}
            onClick={() => {
              setSortBy('popular');
              setCurrentPage(1);
            }}
          >
            Popular
          </span>
          <span
            className={sortBy === 'recent' ? styles.active : ''}
            onClick={() => {
              setSortBy('recent');
              setCurrentPage(1);
            }}
          >
            Newest
          </span>
        </div>
        <div className={styles.collectionGrid}>
          {allCollections.map(col => (
            <CollectionCard key={col.id} col={col} navigate={navigate} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={(pageNum) => setCurrentPage(pageNum)}
        />
      </section>
    </div>
  );
};

export default CollectionMain;
