import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProfileSummary from "../../components/Profile/ProfileSummary";
import TabMenu from "../../components/Mypage/TabMenu";
import styles from "./Network.module.css";

import defaultProfile from "../../assets/default_profile.png";
import eyeIcon from '../../assets/eye_light.svg';
import reviewIcon from '../../assets/review_light.svg';
import collectionIcon from '../../assets/collection_light.svg';
import Pagination from "../../components/Pagination/Pagination";

export default function Network({type}) {
    const {userId} = useParams();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [networkType, setNetworkType] = useState(type ? type : "following");

    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 10;

    useEffect(()=>{
        fetch(`http://localhost:9090/members/${userId}/network`)
            .then(res => res.json())
            .then(data => setResult(data))
            .catch(error => console.error("Failed to fetch data", error))
            .finally(() => setLoading(false));
    }, [userId]);

    useEffect(() => {
        setCurrentPage(1);
    }, [networkType])

    if (loading) return <p>Loading...</p>
    
    let memberList;
    let msg = null;

    if (networkType === "following") {
        memberList = result.following;
        if (result.followingCount === 0) {
            msg = "No following members";
        }
    } else {
        memberList = result.followers;
        if (result.followersCount === 0) {
            msg = "No followers";
        }
    }

    /* PAGINATE */
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = memberList.slice(indexOfFirstMember, indexOfLastMember);

    return (
        <div className={styles.network}>
            <ProfileSummary/>
            <TabMenu/>
            
            <div className={styles.tabs}>
                <button onClick={() => setNetworkType("following")} className={`${networkType === "following" ? styles.active : ""}`}>
                    FOLLOWING
                </button>
                <button onClick={() => setNetworkType("followers")} className={`${networkType === "followers" ? styles.active : ""}`}>
                    FOLLOWERS
                </button>
            </div>
            <ul className={styles.memberList}>
                {msg && (<p>{msg}</p>)}
                {currentMembers.map(profile => (
                    <li key={profile.id}>
                        <div className={styles.profileSummary}>
                            <div className={styles.profileLeft}>
                                <div className={styles.profileImage}>
                                    <img
                                        src={profile.profileImage ? profile.profileImage : defaultProfile}
                                        alt="profile"
                                        className={styles.profileImg}
                                    />
                                </div>
                                <div className={styles.profileInfo}>
                                    <div className={styles.nicknameRow}>
                                        <a href={`/${profile.id}`} className={styles.hyperlink}>
                                            <h2 className={styles.nickname}>{profile.nickname}</h2>
                                        </a>
                                    </div>
                                    <p className={styles.count}>
                                        {profile.userFollowersCount} {profile.userFollowersCount === 1 ? "follower" : "followers"},&nbsp;
                                        following {profile.userFollowingCount}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.profileStats}>
                                <div className={styles.statBlock}>
                                    <a href={`/${profile.id}/bookshelf`} className={styles.hyperlink}>
                                        <span className={styles.statNumber}>
                                            <img src={eyeIcon} className={styles.icon}/>
                                            {profile.totalBooksReadCount}
                                        </span>
                                    </a>
                                </div>
                                <div className={styles.statBlock}>
                                    <a href={`/${profile.id}/reviews`} className={styles.hyperlink}>
                                        <span className={styles.statNumber}>
                                            <img src={reviewIcon} className={styles.icon}/>
                                            {profile.userReviewsCount}
                                        </span>
                                    </a>
                                </div>
                                <div className={styles.statBlock}>
                                    <a href={`/${profile.id}/collections`} className={styles.hyperlink}>
                                        <span className={styles.statNumber}>
                                            <img src={collectionIcon} className={styles.icon}/>
                                            {profile.userCollectionsCount}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination 
                currentPage = {currentPage}
                pageCount = {Math.ceil(memberList.length / membersPerPage)}
                onPageChange = {(page) => setCurrentPage(page)}
            />
        </div>
    );
}