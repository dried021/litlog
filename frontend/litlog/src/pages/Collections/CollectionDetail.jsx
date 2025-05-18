import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  // 📌 메타 정보 & 좋아요 상태 불러오기 (병렬 처리)
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
        console.error('콜렉션 정보 또는 좋아요 상태 불러오기 실패', err);
      }
    };

    fetchMetaAndLike();
  }, [collectionId]);


  // 📚 책 목록 페이징 조회
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
      .catch(err => console.error('책 목록 불러오기 실패', err));
  }, [collectionId, currentPage]);

  // 좋아요 토글
  const handleLikeToggle = async () => {
    if (!user) {
      navigate(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (collection && user === collection.userId) {
      alert("자신의 콜렉션에는 좋아요를 누를 수 없습니다.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:9090/collections/${collectionId}/like`, {}, {
        withCredentials: true
      });

      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("좋아요 처리 실패:", err);
    }
  };

  const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };

  if (!collection) return <p>로딩 중...</p>;

  return (
    <div className={styles.outerWrapper}>
      {/* 상단 좋아요/댓글수 및 수정/삭제 */}
      <div className={styles.topBar}>
        <p className={styles.collectionDate}>📅 {formatDate(creationDate)}</p>
        <div className={styles.likeComment}>
          <span onClick={handleLikeToggle} style={{ cursor: 'pointer' }}>
            {liked ? '❤️' : '🤍'} {likeCount}
          </span>
          <span> ・ 💬 {collection.commentCount}</span>
        </div>
        {user === collection.userId && (
          <div className={styles.modifyDelete}>
            <button 
              className={styles.editBtn}
              onClick={() => navigate(`/collections/${collection.id}/edit`)}
            >
                Modify
            </button>
            <button
              className={styles.deleteBtn}
              onClick={async () => {
                const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
                if (!confirmDelete) return;

                try {
                  await axios.delete(`http://localhost:9090/collections/${collection.id}`, {
                    withCredentials: true,
                  });
                  alert('삭제되었습니다.');
                  navigate('/collections'); // 삭제 후 목록으로 이동
                } catch (err) {
                  console.error('삭제 실패:', err);
                  alert('삭제 중 오류가 발생했습니다.');
                }
              }}
            >
              Delete
          </button>
          </div>
        )}
      </div>

      {/* 메타 정보 */}
      <div className={styles.container}>
        <div className={styles.cardBox}>
          <h2 className={styles.title}>{collection.title}</h2>
          <p className={styles.content}>{collection.content}</p>
          <p className={styles.author}>작성자: {collection.nickname}</p>
        </div>

        {/* 책 목록 */}
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

        {/* 댓글 영역 */}
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
