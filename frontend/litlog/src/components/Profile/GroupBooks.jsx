import React from "react";
import styles from './GroupBooks.module.css';
import defaultThumbnail from "../../assets/default_thumbnail.png";
import heart from "../../assets/heart.svg";
import star from "../../assets/star.svg";

export default function GroupBooks({groupLabel, group, msg}) {
    return (
        <div className={styles.groupBooks}>
            <h2>{groupLabel}</h2>
            <hr className={styles.solid}/>
            {group.totalCount === 0 ? 
                (<p>{msg}</p>) : 
                (
                    <ul className={styles.bookList}>
                        {group.books.map(book => (
                            <li key={book.bookId} className={styles.bookCard}>
                                <img 
                                    src={book.thumbnail ? book.thumbnail : defaultThumbnail}
                                    alt={book.title}
                                    className={styles.bookThumbnail}/>
                                <div className={styles.bookInfo}>
                                    {book.rating > 0 && (
                                        <div className={styles.bookRating}>
                                            {/*[...Array(5)].map((_, index) => index < book.rating && (
                                                <img src={star} className={styles.icon}/>
                                            ))*/}
                                            {[...Array(5)].map((_, index) => (
                                                <span 
                                                    key={index}
                                                    className={`${styles.star} ${index < book.rating ? styles.filled : ''}`}
                                                >★
                                                </span>
                                            ))}
                                            {book.likeStatus && (<img src={heart} className={styles.icon}/>)}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
}