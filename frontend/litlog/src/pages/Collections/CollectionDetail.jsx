import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CollectionDetail.module.css';
import Pagination from "../../components/Pagination/Pagination";
import CollectionCommentSection from './CollectionCommentSection';

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);        // 메타 정보
  const [books, setBooks] = useState([]);                    // 현재 페이지 책
  const [totalBooks, setTotalBooks] = useState(0);           // 전체 책 수
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9090/collections/${collectionId}`)
      .then(res => setCollection(res.data))
      .catch(err => console.error('불러오기 실패', err));
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
      .catch(err => console.error('책 목록 불러오기 실패', err));
  }, [collectionId, currentPage]);

  if (!collection) return <p>로딩 중...</p>;

  return (
    
    <div className={styles.outerWrapper}>
      
      {/* 좌측 좋아요/댓글수 / 우측 수정/삭제 버튼 */}
      <div className={styles.topBar}>
        <div className={styles.likeComment}>
          ❤️ {collection.likeCount} ・ 💬 {collection.commentCount}
        </div>
        <div className={styles.modifyDelete}>
          <button className={styles.editBtn}>Modify</button>
          <button className={styles.deleteBtn}>Delete</button>
        </div>
      </div>

      {/* 전체 콘텐츠 박스 감싸기 */}
      <div className={styles.container}>
        
        {/* 박스 1: Collection Info */}
        <div className={styles.cardBox}>
          <h2 className={styles.title}>{collection.title}</h2>
          <p className={styles.content}>{collection.content}</p>
          <p className={styles.author}>작성자: {collection.nickname}</p>
        </div>

        {/* 박스 2: 책 목록 + 페이지네이션 */}        
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
              onPageChange={(pageNum) => setCurrentPage(pageNum)}
            />
          </div>

        {/* 박스 3: 댓글 */}
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
