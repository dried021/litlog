import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BooksInProgress.module.css'; 
import defaultThumbnail from '../../assets/default_thumbnail.png';

const BooksInProgress = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    fetch(`/LitLog/api/members/${userId}/bookshelf/current`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books || []);
      })
      .catch((err) => console.error('Error fetching books in progress:', err))
      .finally(() => setLoading(false));
  }, [userId]);

  // 로그인 안 된 경우
  if (!userId) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Books in Progress</h3>
        </div>
        <p className={styles.loginMessage}>Sign in to check the books you're reading.</p>
        <button className={styles.loginButton} onClick={() => navigate('/sign-in')}>
          Sign In Now →
        </button>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.fullWidthBg}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>
            Welcome back, Here’s your Reading Progress so far…
          </h3>
          <p>You’re currently reading {books.length} book(s)</p>
        </div>
        
        <div className={styles.thumbnailRow}>
          {books.slice(0, 5).map((book) => (
            <div key={book.bookId} className={styles.bookItem}>
              <img
                src={book.thumbnail || defaultThumbnail}
                alt={book.title}
                className={styles.thumbnail}
                onClick={() => navigate(`/books/${book.bookApiId}`)}
              />
              <div className={styles.progressInfo}>
                <div>{book.progress ?? 0}%</div>
                <div className={styles.progressBarOuter}>
                <div
                  className={styles.progressBarInner}
                  style={{ width: `${book.progress ?? 0}%` }}
                ></div>
                </div>
                <div>
                  Started {new Date(book.creationDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.linkButton} onClick={() => navigate(`/${userId}/bookshelf`)}>
          View My Bookshelf →
        </button>
      </div>
    </div>
  );
};

export default BooksInProgress;
