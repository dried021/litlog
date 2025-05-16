import React from "react";

import styles from "./ActivityMessage.module.css";

export default function ActivityMessage({activity}) {
    function getMessage() {
        switch (activity.activityType) {
            case "to_read":
                return (
                    <span>
                        added
                        <a href={`/books/${activity.bookApiId}`} className={styles.hyperlink}>
                            <span className={styles.book}>{activity.bookTitle}</span>
                        </a>
                        to their to-read list
                    </span>
                );
                break;
            case "reading":
                return (
                    <span>
                        started reading
                        <a href={`/books/${activity.bookApiId}`}  className={styles.hyperlink}>
                            <span className={styles.book}>{activity.bookTitle}</span>
                        </a>
                    </span>
                );
                break;
            case "read":
                return (
                    <span>
                        read
                        <a href={`/books/${activity.bookApiId}`} className={styles.hyperlink}>
                            <span className={styles.book}>{activity.bookTitle}</span>
                        </a>
                    </span>
                );
                break;
            case "review":
                return (
                    <span>
                        rated
                        <a href={`/books/${activity.bookApiId}`} className={styles.hyperlink}>
                            <span className={styles.book}>{activity.bookTitle}</span>
                        </a>
                        {[...Array(5)].map((_, index) => (
                            index < activity.rating && (
                                <span key={index} className={styles.star}>★</span>
                            )
                        ))}
                    </span>
                );
                break;
            case "liked_book":
                return (
                    <span>
                        liked
                        <a href={`/books/${activity.bookApiId}`} className={styles.hyperlink}>
                            <span className={styles.book}>{activity.bookTitle}</span>
                        </a>
                    </span>
                );
                break;
            case "recent_followers":
                return (
                    <span>
                        started following you
                    </span>
                );
                break;
            case "review_liked":
                return (
                    <span>
                        liked your
                        <a href={`/${activity.followUserId}/reviews/detail/${activity.reviewId}`} className={styles.hyperlink}>
                            <span className={styles.content}>review</span>
                        </a> 
                        of
                        <a href={`/books/${activity.bookApiId}`} className={styles.hyperlink}>
                            <span className={styles.book}>{activity.bookTitle}</span>
                        </a>
                    </span>
                );
                break;
            // TODO: add collection link
            case "collection_liked":
                return (
                    <span>
                        liked your
                        <a href={`/${activity.followUserId}/collection`} className={styles.hyperlink}>
                            {activity.collectionTitle}
                        </a>
                        collection
                    </span>
                );
                break;
        }
    }

    function timeAgo(dateString) {
        const date = new Date(dateString); // Parse timestamp
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // Difference in seconds
    
        if (diff < 60) return "just now";
        if (diff < 3600) {
            let time = Math.floor(diff / 60);
            return (time === 1 ? `${time} minute` : `${time} minutes`)
        }
        if (diff < 86400) {
            let time = Math.floor(diff / 3600);
            return (time === 1 ? `${time} hour` : `${time} hours`)
        }
        if (diff < 2592000) {
            let time = Math.floor(diff / 86400);
            return (time === 1 ? `${time} day` : `${time} days`)
        }
        return "";
    }

    return (
        <div className={styles.message}>
            <span className={styles.left}>
                <a href={`/${activity.followUserId}`} className={styles.hyperlink}>
                    <span className={styles.username}>{activity.followUsername}</span>
                </a>
                {getMessage()}
            </span>
            <span className={styles.left}>{timeAgo(activity.creationDate)}</span>
        </div>
    );
}