import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaRegHeart, FaPlus, FaBars } from 'react-icons/fa';
import styles from './BookDetail.module.css';
import { removeTags } from "../../libs/text/removeTag";
import axios from 'axios';


const BookDetail = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState({});

    console.log(bookId);
    useEffect(() => {
        loadBook(bookId);
    }, [bookId]);

    const loadBook = async (bookId) => {
        try {
            const response = await axios.get(`http://localhost:9090/books/detail`, {
                params: {
                    keyword: bookId,
                },
            });
            setBook(response.data);
        } catch (error) {
            console.error("Fail to search:", error);
        }
    };
    
    useEffect(() => {
        if (book?.volumeInfo?.description) {
          const cleanDescription = removeTags(book.volumeInfo.description);
          
          if (book.volumeInfo.description !== cleanDescription) {
            setBook((prevBook) => ({
              ...prevBook,
              volumeInfo: {
                ...prevBook.volumeInfo,
                description: cleanDescription,
              },
            }));
          }
          console.log(cleanDescription)
        }
      }, [book]);

    return(
        <div>
            <h2 className="title">Book Detail page</h2>
            {book.volumeInfo ? (
                <div className={styles.container}>

                <div className={styles['book-section']}>
                    <div >
                        <img className={styles['thumbnail']} src={book.volumeInfo.imageLinks?.thumbnail || '/images/covernotavailable.png'} alt={book.volumeInfo.title}/>
                    </div>

                    
                </div>

                <div className={styles['description-section']}>
                    <div className={styles['info-section']}>
                        <h3 className={styles['book-title']}>
                            {book.volumeInfo.title}
                        </h3>

                        {book.volumeInfo.subtitle && <p className={styles['subtitle']}>{book.volumeInfo.subtitle}</p>}
                        <p className={styles['authors']}>{book.volumeInfo.authors?.join(', ')}</p>
                        <p className={styles['publisher']}>
                        {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate}
                        </p>
                        {book.volumeInfo.description && <div className={styles['description']}>
                            {book.volumeInfo.description.split("\n").map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}</div>}
                        
                        <div className={styles.buttons}>
                            <button className={styles['bookshelf-button']}>
                            <FaBars /> Add to Bookshelf
                            </button>
                            <button className={styles['like-button']}>
                            <FaRegHeart /> Add Like
                            </button>
                        </div>
                    </div>
                    <p>{book?.description}</p>

                </div>

                <div className={styles['reviews-section']}>
                    <div className={styles['reviews-header']}>
                    <h3>Reviews</h3>
                    <button className={styles['add-review']}>Add Review</button>
                    </div>
                    <div className={styles['review-options']}>
                    <button className={styles['option-button']}>인기순 (Default)</button>
                    <button className={styles['option-button']}>최근등록순</button>
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
