import React from 'react';
import { useParams } from 'react-router-dom';
import TabMenu from '../../components/Mypage/TabMenu';

const CollectionList = () => {
    const { userId } = useParams();

    return (
        <div>
            <TabMenu userId={userId} />
            <h2>마이 페이지 - 컬렉션</h2>
        </div>
    );
};

export default CollectionList;
