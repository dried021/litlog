import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CollectionMain.module.css'; // 기존 스타일 그대로 사용
import { useNavigate } from 'react-router-dom';
const CollectionPopularList = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9090/collections/popular', { withCredentials: true })
      .then(res => setCollections(res.data))
      .catch(err => {
        alert("컬렉션을 불러오는 데 실패했습니다.");
        console.error(err);
      });
  }, []);

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
              <div className={styles.collectionMeta}>
                <span>❤️ {col.likeCount}</span>
                <span>💬 {col.commentCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CollectionPopularList;
