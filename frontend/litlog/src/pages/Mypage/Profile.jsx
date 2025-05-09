import React from 'react';
import ProfileSummary from '../../components/Profile/ProfileSummary';
import TabMenu from '../../components/Mypage/TabMenu';
import FavoriteBooks from '../../components/Profile/FavoriteBooks';
import RecentBooks from '../../components/Profile/RecentBooks';

const Profile = () => {
    
    return(
        <div>
            <ProfileSummary/>
            <TabMenu/>
            <FavoriteBooks/>
            <RecentBooks/>
        </div>
    );
};

export default Profile;