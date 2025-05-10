import React, { useState, useEffect } from 'react';
import styles from './BookInfoDiv.module.css';
import { exists } from "../../../libs/book/exists";
import axios from 'axios';

function BookInfoDiv({ bookApiId }) {
  const [bookshelfCount, setBookshelfcount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (bookApiId) {
      const checkCounts = async () => {
        const isExists = await exists(bookApiId);
        if (isExists) {
          getCounts(bookApiId);
        } else {
          setBookshelfcount(0);
          setLikeCount(0);
        }
      };
      checkCounts();
    }
  }, [bookApiId]);

  const getCounts = async (bookApiId) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/counts`, {
        params: { bookApiId },
      });

      const { bookshelfCount, likeCount } = response.data;
      setBookshelfcount(bookshelfCount);
      setLikeCount(likeCount);
      console.log(`Bookshelf: ${bookshelfCount}, Likes: ${likeCount}`);
    } catch (error) {
      console.error("Fail to fetch counts:", error);
      setBookshelfcount(0);
      setLikeCount(0);
    }
  };

  return (
    <div className={styles.bookInfoDiv}>
      <img src="/icons/bookshelf.svg" alt="Bookshelf" />
      {" " + bookshelfCount + " "}
      <img className={styles.heart} src="/icons/heart_filled.svg" alt="Like" />
      {" " + likeCount}
    </div>
  );
}

export default BookInfoDiv;
