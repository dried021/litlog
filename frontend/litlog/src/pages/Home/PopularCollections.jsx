import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PopularCollections.module.css';
import { useNavigate } from 'react-router-dom';
  import defaultProfile from '../../assets/default_profile.png';

const PopularCollections = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9090/collections?sort=popular', { withCredentials: true }) 
      .then(res => setCollections((res.data.book_collections || []).slice(0, 3)))
      .catch(err => {
        console.error("Failed to load all popular collections.", err);
        setCollections([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          <img 
            src="/icons/hand-thumbs-up-fill.svg" 
            alt="Popular This Week" 
            style={{ width: '25px', height: '25px', verticalAlign: 'middle', marginRight: '8px' }} 
          /> 
          All-Time Popular Collections
        </h3>
        <button className={styles.moreBtn} onClick={() => navigate('/collections')}>
          More →
        </button>
      </div>
      <div className={styles.collectionList}>
        {collections.map((col) => {
          const thumbnails = (col.books || []).map(book => book.thumbnail);
          const stack = thumbnails.slice(0, 5);

          // 부족한 수만큼 null 추가
          while (stack.length < 5) {
            stack.push(null);
          }

          const imageWidth = 90;
          const stackMaxWidth = 266;
          const overlapCount = 5;
          const overlapOffset = (imageWidth * overlapCount - stackMaxWidth) / (overlapCount - 1);

          const likeDisplay = col.likeCount || 0;

          return (
            <div key={col.id} className={styles.card}>
              <div className={styles.thumbnailStack} onClick={() => navigate(`/collections/${col.id}`)}>
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
              </div>

              <div className={styles.info}>
                <h3 className={styles.title} onClick={() => navigate(`/collections/${col.id}`)}>
                  {col.title}
                </h3>
                <p className={styles.description}>
                  {col.content?.length > 80 ? col.content.slice(0, 80) + '...' : col.content}
                </p>
                <div className={styles.bottomRow}>
                  <span className={styles.author} onClick={() => navigate(`/${col.userId}`)}>
                    <img
                      src={
                        col.profileImage
                          ? (col.profileImage.startsWith('http')
                              ? col.profileImage
                              : `http://localhost:9090${col.profileImage}`)
                          : defaultProfile
                      }
                      alt="profile"
                      className={styles.profileIcon}
                    />{col.nickname}
                  </span>
                  <span className={styles.meta}>
                    <img src="/icons/heart_gray.svg" alt="likes" className={styles.icon1} />
                    {likeDisplay}
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
    </div>
  );
};

export default PopularCollections;
