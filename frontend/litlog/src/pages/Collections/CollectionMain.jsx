import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CollectionMain.module.css';

const CollectionMain = () => {
  const navigate = useNavigate();
  const [popularCollections, setPopularCollections] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  
  useEffect(() => {
    fetchPopularCollections();
    fetchAllCollections(sortBy);
  }, [sortBy]);

  const fetchPopularCollections = async () => {
    try {
      const res = await axios.get('http://localhost:9090/collections/popular');
      setPopularCollections(res.data || []);
    } catch (err) {
      console.error('인기 컬렉션 불러오기 실패', err);
    }
  };

  const fetchAllCollections = async (sort) => {
    try {
      const res = await axios.get(`http://localhost:9090/collections?sort=${sort}`);
      setAllCollections(res.data.book_collections || []);
    } catch (err) {
      console.error('전체 컬렉션 불러오기 실패', err);
    }
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

        <div className={styles.popularGrid}>  
          {popularCollections.slice(0, 3).map(col => {
            console.log(col.books); // ← 여기에 찍으면 book 배열 확인 가능

            return (
              <div key={col.id} className={styles.collectionCard}>
                <div className={styles.thumbnailStack}>
                  {(col.books || []).slice(0, 5).map((book, index) => (
                    <img
                      key={index}
                      src={book.thumbnail}
                      alt="book thumbnail"
                      className={styles.thumbnailImage}
                      style={{ left: `${index * 20}px`, zIndex: 10 - index }}
                    />
                  ))}
                </div>

              <div className={styles.collectionBody}>
                <h4 className={styles.collectionTitle}>{col.title}</h4>
                <p className={styles.collectionAuthor}>@{col.nickname}</p>
                <p className={styles.collectionDesc}>{col.content}</p>
                <div className={styles.collectionMeta}>
                  <span>❤️ {col.likeCount}</span>
                  <span>💬 {col.commentCount}</span>
                </div>
              </div>
            </div>
          )})}
        </div>
      </section>


      <section className={styles.allSection}>
        <div className={styles.collectionSort}>
          <span
            className={sortBy === 'popular' ? styles.active : ''}
            onClick={() => setSortBy('popular')}
          >
            인기순
          </span>
          <span
            className={sortBy === 'recent' ? styles.active : ''}
            onClick={() => setSortBy('recent')}
          >
            최신순
          </span>
        </div>

        <div className={styles.collectionGrid}>
          {allCollections.map(col => {
            console.log(col.books); // ← 여기도 확인용

            return (
              <div key={col.id} className={styles.collectionCard}>
                <div className={styles.thumbnailStack}>
                  {(col.books || []).slice(0, 5).map((book, index) => (
                    <img
                      key={index}
                      src={book.thumbnail}
                      alt="book thumbnail"
                      className={styles.thumbnailImage}
                      style={{ left: `${index * 20}px`, zIndex: 10 - index }}
                    />
                  ))}
                </div>

              <div className={styles.collectionBody}>
                <h4 className={styles.collectionTitle}>{col.title}</h4>
                <p className={styles.collectionAuthor}>@{col.nickname}</p>
                <p className={styles.collectionDesc}>{col.content}</p>
                <div className={styles.collectionMeta}>
                  <span>❤️ {col.likeCount}</span>
                  <span>💬 {col.commentCount}</span>
                </div>
              </div>
            </div>
          )})}
        </div>
      </section>
    </div>
  );
};

export default CollectionMain;
