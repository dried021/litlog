import React, { useState, useEffect,  useContext } from 'react';
import styles from './BookInfoDiv.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { exists } from "../../../libs/book/exists";
import axios from 'axios';
import CustomModal from "../../Modal/CustomModal";
import { UserContext } from '../../../libs/UserContext'; 

function BookInfoDiv({ bookApiId, isLiked, setIsLiked, change, likeTrigger, bookshelfTrigger }) {
  const [bookshelfCount, setBookshelfcount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalData, setModalData] = useState({
    show:false,
    message: "",
    mode: "close",
  });

  const handleCloseModal = () => {
    setModalData({...modalData, show:false,});
  };

  const openModal = (
    successMessage, 
    failMessage = "", 
    resultValue="1",  
    mode="close",
    callbackOnSuccess=null,
    callbackOnFail=null) => {
  setModalData({
    show:true,
    successMessage,
    failMessage, 
    resultValue, 
    mode,
    callbackOnSuccess, 
    callbackOnFail
  });
};

  useEffect(() => {
    const fetchCounts = async () => {
      if (!bookApiId) {
        setBookshelfcount(0);
        setLikeCount(0);
        setIsLiked(false);
        return;
      }
  
      try {
        const isExists = await exists(bookApiId);
        if (isExists) {
          await getCounts(bookApiId);
        } else {
          setBookshelfcount(0);
          setLikeCount(0);
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error in fetchCounts:", error);
      }
    };
  
    fetchCounts();
  }, [bookApiId, likeTrigger, bookshelfTrigger]);

  const getCounts = async (bookApiId) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/counts`, {
        params: { bookApiId }, withCredentials: true
      });
  
      const { bookshelfCount, likeCount, isLiked } = response.data;
      setBookshelfcount(bookshelfCount);
      setLikeCount(likeCount);
      setIsLiked(isLiked);
    } catch (error) {
      console.error("Fail to fetch counts:", error);
      setBookshelfcount(0);
      setLikeCount(0);
      setIsLiked(false);
    }
  };

  const changeLike = async (bookApiId) => {
  if (!user) {
    openModal(
      "You need to sign in before using this feature.",
      "",
      "1",
      "confirm",
      () => {
        navigate('/sign-in', {
          state: { from: location.pathname },
          replace: true
        });
      },
      null
    );
    return;
  }

  if (isLiked) {
    try {
      const response = await axios.post(
        `http://localhost:9090/books/unlike`,
        { bookApiId, option: 2 },
        { withCredentials: true }
      );
      openModal("The book has been successfully unliked.");
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      change(); 
    } catch (err) {
      console.error("Add unlike error");
    }
  } else {
    try {
      const bookId = bookApiId;
      const response = await axios.post(
        `http://localhost:9090/books/like`,
        { bookId },
        { withCredentials: true }
      );
      const result = response.data;
      openModal(result > 0 ? "You have already liked this book." : "The book has been successfully liked.");
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch (err) {
      console.error("Add like error");
    }
  }
};

  return (
    <>
    <div className={styles.bookInfoDiv}>
      <img src="/icons/bookshelf.svg" alt="Bookshelf" />
      {" " + bookshelfCount + " "}
      <img className={styles.heart} src={isLiked ? "/icons/heart_filled.svg" : "/icons/heart_outline.svg"} alt="Like"
        onClick={() => changeLike(bookApiId)}/>
      {" " + likeCount}
    </div>

          <CustomModal
            show={modalData.show}
            onHide={handleCloseModal}
            successMessage={modalData.successMessage}
            failMessage={modalData.failMessage}
            resultValue={modalData.resultValue}
            mode={modalData.mode}
            callbackOnSuccess={modalData.callbackOnSuccess}
            callbackOnFail={modalData.callbackOnFail}/>

    </>
  );
}

export default BookInfoDiv;
