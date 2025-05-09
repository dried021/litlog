import React from 'react';
import './BookList.css';

function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map((book, index) => {
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || '/images/covernotavailable.png';
        return (
          <div key={book.id || book.volumeInfo.industryIdentifiers?.[0]?.identifier} className="book-item">
            <div className="index-box">
              <p className="index-box-p">{index+1}</p>
            </div>
            <div className="thumbnail">
              <img src={thumbnail} alt={book.volumeInfo.title} />
            </div>
            <div className="book-info">
              <h3 className="book-title">{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && <p className="subtitle">{book.volumeInfo.subtitle}</p>}
              <p className="authors">{book.volumeInfo.authors?.join(', ')}</p>
              <p className="publisher">
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