import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PopularCollections.module.css';
import { useNavigate } from 'react-router-dom';

const PopularCollections = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9090/collections?sort=popular', { withCredentials: true }) // ✅ 전체 인기순으로 변경
      .then(res => setCollections((res.data.book_collections || []).slice(0, 3)))
      .catch(err => {
        console.error("전체 인기 컬렉션 불러오기 실패", err);
        setCollections([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>🔥 All-Time Popular Collections</h3>
        <button className={styles.moreBtn} onClick={() => navigate('/collections/list?sort=popular')}>
          More →
        </button>
      </div>
      <div className={styles.collectionList}>
        {collections.map((col) => (
          <div key={col.id} className={styles.card} onClick={() => navigate(`/collections/${col.id}`)}>
            <div className={styles.thumbnailStack}>
              {(col.books || []).slice(0, 4).map((book, i) => (
                <img
                  key={i}
                  src={book.thumbnail}
                  alt="book"
                  className={styles.thumbnail}
                  style={{ left: `${i * 20}px`, zIndex: 10 - i }}
                />
              ))}
            </div>
            <div className={styles.info}>
              <div className={styles.title}>{col.title}</div>
              <div className={styles.meta}>
                <span>by {col.nickname}</span>
                <span className={styles.likes}>❤️ {col.likeCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCollections;
