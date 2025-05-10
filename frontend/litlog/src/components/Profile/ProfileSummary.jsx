import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './ProfileSummary.module.css';
import defaultProfile from '../../assets/default_profile.png';


export default function ProfileSummary() {
    const {userId} = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // fetch(`/members/profile-summary/${userId}`) // actual URL
        fetch(`http://localhost:9090/members/profile-summary/${userId}`) // port 9090
        //fetch(`https://ee6f455d-9dd2-463d-9e5f-2752da892af8.mock.pstmn.io/members/bbb`) // mock server
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
                        <h2 className={styles.nickname}>{profile.nickname}</h2>
                        <button className={styles.editButton}>EDIT PROFILE</button>
                    </div>
                    <p className={styles.bio}>{profile.bio}</p>
                    
                </div>
                
            </div>
            <div className={styles.profileStats}>
                <div className={styles.statBlock}>
                    <span className={styles.statNumber}>{profile.totalBooksReadCount}</span>
                    <span className={styles.statLabel}>BOOKS</span>
                </div>
                <div className={styles.statBlock}>
                    <span className={styles.statNumber}>{profile.annualBooksReadCount}</span>
                    <span className={styles.statLabel}>THIS YEAR</span>
                </div>
                <div className={styles.statBlock}>
                    <span className={styles.statNumber}>{profile.userFollowingCount}</span>
                    <span className={styles.statLabel}>FOLLOWING</span>
                </div>
                <div className={styles.statBlock}>
                    <span className={styles.statNumber}>{profile.userFollowersCount}</span>
                    <span className={styles.statLabel}>FOLLOWERS</span>
                </div>
            </div>
        </div>
    );
}