import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../styles/profileSummary.css';
import defaultProfile from './default_profile.png';


export default function ProfileSummary() {
    const {userId} = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // fetch(`/members/profile-summary/${userId}`) // actual URL
        // fetch(`http://localhost:9090/members/profile-summary/${userId}`) // port 9090
        fetch(`https://ee6f455d-9dd2-463d-9e5f-2752da892af8.mock.pstmn.io/members/bbb`) // mock server
        // fetch(`http://localhost:9090/members/profile-summary/${userId}`)
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(error => console.error(error));
    }, [userId]);

    if (!profile) return <div>Loading...</div>

    return(
        <div className="profile-summary">
            <div className="profile-left">
                <div className="profile-image">
                    <img 
                        src={profile.profileImage ? profile.profileImage : defaultProfile}
                        alt="profile"
                        className="profile-img"
                    />
                </div>
                <div className="profile-info">
                    <div className="nickname-row">
                        <h2 className="nickname">{profile.nickname}</h2>
                        <button className="edit-button">EDIT PROFILE</button>
                    </div>
                    <p className="bio">{profile.bio}</p>
                    
                </div>
                
            </div>
            <div className="profile-stats">
                <div className="stat-block">
                    <span className="stat-number">{profile.totalBooksReadCount}</span>
                    <span className="stat-label">BOOKS</span>
                </div>
                <div className="stat-block">
                    <span className="stat-number">{profile.annualBooksReadCount}</span>
                    <span className="stat-label">THIS YEAR</span>
                </div>
                <div className="stat-block">
                    <span className="stat-number">{profile.userFollowingCount}</span>
                    <span className="stat-label">FOLLOWING</span>
                </div>
                <div className="stat-block">
                    <span className="stat-number">{profile.userFollowersCount}</span>
                    <span className="stat-label">FOLLOWERS</span>
                </div>
            </div>
        </div>
    );
}