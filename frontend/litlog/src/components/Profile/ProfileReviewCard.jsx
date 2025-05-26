import React from "react";
import { useState } from "react";
import heart from "../../assets/heart.svg";
import defaultThumbnail from "../../assets/default_thumbnail.png";
import styles from "./GroupReviews.module.css";

export default function ProfileReviewCard({review, last}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const charLimit = 200;

    const date = new Date(review.creationDate).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    const toggleExpanded = () => {
        setIsExpanded(prev => !prev);
    }

    const renderContent = () => {
        if (!review.content) return null;

        if (review.content.length <= charLimit) {
            return <span>{review.content}</span>;
        }

        if (isExpanded) {
            return (
                <>
                    {review.content}
                    <button className={styles.moreButton} onClick={toggleExpanded}>less</button>
                </>
            );
        } else {
            return (
                <>
                    {review.content.slice(0, charLimit)}...
                    <button className={styles.moreButton} onClick={toggleExpanded}>more</button>
                </>
            );
        }
    }
    
    return (
        <div className={`${styles.reviewCard} ${last ? styles.noBorder : ""}`}>
            <a href={`books/${review.bookApiId}`}>
                <img
                    className={styles.bookThumbnail}
                    src={review.thumbnail || defaultThumbnail}
                    alt={review.title}
                />
            </a>
            <div className={styles.details}>
                <div className={styles.title}>
                    <a href={`books/${review.bookApiId}`} className={styles.hyperlink}>{review.title}</a>
                </div>
                <div className={styles.meta}>
                        {review.rating > 0 && (
                            <div className={styles.bookInfo}>
                                {[...Array(5)].map((_, index) => (
                                    index < review.rating && (
                                        <span key={index} className={styles.star}>★</span>
                                    )
                                ))}
                                {review.likeStatus ? (<img src={heart} className={styles.icon}/>) : ''}
                            </div>
                        )}
                    <div className={styles.date}>{date}</div>
                </div>
                <p className={styles.content}>{renderContent()}</p>
                <div className={styles.likes}>
                    <span>
                        {review.likeCount > 0
                            ? `${review.likeCount} like${review.likeCount > 1 ? 's' : ''}`
                            : 'No likes yet'
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}
