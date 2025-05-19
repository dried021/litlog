import React, { useEffect, useState } from 'react';
import styles from './NewCollection.module.css';
import { useRequireAuth } from '../../libs/useRequireAuth';
import { useSubmitCollection } from './useSubmitCollection';
import { useNavigate } from 'react-router-dom';

const NewCollection = ({
  mode = 'create', // 'edit'이면 수정
  collectionId,
  initialTitle = '',
  initialContent = '',
  initialBooks = []
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setSelectedBooks(initialBooks);
  }, []);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSearchQuery('');
    setSearchResults([]);
    setSelectedBooks([]);
  };

  const { handleSubmit } = useSubmitCollection(
    title,
    content,
    selectedBooks,
    resetForm,
    mode,
    collectionId,
    navigate  
  );

  if (user === undefined) return <div>Authenticating...</div>;
  if (user === null) return null;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();

      const books = data.items?.map(item => ({
        bookApiId: item.id,
        title: item.volumeInfo.title || 'No Title',
        authors: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        publisher: item.volumeInfo.publisher || 'Unknown Publisher',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '/images/covernotavailable.png',
      })) || [];

      setSearchResults(books);
      setPage(1);
      setHasMore((data.totalItems || 0) > books.length);
    } catch (err) {
      console.error('Google Books API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const startIndex = page * 10;
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=10`);
      const data = await res.json();

      const books = (data.items || []).map(item => ({
        bookApiId: item.id,
        title: item.volumeInfo.title || 'No Title',
        authors: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        publisher: item.volumeInfo.publisher || 'Unknown Publisher',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '/images/covernotavailable.png',
      }));

      setSearchResults(prev => [...prev, ...books]);
      setPage(prev => prev + 1);
      setHasMore((data.totalItems || 0) > startIndex + books.length);
    } catch (err) {
      console.error('Failed to load more content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    if (!selectedBooks.find(b => b.bookApiId === book.bookApiId)) {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const handleRemoveBook = (bookApiId) => {
    setSelectedBooks(selectedBooks.filter(book => book.bookApiId !== bookApiId));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.pageTitle}>
        {mode === 'edit' ? 'Edit Your Collection' : 'Create a New Collection'}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Collection Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 255) {
              setTitle(e.target.value);
            }
          }}
          maxLength={255}
          placeholder="Enter collection name"
        />
        <small className={styles.charCount}>{title.length} / 255</small>

        <label>Description</label>
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 1000) {
              setContent(e.target.value);
            }
          }}
          maxLength={1000}
          placeholder="Enter description"
        />
        <small className={styles.charCount}>{content.length} / 1000</small>

        <div className={styles.bookSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Books…"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button type="button" onClick={handleSearch}>Search</button>

        {searchResults.length > 0 && (
        <div className={styles.searchResultsBox}>
          {searchResults.map((book, idx) => (
            <div key={idx} className={styles.resultItem} onClick={() => handleSelectBook(book)}>
              {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
              <div className={styles.resultText}>
                <p className={styles.resultTitle}><strong>{book.title}</strong></p>
                <p className={styles.resultMeta}>{book.authors} / {book.publisher}</p>
              </div>
            </div>
          ))}

          <div className={styles.dropdownButtons}>
            <button
              type="button"
              className={styles.closeDropdownBtn}
              onClick={() => setSearchResults([])}
            >
              close
            </button>

            {hasMore && (
              <button
                type="button"
                onClick={loadMore}
                className={styles.loadMoreBtn}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
        </div>
      )}
      </div>

        <div className={styles.addedBooks}>
          <p>Added Books List</p>
          {selectedBooks.length === 0 ? (
            <p style={{ color: '#888', marginTop: '8px' }}>No books have been added yet.</p>
          ) : (
            selectedBooks.map((book, index) => (
              <div key={index} className={styles.bookCard}>
                {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
                <div className={styles.bookInfo}>
                  <p><strong>{book.title}</strong></p>
                  <p>{book.authors}</p>
                  <p>{book.publisher}</p>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemoveBook(book.bookApiId)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          {mode === 'edit' ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default NewCollection;