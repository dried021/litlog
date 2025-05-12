import React from "react";
import styles from './GroupBooks.module.css';
import defaultThumbnail from "../../assets/default_thumbnail.png";
import heart from "../../assets/heart.svg";

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
                                <a href={`books`}>
                                    <img 
                                        src={book.thumbnail ? book.thumbnail : defaultThumbnail}
                                        alt={book.title}
                                        className={styles.bookThumbnail}/>
                                </a>
                                <div className={styles.bookInfo}>
                                    {book.rating > 0 && (
                                        <div className={styles.bookInfo}>
                                            {[...Array(5)].map((_, index) => (
                                                index < book.rating && (
                                                    <span key={index} className={styles.star}>★</span>
                                                )
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