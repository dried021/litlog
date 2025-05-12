import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TabMenu from '../../components/Mypage/TabMenu';
import styles from './Bookshelf.module.css';
import defaultThumbnail from '../../assets/default_thumbnail.png';
import heart from '../../assets/heart.svg';

const Bookshelf = () => {
    const {userId} = useParams();
    const [loading, setLoading] = useState(true);
    const [shelf, setShelf] = useState("current"); // current, finished, to-read, favorite
    const [sort, setSort] = useState("added-newest"); /* TODOOOOOOOOOO */
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        let path;
        switch(shelf) {
            case "finished":
                path = `http://localhost:9090/members/${userId}/bookshelf/finished`;
                break;
            case "to-read":
                path = `http://localhost:9090/members/${userId}/bookshelf/to-read`;
                break;
            case "favorite":
                path = `http://localhost:9090/members/${userId}/bookshelf/favorite`;
                break;
            default:
                path = `http://localhost:9090/members/${userId}/bookshelf/current`;
        }

        fetch(path)
            .then(res => res.json())
            .then(data => setResult(data))
            .catch(error => console.error("Error fetching books", error))
            .finally(() => setLoading(false));
    }, [shelf, userId]);

    if (loading) return <p>Loading...</p>; 

    const sortedBooks = [...result.books].sort((a, b) => {
        switch(sort) {
            case "added-newest":
                return new Date(b.creationDate) - new Date(a.creationDate);
            case "added-earliest":
                return new Date(a.creationDate) - new Date(b.creationDate);
            case "published-newest": 
                return new Date(b.publishedDate) - new Date(a.publishedDate);
            case "published-earliest": 
                return new Date(a.publishedDate) - new Date(b.publishedDate);
            case "rating-highest":
                if (a.rating === null) return 1;
                if (b.rating === null) return -1;
                return b.rating - a.rating;
            case "rating-lowest":
                if (a.rating === null) return 1;
                if (b.rating === null) return -1;
                return a.rating - b.rating;
            case "length-shortest":
                if (a.pageCount === null) return 1;
                if (b.pageCount === null) return -1;
                return a.pageCount - b.pageCount;
            case "length-longest":
                if (a.pageCount === null) return 1;
                if (b.pageCount === null) return -1;
                return b.pageCount - a.pageCount;
            default:
                return new Date(b.creationDate) - new Date(a.creationDate);
        }
    });

    return(
        <div className={styles.bookshelf}>
            <TabMenu/>
            <button onClick={() => setShelf("current")}>CURRENTLY READING</button>
            <button onClick={() => setShelf("finished")}>FINISHED READING</button>
            <button onClick={() => setShelf("to-read")}>TO READ</button>
            <button onClick={() => setShelf("favorite")}>FAVORITE</button>

            <label htmlFor="sortOptions">SORT BY</label>
            <select id="sortOptions" onChange={(e) => setSort(e.target.value)}>
                <optgroup label="When Added">
                    <option value="added-newest">Newest First</option>
                    <option value="added-earliest">Earliest First</option>
                </optgroup>
                <optgroup label="Published Date">
                    <option value="published-newest">Newest First</option>
                    <option value="published-earliest">Earliest First</option>
                </optgroup>
                <optgroup label="Your Rating">
                    <option value="rating-highest">Highest First</option>
                    <option value="rating-lowest">Lowest First</option>
                </optgroup>
                <optgroup label="Book Length">
                    <option value="length-shortest">Shortest First</option>
                    <option value="length-longest">Longest First</option>
                </optgroup>
            </select>

            <ul className={styles.bookList}>
                {sortedBooks.map(book => (
                    <li key={book.bookId} className={styles.bookCard}>
                        <a href={""}>
                            <img 
                                src={book.thumbnail ? book.thumbnail : defaultThumbnail}
                                alt={book.title}
                                className={styles.bookThumbnail}
                            />
                        </a>
                        <div className={styles.bookInfo}>
                            {[...Array(5)].map((_, index) => (
                                index < book.rating && (
                                    <span key={index} className={styles.star}>★</span>
                                )
                            ))}
                            {book.likeStatus && (<img src={heart} className={styles.icon}/>)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bookshelf;