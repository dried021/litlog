import React from 'react';
import ProfileSummary from '../../components/Profile/ProfileSummary';
import TabMenu from '../../components/Mypage/TabMenu';
import FavoriteBooks from '../../components/Profile/FavoriteBooks';
import RecentBooks from '../../components/Profile/RecentBooks';
import RecentReviews from '../../components/Profile/RecentReviews';
import PopularReviews from '../../components/Profile/PopularReviews';
import BookStack from '../../components/Profile/BookStack';
import styles from './Profile.module.css';

const Profile = () => {
    
    return(
        <div className={styles.profile}>
            <ProfileSummary/>
            <TabMenu/>
            <div className={styles.left}>
                <FavoriteBooks/>
                <RecentBooks/>
                <RecentReviews/>
                <PopularReviews/>
            </div>
            <div className={styles.right}>
                <BookStack/>
            </div>
        </div>
    );
};

export default Profile;