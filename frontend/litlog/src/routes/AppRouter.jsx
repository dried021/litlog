// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import FindId from '../pages/Auth/FindId';
import FindPassword from '../pages/Auth/FindPassword';

import BookMain from '../pages/Books/BookMain';
import BookSearch from '../pages/Books/SearchResult';
import BookDetail from '../pages/Books/BookDetail';

import CollectionMain from '../pages/Collections/CollectionMain';
import CollectionPopularList from '../pages/Collections/CollectionPopularList';
import CollectionDetail from '../pages/Collections/CollectionDetail';
import NewCollection from '../pages/Collections/NewCollection';

import ReadersMain from '../pages/Readers/ReadersMain'; 
import SearchReaders from '../pages/Readers/SearchReaders';

import Profile from '../pages/Mypage/Profile';
import Network from '../pages/Mypage/Network';
import Bookshelf from '../pages/Mypage/Bookshelf';
import ReviewTimeline from '../pages/Mypage/ReviewTimeline';
import ReviewList from '../pages/Mypage/ReviewList';
import ReviewDetail from '../pages/Mypage/ReviewDetail';
import CollectionList from '../pages/Mypage/CollectionList';

import EditProfile from '../pages/Settings/EditProfile';
import Withdraw from '../pages/Settings/Withdraw';
import WithdrawResult from '../pages/Settings/WithdrawResult';

import AdminMain from '../pages/Admin/AdminMain';
import MemberManage from '../pages/Admin/MemberManage';
import ReviewManage from '../pages/Admin/ReviewManage';
import CommentManage from '../pages/Admin/CommentManage';

import Test from '../pages/Test/Test';

import NotFound from '../pages/NotFound/NotFound'; 

const AppRouter = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-password" element={<FindPassword />} />
    
            {/* Books */}
            <Route path="/books" element={<BookMain />} />
            <Route path="/books/search" element={<BookSearch />} />
            <Route path="/books/:bookId" element={<BookDetail />} />
    
            {/* Collections */}
            <Route path="/collections" element={<CollectionMain />} />
            <Route path="/collections/list" element={<CollectionPopularList />} />
            <Route path="/collections/new" element={<NewCollection />} />
            <Route path="/collections/:collectionId" element={<CollectionDetail />} />

            {/* Readers */}
            <Route path="/readers" element={<ReadersMain />} />
            <Route path="/readers/search" element={<SearchReaders/>}/>
    
            {/* Mypage */}
            <Route path="/:userId" element={<Profile />} />
            <Route path="/:userId/bookshelf" element={<Bookshelf />} />
            <Route path="/:userId/following" element={<Network type="following"/>} />
            <Route path="/:userId/followers" element={<Network type="followers"/>} />
            <Route path="/:userId/reviews/timeline/:year?" element={<ReviewTimeline />} />
            <Route path="/:userId/reviews/list/:year?" element={<ReviewList />} />
            <Route path="/:userId/reviews/detail/:reviewId" element={<ReviewDetail />} />
            <Route path="/:userId/collections" element={<CollectionList />} />
    
            {/* Setting */}
            <Route path="/settings" element={<EditProfile />} />
            <Route path="/withdraw" element={<Withdraw />} />
            {/* POST 결과 페이지 URL도 GET으로 접속 가능하게 */}
            <Route path="/withdraw-result" element={<WithdrawResult />} /> 
    
            {/* Admin */}
            <Route path="/admin" element={<AdminMain />} />
            <Route path="/admin/members" element={<MemberManage />} />
            <Route path="/admin/contents/reviews" element={<ReviewManage />} />
            <Route path="/admin/contents/comment" element={<CommentManage />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

            {/* spring 테스트용 */}
            <Route path="/test" element={<Test/>}/>
        </Routes>
    );
};

export default AppRouter;