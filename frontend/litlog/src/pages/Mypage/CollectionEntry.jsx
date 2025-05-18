import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyCollections.module.css";

const CollectionEntry = ({ collection }) => {
  const navigate = useNavigate();
  const thumbnails = collection.thumbnails ?? [];
  const stack = [...thumbnails.slice(0, 5)];
  while (stack.length < 5) {
    stack.push(null);
  }

  const { imageWidth, overlapOffset } = useMemo(() => {
    const imageWidth = 90;
    const stackMaxWidth = 266;
    const overlapCount = 5;
    const overlapOffset = (imageWidth * overlapCount - stackMaxWidth) / (overlapCount - 1);
    return { imageWidth, overlapOffset };
  }, []);

  const handleClick = () => {
    navigate(`/collections/${collection.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: "pointer" }}>
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
      </div>

      <div className={styles.info}>
        <div className={styles.topRow}>
          <h3 className={styles.title}>{collection.title}</h3>
          <span className={styles.bookCount}>{collection.bookCount} books</span>
        </div>
        <div className={styles.bottomRow}>
          <span className={styles.author}>by {collection.nickname}</span>
          <span className={styles.meta}>
            <img src="/icons/heart_gray.svg" alt="likes" className={styles.icon1}/>
            {collection.likeCount ?? 0}
            &nbsp;&nbsp;
            <img src="/icons/comment_gray.svg" alt="comments" className={styles.icon2}/>
            {collection.commentCount ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionEntry;
