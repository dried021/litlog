import React from "react";
import "./groupBooks.css"
import defaultThumbnail from "./default_thumbnail.png";

export default function GroupBooks({groupLabel, group, msg}) {
    return (
        <div className="group-books">
            <h2>{groupLabel}</h2>
            <hr className="solid"/>
            {group.totalCount === 0 ? 
                (<p>{msg}</p>) : 
                (
                    <ul className="book-list">
                        {group.books.map(book => (
                            <li key={book.bookId} className="book-card">
                                <img 
                                    src={book.thumbnail ? book.thumbnail : defaultThumbnail}
                                    alt={book.title}
                                    className="book-thumbnail"/>
                                <div className="book-info">
                                    {book.rating > 0 && (
                                        <div className="book-rating">
                                            {[...Array(5)].map((_, index) => (
                                                <span key={index} className={index < book.rating ? "star filled" : "star"}>★</span>
                                            ))}
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