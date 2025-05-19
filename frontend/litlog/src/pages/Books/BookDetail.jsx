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
import { useContext } from 'react';
import { UserContext } from '../../libs/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';


const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isClose, setIsClose] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [likeTrigger, setLikeTrigger] = useState(0);


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

  const handleAddToBookShelfButton = async (option) => {
    try {
      const response = await axios.post(`http://localhost:9090/books/bookshelf`, {
        bookId,
        book,
        option,
      }, { withCredentials: true });
      openModal("The book has been successfully added to the bookshelf.");
    } catch (err) {
      console.error("Add to bookshelf error");
    }
  };
  
  const handleAddLikeButton = async () => {
    try {
      const response = await axios.post(`http://localhost:9090/books/like`, { bookId, book }, { withCredentials: true });
      const result = response.data;
      openModal(result > 0 ? "You have already liked this book." : "The book has been successfully liked.");
      setLikeTrigger(prev => prev + 1);
    } catch (err) {
      console.error("Add like error");
    }
  };

  const handleAddedLikeButton = async (option) => {
    try {
      const response = await axios.post(`http://localhost:9090/books/unlike`, { bookApiId: bookId, option }, { withCredentials: true });
      if (option===1&&response!=null){
        navigate(`/${response.data}/bookshelf`);
        return;
      }
      setLikeTrigger(prev => prev + 1);
      openModal("The book has been successfully unliked.");
    } catch (err) {
      console.error("Remove like error");
    }
  };

  const handleAddedBookShelfButton = async (option) => {
    try {
      const response = await axios.post(`http://localhost:9090/books/bookshelf/added`, {
        bookId,
        book,
        option,
      }, { withCredentials: true });
      if (option===1&&response!=null){
        navigate(`/${response.data}/bookshelf`);
        return;
      }
      openModal("The book has been successfully removed from the bookshelf.");
    } catch (err) {
      console.error("Add to bookshelf error");
    }
  }


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
                <BookInfoDiv bookApiId={bookId} likeTrigger={likeTrigger}/>
                <AddToBookshelfButton bookApiId={bookId} handleClick={handleAddToBookShelfButton} handleAddedClick={handleAddedBookShelfButton}/>
                <AddLikeButton bookApiId={bookId} handleClick={handleAddLikeButton} handleAddedClick={handleAddedLikeButton} likeTrigger={likeTrigger}/>
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

              <p className={styles['categories']}>
                {book.volumeInfo?.categories ? book.volumeInfo.categories.join(', ') : ''}
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
