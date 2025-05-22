import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TabMenu from "../../components/Mypage/TabMenu";

import styles from "./Activity.module.css";
import defaultProfile from "../../assets/default_profile.png";
import ActivityMessage from "../../components/Activity/ActivityMessage";
import ProfileSummary from "../../components/Profile/ProfileSummary";

export default function Activity() {
    const { userId } = useParams();
    const [activeTab, setActiveTab] = useState("following");
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [result, setResult] = useState({
        totalCount: 0,
        activities: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/members/${userId}/activity/${activeTab}?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then(data => {
                setResult(prevResult => ({
                    totalCount: data.totalCount,
                    activities: offset === 0
                        ? data.activities
                        : [...prevResult.activities, ...data.activities]
                }))
                setHasMore(data.activities.length === limit)
            })
            .catch(error => console.error("Failed to fetch data", error))
            .finally(() => setLoading(false));
    }, [activeTab, offset]);

    useEffect(() => {
        setOffset(0);
        setHasMore(true);
    }, [activeTab]);

    if (loading) return <p className={styles.msg}>Loading...</p>;

    return (
        <div className={styles.page}>
            <ProfileSummary />
            <TabMenu />
            <div className={styles.activities}>
                <div className={styles.tabs}>
                    <button
                        onClick={() => setActiveTab("following")}
                        className={`${styles.tabButton} ${activeTab === "following" ? styles.active : ""}`}
                    >
                        FOLLOWING
                    </button>
                    <button
                        onClick={() => setActiveTab("incoming")}
                        className={`${styles.tabButton} ${activeTab === "incoming" ? styles.active : ""}`}
                    >
                        INCOMING
                    </button>
                </div>
            </div>
            {result.activities.length === 0 && <p className={styles.msg}>No recent activity</p>}
            {result.activities.length > 0 && (
                <>
                    <ul className={styles.activityList}>
                        {result.activities.map((activity, index) => (
                            <li key={index}>
                                <div className={styles.activity}>
                                    <div className={styles.center}>
                                        <img
                                            src={activity.profileImage ?
                                                (activity.profileImage.startsWith('http')
                                                    ? activity.profileImage
                                                    : `/api/${activity.profileImage}`)
                                                : defaultProfile}
                                            alt="profile"
                                            className={styles.profileImg}
                                        />
                                    </div>
                                    <ActivityMessage activity={activity} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    {hasMore &&
                        <button
                            onClick={() => setOffset((prev) => prev + limit)}
                            className={styles.loadButton}
                        >
                            VIEW MORE
                        </button>
                    }
                </>
            )}
        </div>
    );
}
