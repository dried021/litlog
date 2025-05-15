import React from "react"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./BookStack.module.css";
import BookStackBook from "./BookStackBook";

export default function BookStack() {
    const {userId} = useParams();
    const [result, setResult] = useState({
        "totalCount" : 0,
        "books": []
    });

    useEffect(() => {
        fetch(`http://localhost:9090/members/${userId}/bookshelf/finished`)
            .then(res => res.json())
            .then(data => setResult(data))
            .catch(error => console.error("Failed to fetch books", error));
    }, [userId]);


    return (
        <div className={styles.bookStack}>
            {result.totalCount > 0 && <h2>{new Date().getFullYear()} BOOK STACK</h2>}
            <div className={styles.bookList}>
                {result.books.map((book, index) => (
                    <a key={index} href={`/books/${book.bookApiId}`} className={styles.bookLink}>
                        <BookStackBook title={book.title.toUpperCase()} pageCount={book.pageCount}/>
                    </a>
                ))}
            </div>
        </div>
    );
}