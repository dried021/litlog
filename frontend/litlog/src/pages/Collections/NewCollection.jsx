import React, { useState} from 'react';
import styles from './NewCollection.module.css';
import { UserContext } from '../../libs/UserContext';
import { useRequireAuth } from '../../libs/useRequireAuth';
import { useSubmitCollection } from './useSubmitCollection';

const NewCollection = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSearchQuery('');
    setSearchResults([]);
    setSelectedBooks([]);
  };

  const user = useRequireAuth();
  const userId = user;

  const { handleSubmit } = useSubmitCollection(
    title,
    content,
    selectedBooks,
    resetForm
  );
  console.log('[submit payload] userId:', userId);
  console.log('[User object]', user);
  if (user === undefined) return <div>로그인 확인 중...</div>;
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
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '/images/covernotavailable.png  ',
      })) || [];

      setSearchResults(books);
      setPage(1); // 다음 페이지를 위한 startIndex = 10
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
      console.error('더 보기 에러:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    if (!selectedBooks.find(b => b.bookApiId === book.bookApiId)) {
      setSelectedBooks([...selectedBooks, book]);
    }
    setSearchResults([]); // 선택하면 결과 숨김
  };

  const handleRemoveBook = (bookApiId) => {
    setSelectedBooks(selectedBooks.filter(book => book.bookApiId !== bookApiId));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.pageTitle}>Create a New Collection</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 1. Collection Name */}
        <label>Collection Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter collection name"
        />

        {/* 2. Description */}
        <label>Description</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter description"
        />

        {/* 3. Book Search */}
        {/* 바깥 form 유지 */}
          {/* 내부 form → div 로 수정 */}
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
          </div>
        {/* 4. Search Results (출력 조건부) */}
        {searchResults.length > 0 && (
          <>
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
            </div>

            {/*Load More 버튼 */}
            {hasMore && (
              <button type="button" onClick={loadMore} className={styles.loadMoreBtn}>
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        )}

        {/* 5. Added Books List */}
        <div className={styles.addedBooks}>
          <p>Added Books List</p>
          {selectedBooks.length === 0 ? (
            <p style={{ color: '#888', marginTop: '8px' }}>아직 추가된 책이 없습니다.</p>
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

        {/* 6. Submit */}
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default NewCollection;
