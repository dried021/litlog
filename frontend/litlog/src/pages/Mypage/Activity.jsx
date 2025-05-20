import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import TabMenu from "../../components/Mypage/TabMenu";

import styles from "./Activity.module.css";
import defaultProfile from "../../assets/default_profile.png";
import ActivityMessage from "../../components/Activity/ActivityMessage";
import ProfileSummary from "../../components/Profile/ProfileSummary";

export default function Activity() {
    const {userId} = useParams();
    const [activeTab, setActiveTab] = useState("following");
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [result, setResult] = useState({
        totalCount: 0,
        activities: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:9090/members/${userId}/activity/${activeTab}?limit=${limit}&offset=${offset}`)
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
    }, [activeTab, offset])

    useEffect(()=>{
        setOffset(0);
        setHasMore(true);
    }, [activeTab])

    if (loading) return <p className={styles.msg}>Loading...</p>
    
    return (
        <div className={styles.page}>
            <ProfileSummary/>
            <TabMenu/>
            <div className={styles.activities}>
                <div className={styles.tabs}>
                    <button onClick={() => setActiveTab("following")} className={`${activeTab === "following" ? styles.active : ""}`}>
                        FOLLOWING
                    </button>
                    <button onClick={() => setActiveTab("incoming")} className={`${activeTab === "incoming" ? styles.active : ""}`}>
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
                                                : `http://localhost:9090${activity.profileImage}`)
                                                : defaultProfile}
                                            alt="profile"
                                            className={styles.profileImg}
                                        />
                                    </div>
                                    <ActivityMessage activity={activity}></ActivityMessage>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {hasMore &&
                        <button onClick={() => setOffset((previousValue) => previousValue + limit)} className={styles.loadButton}>
                            VIEW MORE
                        </button>
                    }
                </>
            )}
        </div>
    );
}