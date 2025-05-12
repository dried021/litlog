import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetail.module.css";
import { removeTags } from "../../libs/text/removeTag";
import axios from "axios";
import ReadMoreButton from "../../components/Button/ReadMoreButton";
import Reviews from "../../components/Review/Reviews";
import AddLikeButton from "../../components/Button/AddLikeButton";
import AddToBookshelfButton from "../../components/Button/AddToBookshelfButton";
import BookInfoDiv from "../../components/Book/BookInfo/BookInfoDiv";
import CustomModal from "../../components/Modal/CustomModal";


const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isClose, setIsClose] = useState(true);

  const [modalData, setModalData] = useState({
    show:false,
    message: "",
    mode: "close",
  });

  const handleCloseModal = () => {
    setModalData({...modalData, show:false,});
  };

  const openModal = (message) => {
    setModalData({
      show:true,
      message,
      mode: "close",
    });
  };

  useEffect(() => {
    if (bookId) {
      loadBook(bookId);
    }
  }, [bookId]);

  const loadBook = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/detail`, {
        params: { keyword: bookId },
      });
      setBook(response.data);
    } catch (error) {
      console.error("Fail to search:", error);
    }
  };

  const cleanDescription = useMemo(() => {
    if (book?.volumeInfo?.description) {
      return removeTags(book.volumeInfo.description);
    }
    return "";
  }, [book.volumeInfo?.description]);

  const isMoreViewRequired = useMemo(() => {
    return cleanDescription.length > 800;
  }, [cleanDescription]);

  const displayedDescription = useMemo(() => {
    if (isMoreViewRequired && isClose) {
      return cleanDescription.slice(0, 800).concat(" ...");
    }
    return cleanDescription;
  }, [cleanDescription, isMoreViewRequired, isClose]);

  const handleReadMore = () => {
    setIsClose(!isClose);
  };

  const handleAddToBookShelfButton = async () => {
    try {
      const response = await axios.post(`http://localhost:9090/books/bookshelf`, {
        bookId,
      });
      const { result } = response.data;

      if (result === 0) {
        openModal("이미 책장에 추가된 책입니다.");
      } else {
        openModal("책장에 성공적으로 추가되었습니다.");
      }
    } catch (err) {
      console.error("Add to bookshelf error: ", err);
      openModal("책장에 추가하는 중 오류가 발생했습니다.");
    }
  };

  const handleAddLikeButton = async () => {
    try {
      const response = await axios.post(`http://localhost:9090/books/like`, {
        bookId,
      });
      const { result } = response.data;

      if (result === 0) {
        openModal("이미 좋아요를 누른 책입니다.");
      } else {
        openModal("좋아요가 성공적으로 추가되었습니다.");
      }
    } catch (err) {
      console.error("Add like error: ", err);
      openModal("좋아요 추가 중 오류가 발생했습니다.");
    }
  };


  return (
    <div>
      <h2 className="title">Book Detail page</h2>
      {book.volumeInfo ? (
        <div className={styles.container}>
          <div className={styles["book-section"]}>
            <img
              className={styles["thumbnail"]}
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "/images/covernotavailable.png"
              }
              alt={book.volumeInfo.title}
            />
            <div className={styles["add-buttons"]}>
                <BookInfoDiv bookApiId={bookId}/>
                <AddToBookshelfButton isAdded={false} handleClick={handleAddToBookShelfButton}/>
                <AddLikeButton isLiked={false} handleClick={handleAddLikeButton}/>
            </div>
          </div>

          <div className={styles["description-section"]}>
            <div className={styles["info-section"]}>
              <h1 className={styles["book-title"]}>{book.volumeInfo.title}</h1>

              {book.volumeInfo.subtitle && (
                <p className={styles["subtitle"]}>{book.volumeInfo.subtitle}</p>
              )}

              {book.volumeInfo.authors && (
                <p className={styles["authors"]}>
                  {book.volumeInfo.authors}
                </p>)
              }
              
              <p className={styles["publisher"]}>
                {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate}
              </p>

              {displayedDescription && (
                <div className={styles["description"]}>
                  {displayedDescription.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              )}

              {isMoreViewRequired && (
                <div className={styles["readmore-button"]}>
                    <ReadMoreButton isOpen={!isClose} handleReadMore={handleReadMore} />
                </div>

                
              )}

              
            </div>
          </div>

          <div className={styles["reviews-section"]}>
            <div className={styles["reviews-header"]}>
              <h3>Reviews</h3>
            </div>

            <Reviews bookApiId={bookId}/>
          </div>
        </div>
      ) : (
        <p>Loading book information...</p>
      )}

      {/* 모달 컴포넌트 */}
      <CustomModal
        show={modalData.show}
        onHide={handleCloseModal}
        successMessage={modalData.message}
        failMessage={modalData.message}
        resultValue={"1"}
        mode="close"
      />
    </div>
  );
};

export default BookDetail;
