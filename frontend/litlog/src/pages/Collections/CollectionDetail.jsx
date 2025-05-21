import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CollectionDetail.module.css';
import Pagination from "../../components/Pagination/Pagination";
import CollectionCommentSection from './CollectionCommentSection';
import { UserContext } from '../../libs/UserContext';
import CustomModal from "../../components/Modal/CustomModal";
import defaultProfile from '../../assets/default_profile.png';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    mode: "close",
    resultValue: "1",
  });

  const openModal = ({ message, mode = "close", resultValue = "1", callbackOnSuccess = null, callbackOnFail = null }) => {
    setModalData({
      show: true,
      message,
      mode,
      resultValue,
      callbackOnSuccess,
      callbackOnFail
    });
  };

  const handleCloseModal = () => {
    setModalData(prev => ({ ...prev, show: false }));
  };

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
      openModal({
        message: "You need to sign in before using this feature.",
        mode: "confirm",
        resultValue: "1",
        callbackOnSuccess: () => {
          navigate('/sign-in', {
            state: { from: location.pathname },
            replace: true
          });
        },
        callbackOnFail: () => {
        }
      });
      return;
    }

    if (collection && user === collection.userId) {
      openModal({ message: "You cannot like your own collection." });
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

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  if (!collection) return <p>Loading...</p>;

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>
        <div className={styles.cardBox}>
          {/* (날짜 + 좋아요 + 댓글 + 버튼) */}
          <div className={styles.topBar}>
            <div className={styles.leftSection}>
              <p className={styles.collectionDate}>
                <img src="/icons/calendar-check.svg" alt="Date" className={styles.icon} /> 
                {formatDate(creationDate)}</p>
            </div>

            <div className={styles.topRight}>
              <div className={styles.metaInfo}>
                <div className={styles.likeComment}>
                  <span onClick={handleLikeToggle} style={{ cursor: 'pointer' }}>
                    <img 
                      src={liked ? '/icons/heart_filled.svg' : '/icons/heart_gray.svg'} 
                      alt="heart"
                      className="heart-icon"
                      style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '4px' }} 
                    />
                    {likeCount}
                  </span>
                  <span> ・ 
                    <img src="/icons/comment_gray.svg" alt="Comment" className={styles.icon} /> 
                    {collection.commentCount}</span>
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
                    onClick={() => {
                      openModal({
                        message: 'Are you sure you want to delete this collection?',
                        mode: 'confirm',
                        resultValue: '1',
                        callbackOnSuccess: async () => {
                          try {
                            await axios.delete(`http://localhost:9090/collections/${collection.id}`, {
                              withCredentials: true,
                            });

                            setModalData({
                              show: true,
                              message: 'Deleted successfully.',
                              mode: 'close',
                              resultValue: '1',
                            });
                            
                            setTimeout(() => {
                              navigate('/collections');
                            }, 1000);
                          } catch (err) {
                            console.error('Failed to delete: ', err);
                            setModalData({
                              show: true,
                              message: 'An error occurred during deletion.',
                              mode: 'close',
                              resultValue: '0',
                            });
                          }
                        },
                        callbackOnFail: () => {
                        }
                      });
                    }}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <h2 className={styles.title}>{collection.title}</h2>
          <p className={`${styles.content} ${!isExpanded && collection.content.length > 10 ? styles.collapsed : ''}`}>
            {collection.content}
          </p>

          {collection.content.length > 10 && (
            <button className={styles.expandBtn} onClick={toggleExpand}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
          <br />
          <Link to={`/${collection.userId}`} className={styles.author}>
            <img
              src={
                collection.profileImage
                  ? (collection.profileImage.startsWith('http')
                      ? collection.profileImage
                      : `http://localhost:9090${collection.profileImage}`)
                  : defaultProfile
              }
              alt="profile"
              className={styles.profileIcon}
            />{collection.nickname}
        </Link>
          <p className={styles.bookCount}>
            <img src="/icons/book.svg" alt="Book" className={styles.icon} />  
            {totalBooks} book(s)
          </p>
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
      <CustomModal
        show={modalData.show}
        onHide={handleCloseModal}
        successMessage={modalData.message}
        failMessage={modalData.message}
        resultValue={modalData.resultValue}
        mode={modalData.mode}
        callbackOnSuccess={modalData.callbackOnSuccess}
        callbackOnFail={modalData.callbackOnFail}
      />
    </div>
  );

};

export default CollectionDetail;
