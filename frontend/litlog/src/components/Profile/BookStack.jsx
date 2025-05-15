import React from "react"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./BookStack.module.css";
import BookStackBook from "./BookStackBook";


const colors = ["#636B2F", "#BAC095", "#D4DE95", "#3D4127"];

function getNonRepeatingColor(prevColor) {
    let newColor;
    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === prevColor);
    return newColor;
}

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
                {result.books.map(book => (
                    <a href={`/books/${book.bookApiId}`} className={styles.bookLink}>
                    <BookStackBook key={book.id} title={book.title.toUpperCase()} pageCount={book.pageCount}/>
                    </a>
                ))}
            </div>
        </div>
    );
}