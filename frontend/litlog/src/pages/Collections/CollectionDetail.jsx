import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CollectionDetail.module.css';
import Pagination from "../../components/Pagination/Pagination";
import CollectionCommentSection from './CollectionCommentSection';
import { UserContext } from '../../libs/UserContext';

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [creationDate, setCreationDate] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const booksPerPage = 12;

  useEffect(() => {
    const fetchMetaAndLike = async () => {
      try {
        const [metaRes, likedRes] = await Promise.all([
          axios.get(`http://localhost:9090/collections/${collectionId}`, { withCredentials: true }),
          axios.get(`http://localhost:9090/collections/${collectionId}/like-status`, { withCredentials: true })
        ]);

        setCollection(metaRes.data);
        setCreationDate(metaRes.data.creationDate);
        setLikeCount(metaRes.data.likeCount);
        setLiked(likedRes.data);
      } catch (err) {
        console.error('Failed to load collection information or like status.', err);
      }
    };

    fetchMetaAndLike();
  }, [collectionId]);

  useEffect(() => {
    axios.get(`http://localhost:9090/collections/${collectionId}/books`, {
      params: {
        page: currentPage,
        size: booksPerPage
      }
    })
      .then(res => {
        setBooks(res.data.books);
        setTotalBooks(res.data.totalCount);
      })
      .catch(err => console.error('Failed to load book list.', err));
  }, [collectionId, currentPage]);

  const handleLikeToggle = async () => {
    if (!user) {
      navigate(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (collection && user === collection.userId) {
      alert("You cannot like your own collection.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:9090/collections/${collectionId}/like`, {}, {
        withCredentials: true
      });

      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("Failed to process like:", err);
    }
  };

  const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };

  if (!collection) return <p>Loading...</p>;

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>
        <div className={styles.cardBox}>
          {/* (날짜 + 좋아요 + 댓글 + 버튼) */}
          <div className={styles.topBar}>
            <div className={styles.leftSection}>
              <p className={styles.collectionDate}>📅 {formatDate(creationDate)}</p>
            </div>

            <div className={styles.topRight}>
              <div className={styles.metaInfo}>
                <div className={styles.likeComment}>
                  <span onClick={handleLikeToggle} style={{ cursor: 'pointer' }}>
                    {liked ? '❤️' : '🤍'} {likeCount}
                  </span>
                  <span> ・ 💬 {collection.commentCount}</span>
                </div>
              </div>

              {user === collection.userId && (
                <div className={styles.modifyDelete}>
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate(`/collections/${collection.id}/edit`)}>
                    Modify
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={async () => {
                      const confirmDelete = window.confirm('Are you sure you want to delete this?');
                      if (!confirmDelete) return;

                      try {
                        await axios.delete(`http://localhost:9090/collections/${collection.id}`, {
                          withCredentials: true,
                        });
                        alert('Deleted successfully.');
                        navigate('/collections');
                      } catch (err) {
                        console.error('Failed to delete: ', err);
                        alert('An error occurred during deletion.');
                      }
                    }}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <h2 className={styles.title}>{collection.title}</h2>
          <p className={styles.content}>{collection.content}</p>
          <Link to={`/${collection.userId}`} className={styles.author}>
            by {collection.nickname}
          </Link>
          <p className={styles.bookCount}>📚 {totalBooks} book(s)</p>
        </div>

        <div className={styles.bookGrid}>
          {books.map(book => (
            <div
              key={book.id}
              className={styles.bookCard}
              onClick={() => navigate(`/books/${book.bookApiId}`)}
            >
              <img src={book.thumbnail} alt={book.title} className={styles.thumbnail} />
              <div className={styles.overlay}>{book.title}</div>
            </div>
          ))}
        </div>

        <div className={styles.bookPagination}>
          <Pagination
            currentPage={currentPage}
            pageBlock={5}
            pageCount={Math.ceil(totalBooks / booksPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className={styles.commentSection}>
          <div className={styles.cardBox}>
            <CollectionCommentSection collectionId={collectionId} />
          </div>
        </div>
      </div>
    </div>
  );

};

export default CollectionDetail;
