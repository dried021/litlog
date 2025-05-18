import React, { useMemo } from "react";
import styles from "./MyCollections.module.css";

const CollectionEntry = ({ collection }) => {
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

  return (
    <div className={styles.card}>
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
        <h3 className={styles.title}>{collection.title}</h3>
        <p className={styles.meta}>by {collection.nickname}</p>
        <p className={styles.meta}>{collection.bookCount} books</p>
        <p className={styles.meta}>
          <img src="/icons/heart_gray.svg" alt="likes" className={styles.icon1}/>
          {collection.likeCount ?? 0}
          &nbsp;&nbsp;
          <img src="/icons/comment_gray.svg" alt="comments" className={styles.icon2}/>
          {collection.commentCount ?? 0}
        </p>
      </div>
    </div>
  );
};

export default CollectionEntry;
