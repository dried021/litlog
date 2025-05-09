import React from 'react';
import styles from './BookList.module.css';

function BookList({ books, onItemClick }) {
  return (
    <div className={styles['book-list']}>
      {books.map((book, index) => {
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || '/images/covernotavailable.png';
        return (
          <div key={book.id || book.volumeInfo.industryIdentifiers?.[0]?.identifier} 
            className={styles['book-item']} 
            onClick={() => onItemClick(book.id)}>
            <div className={styles['index-box']}>
              <p className={styles['index-box-p']}>{index + 1}</p>
            </div>
            <div className={styles['thumbnail']}>
              <img src={thumbnail} alt={book.volumeInfo.title} />
            </div>
            <div className={styles['book-info']}>
              <h3 className={styles['book-title']}>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && <p className={styles['subtitle']}>{book.volumeInfo.subtitle}</p>}
              <p className={styles['authors']}>{book.volumeInfo.authors?.join(', ')}</p>
              <p className={styles['publisher']}>
                {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
