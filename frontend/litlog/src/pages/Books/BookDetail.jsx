import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaBars } from "react-icons/fa";
import styles from "./BookDetail.module.css";
import { removeTags } from "../../libs/text/removeTag";
import axios from "axios";
import ReadMoreButton from "../../components/Button/ReadMoreButton";
import AddLikeButton from "../../components/Button/AddLikeButton";
import AddToBookshelfButton from "../../components/Button/AddToBookshelfButton";
import BookInfoDiv from "../../components/Book/BookInfo/BookInfoDiv";


const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isClose, setIsClose] = useState(true);

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

  //백 작업: 세션에서 꺼내올 수 있을 때 작업...
  const handleAddToBookShelfButton = () => {};
  const handleAddLikeButton = () => {};

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
              <button className={styles["add-review"]}>Add Review</button>
            </div>
            <div className={styles["review-options"]}>
              <button className={styles["option-button"]}>인기순 (Default)</button>
              <button className={styles["option-button"]}>최근등록순</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading book information...</p>
      )}
    </div>
  );
};

export default BookDetail;
