import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styles from './ProfileSummary.module.css';
import defaultProfile from '../../assets/default_profile.png';
import { UserContext } from "../../libs/UserContext";

export default function ProfileSummary() {
    const {userId} = useParams(); /* owner of this profile page */
    const {user} = useContext(UserContext); /* Logged in user */
    const [profile, setProfile] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    /* Update profile  */
    const [editMode, setEditMode] = useState(false);
    const [newBio, setNewBio] = useState(profile?.bio || '');
    const [newProfileImage, setNewProfileImage] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9090/members/profile-summary/${userId}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setProfile(data);
            setIsFollowing(data.followStatus);
        }).catch(error => console.error(error));
    }, [userId]);


    const handleFollow = () => {
        fetch(`http://localhost:9090/members/${userId}/following`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(data => {
            if (data.success) setIsFollowing(true);
        }).catch(error => {
            console.error("Error following user", error);
        })
    }
    const handleUnfollow = () => {
        fetch(`http://localhost:9090/members/${userId}/following`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
        .then(data => {
            if (data.success) setIsFollowing(false);
        }).catch(error => {
            console.error("Error unfollowing user", error);
        })
    }

    const handleProfileUpdate = () => {
        const formData = new FormData();
        formData.append("bio", newBio);
        if (newProfileImage) {
            formData.append("profileImage", newProfileImage);
        }

        fetch(`http://localhost:9090/members/${userId}/profile`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to update profile");
            return res.json();
        })
        .then(data => {
            setProfile(prev => ({
                ...prev,
                bio: newBio,
                profileImage: data.profileImage // if returned
            }));
            setShowEditModal(false);
        })
        .catch(err => console.error("Error updating profile:", err));
    };


    if (!profile) return <div>Loading...</div>

    return(
        <>
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
                            {(user === userId) && 
                                <button className={styles.editButton} onClick={() => setEditMode(true)}>
                                    EDIT PROFILE
                                </button>
                            }
                            {(user && !isFollowing && user !== userId) && 
                                <button className={styles.editButton} onClick={handleFollow}>
                                    FOLLOW
                                </button>
                            }
                            {(user && isFollowing) && 
                                <button className={styles.editButton} onClick={handleUnfollow}>
                                    UNFOLLOW
                                </button>
                            }
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
                        <a href={`/${userId}/reviews/timeline`} className={styles.hyperlink}>
                            <span className={styles.statNumber}>{profile.annualBooksReadCount}</span>
                        </a>
                        <a href={`/${userId}/reviews/timeline`} className={styles.hyperlink}>
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
            {editMode && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Edit Profile</h3>
                        
                        <label>
                            Profile Picture:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewProfileImage(e.target.files[0])}
                            />
                        </label>

                        <label>
                            Bio:
                            <textarea
                                value={newBio}
                                onChange={(e) => setNewBio(e.target.value)}
                                rows="4"
                                style={{ width: "100%" }}
                            />
                        </label>

                        <div className={styles.modalButtons}>
                            <button onClick={handleProfileUpdate}>Save</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}