import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../libs/UserContext';

import TabMenu from '../../components/Mypage/TabMenu';
import styles from './Bookshelf.module.css';
import defaultThumbnail from '../../assets/default_thumbnail.png';
import heart from '../../assets/heart.svg';
import menuIcon from '../../assets/menu.svg';
import Pagination from '../../components/Pagination/Pagination';
import BookMenu from '../../components/Bookshelf/BookMenu';
import ProfileSummary from '../../components/Profile/ProfileSummary';

const Bookshelf = ({ shelfType }) => {
  const { user } = useContext(UserContext);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [shelf, setShelf] = useState(shelfType ? shelfType : 'current');
  const [sort, setSort] = useState('added-newest');
  const [result, setResult] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = shelf === 'current' ? 15 : 18;

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const getSortLabel = (value) => {
    const labels = {
      'added-newest': 'Newest Added',
      'added-earliest': 'Earliest Added',
      'published-newest': 'Newest Published',
      'published-earliest': 'Oldest Published',
      'rating-highest': 'Highest Rating',
      'rating-lowest': 'Lowest Rating',
      'length-shortest': 'Shortest Length',
      'length-longest': 'Longest Length',
    };
    return labels[value] || 'Sort';
  };

  const handleSortChange = (val) => {
    setSort(val);
    setOpenDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let path;
    switch (shelf) {
      case 'finished':
        path = `http://localhost:9090/members/${userId}/bookshelf/finished`;
        break;
      case 'to-read':
        path = `http://localhost:9090/members/${userId}/bookshelf/to-read`;
        break;
      case 'favorite':
        path = `http://localhost:9090/members/${userId}/bookshelf/favorite`;
        break;
      default:
        path = `http://localhost:9090/members/${userId}/bookshelf/current`;
    }

    fetch(path)
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch((error) => console.error('Error fetching books', error))
      .finally(() => setLoading(false));
  }, [shelf, userId, updateStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [shelf, sort]);

  if (loading) return <p>Loading...</p>;

  const sortedBooks = [...result.books].sort((a, b) => {
    switch (sort) {
      case 'added-newest':
        return new Date(b.creationDate) - new Date(a.creationDate);
      case 'added-earliest':
        return new Date(a.creationDate) - new Date(b.creationDate);
      case 'published-newest':
        if (a.publishedDate === null) return 1;
        if (b.publishedDate === null) return -1;
        return new Date(b.publishedDate) - new Date(a.publishedDate);
      case 'published-earliest':
        if (a.publishedDate === null) return 1;
        if (b.publishedDate === null) return -1;
        return new Date(a.publishedDate) - new Date(b.publishedDate);
      case 'rating-highest':
        if (a.rating === null) return 1;
        if (b.rating === null) return -1;
        return b.rating - a.rating;
      case 'rating-lowest':
        if (a.rating === null) return 1;
        if (b.rating === null) return -1;
        return a.rating - b.rating;
      case 'length-shortest':
        if (a.pageCount === null) return 1;
        if (b.pageCount === null) return -1;
        return a.pageCount - b.pageCount;
      case 'length-longest':
        if (a.pageCount === null) return 1;
        if (b.pageCount === null) return -1;
        return b.pageCount - a.pageCount;
      default:
        return new Date(b.creationDate) - new Date(a.creationDate);
    }
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className={styles.bookshelf}>
      <ProfileSummary />
      <TabMenu />
      <div className={styles.tabs}>
        <div className={styles.buttonContainer}>
          <button onClick={() => setShelf('current')} className={`${shelf === 'current' ? styles.active : ''}`}>
            CURRENTLY READING
          </button>
          <button onClick={() => setShelf('finished')} className={`${shelf === 'finished' ? styles.active : ''}`}>
            FINISHED READING
          </button>
          <button onClick={() => setShelf('to-read')} className={`${shelf === 'to-read' ? styles.active : ''}`}>
            TO READ
          </button>
          <button onClick={() => setShelf('favorite')} className={`${shelf === 'favorite' ? styles.active : ''}`}>
            FAVORITE
          </button>
        </div>

        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <span
            className={`${styles.tabButton} ${styles.filterTab} ${openDropdown ? styles.active : ''}`}
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            Sort by {getSortLabel(sort)} <span className={styles.arrow}>▾</span>
          </span>
          {openDropdown && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>ADDED DATE</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('added-newest')}>Newest First</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('added-earliest')}>Earliest First</div>
              </div>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>PUBLISHED DATE</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('published-newest')}>Newest First</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('published-earliest')}>Earliest First</div>
              </div>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>YOUR RATING</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('rating-highest')}>Highest First</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('rating-lowest')}>Lowest First</div>
              </div>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownTitle}>BOOK LENGTH</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('length-shortest')}>Shortest First</div>
                <div className={styles.dropdownItem} onClick={() => handleSortChange('length-longest')}>Longest First</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {currentBooks.length === 0 && <p className={styles.msg}>No books to show</p>}
      {currentBooks.length > 0 && (
        <>
          <ul className={styles.bookList}>
            {currentBooks.map((book) => (
              <li key={book.bookId} className={styles.bookCard}>
                <a href={`/books/${book.bookApiId}`}>
                  <div className={styles.tooltip}>
                    <img
                      src={book.thumbnail ? book.thumbnail : defaultThumbnail}
                      alt={book.title}
                      className={styles.bookThumbnail}
                    />
                    <span className={styles.tooltiptext}>{book.title}</span>
                  </div>
                </a>
                {user && user === userId && (
                  <BookMenu book={book} shelfType={shelf} onUpdated={() => setUpdateStatus((prev) => !prev)} />
                )}
                <div className={styles.bookInfo}>
                  {[...Array(5)].map(
                    (_, index) => index < book.rating && shelf !== 'current' && <span key={index} className={styles.star}>★</span>
                  )}
                  {book.likeStatus && shelf !== 'current' && <img src={heart} className={styles.icon} />}
                  {shelf === 'current' && (
                    <>
                      <div className={styles.progressRow}>
                        <span className={styles.progressInfo}>{book.progress}%</span>
                        <div className={styles.outerProgressBar}>
                          <div className={styles.innerProgressBar} style={{ width: `${book.progress}%` }} />
                        </div>
                      </div>
                      <span className={styles.progressInfo}>
                        Started {new Date(book.creationDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            pageCount={Math.ceil(sortedBooks.length / booksPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default Bookshelf;
