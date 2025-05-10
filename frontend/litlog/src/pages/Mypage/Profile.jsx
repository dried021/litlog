import React from 'react';
import ProfileSummary from '../../components/Profile/ProfileSummary';
import TabMenu from '../../components/Mypage/TabMenu';
import FavoriteBooks from '../../components/Profile/FavoriteBooks';
import RecentBooks from '../../components/Profile/RecentBooks';
import RecentReviews from '../../components/Profile/RecentReviews';

const Profile = () => {
    
    return(
        <div>
            <ProfileSummary/>
            <TabMenu/>
            <FavoriteBooks/>
            <RecentBooks/>
            <RecentReviews/>
        </div>
    );
};

export default Profile;