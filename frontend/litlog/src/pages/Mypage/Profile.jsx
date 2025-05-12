import React from 'react';
import ProfileSummary from '../../components/Profile/ProfileSummary';
import TabMenu from '../../components/Mypage/TabMenu';
import FavoriteBooks from '../../components/Profile/FavoriteBooks';
import RecentBooks from '../../components/Profile/RecentBooks';
import { useRequireAuth } from '../../libs/useRequireAuth'; // 위치 조정
const Profile = () => {
    
    const user = useRequireAuth(); // 로그인 안 돼 있으면 로그인 페이지로 redirect됨

    if (!user) return null; // 또는 로딩 표시 등

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