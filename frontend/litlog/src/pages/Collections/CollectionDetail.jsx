import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CollectionDetail.module.css';

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:9090/collections/${collectionId}`)
      .then(res => setCollection(res.data))
      .catch(err => console.error('불러오기 실패', err));
  }, [collectionId]);

  if (!collection) return <p>로딩 중...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{collection.title}</h2>
      <p className={styles.content}>{collection.content}</p>
      <p className={styles.author}>작성자: {collection.nickname}</p>

      <div className={styles.bookGrid}>
        {collection.books.map(book => (
          <div 
            key={book.id} 
            className={styles.bookCard}
            onClick={() => navigate(`/books/${book.bookApiId}`)}
          >
            <img src={book.thumbnail} alt={book.title} className={styles.thumbnail} />
            <div className={styles.overlay}>
              {book.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetail;
