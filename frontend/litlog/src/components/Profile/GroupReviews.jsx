import React from "react";
import styles from "./GroupReviews.module.css";
import ProfileReviewCard from "./ProfileReviewCard";

export default function GroupReviews({groupLabel, group, msg, url}) {
    return(
        <div className={styles.groupReviews}>
            <div className={styles.groupHeader}>
                <h2>{groupLabel}</h2>
                {group.totalCount !== 0 && <a href={url}>VIEW ALL</a>}
            </div>
            <hr className={styles.solid}/>
            {group.totalCount === 0 ?
                (<p>{msg}</p>) : 
                group.reviews.map((review, index) => (
                    <ProfileReviewCard
                        key={index}
                        review={review} 
                        last={index === group.totalCount - 1}
                    />
                ))
            }
        </div>
    );
}