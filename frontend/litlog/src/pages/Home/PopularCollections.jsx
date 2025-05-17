import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PopularCollections.module.css'; // 새로운 요약형 스타일
import { useNavigate } from 'react-router-dom';

const PopularCollections = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9090/collections/popular', { withCredentials: true })
      .then(res => setCollections(res.data.slice(0, 3)))  // 상위 3개만 표시
      .catch(err => {
        console.error("컬렉션을 불러오는 데 실패했습니다.", err);
        setCollections([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>All-Time Popular Collections</h3>
        <button className={styles.moreBtn} onClick={() => navigate('/collections/list')}>
          More →
        </button>
      </div>
      <div className={styles.collectionList}>
        {collections.map((col) => (
          <div key={col.id} className={styles.card}>
            <div className={styles.thumbnailStack} onClick={() => navigate(`/collections/${col.id}`)}>
              {(col.books || []).slice(0, 4).map((book, index) => (
                <img
                  key={index}
                  src={book.thumbnail}
                  alt="book"
                  className={styles.thumbnail}
                  style={{ left: `${index * 20}px`, zIndex: 10 - index }}
                />
              ))}
            </div>
            <div className={styles.info}>
              <div className={styles.title} onClick={() => navigate(`/collections/${col.id}`)}>
                {col.title}
              </div>
              <div className={styles.meta}>
                <span>@{col.nickname}</span>
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
