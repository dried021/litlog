import React from "react";
import styles from "./GroupReviews.module.css";
import ProfileReviewCard from "./ProfileReviewCard";

export default function GroupReviews({groupLabel, group, msg}) {
    return(
        <div className={styles.groupReviews}>
            <h2>{groupLabel}</h2>
            <hr className={styles.solid}/>
            {group.totalCount === 0 ?
                (<p>{msg}</p>) : 
                group.reviews.map(review => (
                    <ProfileReviewCard review={review}/>
                ))
            }
        </div>
    );
}