import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './ProfileSummary.module.css';
import defaultProfile from '../../assets/default_profile.png';


export default function ProfileSummary() {
    const {userId} = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9090/members/profile-summary/${userId}`) // port 9090
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(error => console.error(error));
    }, [userId]);

    if (!profile) return <div>Loading...</div>

    return(
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
                        <a href={`/${userId}`} className={styles.hyperlink}>
                            <h2 className={styles.nickname}>{profile.nickname}</h2>
                        </a>
                        <button className={styles.editButton}>EDIT PROFILE</button>
                    </div>
                    <p className={styles.bio}>{profile.bio}</p>
                    
                </div>
                
            </div>
            <div className={styles.profileStats}>
                <div className={styles.statBlock}>
                    <a href={`/${userId}/bookshelf`} className={styles.hyperlink}>
                        <span className={styles.statNumber}>{profile.totalBooksReadCount}</span>
                    </a>
                    <a href={`/${userId}/bookshelf`} className={styles.hyperlink}>
                        <span className={styles.statLabel}>BOOKS</span>
                    </a>
                </div>
                <div className={styles.statBlock}>
                    <a href={`/${userId}/reviews`} className={styles.hyperlink}>
                        <span className={styles.statNumber}>{profile.annualBooksReadCount}</span>
                    </a>
                    <a href={`/${userId}/reviews`} className={styles.hyperlink}>
                        <span className={styles.statLabel}>THIS YEAR</span>
                    </a>
                </div>
                <div className={styles.statBlock}>
                    <a href={`/${userId}/following`} className={styles.hyperlink}>
                        <span className={styles.statNumber}>{profile.userFollowingCount}</span>
                    </a>
                    <a href={`/${userId}/following`} className={styles.hyperlink}>
                        <span className={styles.statLabel}>FOLLOWING</span>
                    </a>
                </div>
                <div className={styles.statBlock}>
                    <a href={`/${userId}/followers`} className={styles.hyperlink}>
                        <span className={styles.statNumber}>{profile.userFollowersCount}</span>
                    </a>
                    <a href={`/${userId}/followers`} className={styles.hyperlink}>
                        <span className={styles.statLabel}>FOLLOWERS</span>
                    </a>
                </div>
            </div>
        </div>
    );
}