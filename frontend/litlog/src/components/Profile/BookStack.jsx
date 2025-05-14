import React from "react"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./BookStack.module.css";

export default function BookStack() {
    const {userId} = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9090/members/${userId}/bookshelf/finished`)
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(error => console.error("Failed to fetch books", error));
    }, [userId]);

    return (
        <div className={styles.bookStack}>
            <ul className={styles.bookList}>
                
            </ul>
        </div>
    )
}