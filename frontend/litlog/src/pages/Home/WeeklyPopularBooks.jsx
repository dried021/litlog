import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './WeeklyPopularBooks.module.css';
import { useNavigate } from 'react-router-dom';
import defaultThumbnail from '../../assets/default_thumbnail.png';

const WeeklyPopularBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  axios.get('http://localhost:9090/books/popularBookList')
    .then(res => {
      const sliced = res.data.slice(0, 6);
      setBooks(sliced);
    });
}, []);


    return (
        <div className={styles.container}>
      <div className={styles.header}>
        <h3>Popular Books This Week</h3>
        <button className={styles.moreBtn} onClick={() => navigate('/books')}>
          More →
        </button>
      </div>
      <div className={styles.bookRow}>
        {books.map(book => (
          <div key={book.id} className={styles.bookCard} onClick={() => navigate(`/books/${book.link}`)}>
            <img
              src={book.image ? book.image : defaultThumbnail}
              alt={book.title}
              className={styles.thumbnail}
            />
            <div className={styles.title}>{book.title}</div>
            <div className={styles.authors}>{book.authors}</div>
            <div className={styles.bookStats}>
              <img className={styles.icon} src="/icons/bookshelf.svg" alt="Bookshelf" />
              <p>{book.bookshelves ?? 0}</p>
              <img className={styles.icon} src="/icons/heart_filled.svg" alt="Like" />
              <p>{book.likes ?? 0}</p>
              <img className={styles.icon} src="/icons/star2.svg" alt="Review" />
              <p>{book.reviews ?? 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPopularBooks;
