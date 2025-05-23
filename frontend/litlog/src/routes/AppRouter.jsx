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
import EditCollection from '../pages/Collections/EditCollection';

import ReadersMain from '../pages/Readers/ReadersMain'; 
import SearchReaders from '../pages/Readers/SearchReaders';

import Profile from '../pages/Mypage/Profile';
import Network from '../pages/Mypage/Network';
import Bookshelf from '../pages/Mypage/Bookshelf';
import ReviewTimeline from '../pages/Mypage/ReviewTimeline';
import ReviewList from '../pages/Mypage/ReviewList';
import ReviewDetail from '../pages/Mypage/ReviewDetail';
import CreatedCollection from '../pages/Mypage/CreatedCollection';
import LikedCollection from '../pages/Mypage/LikedCollection';
import Activity from '../pages/Mypage/Activity';

import EditProfile from '../pages/Settings/EditProfile';
import Withdraw from '../pages/Settings/Withdraw';

import MemberManage from '../pages/Admin/MemberManage';
import ReviewManage from '../pages/Admin/ReviewManage';
import CommentManage from '../pages/Admin/CommentManage';

import About from '../pages/Footer/About';
import Terms from '../pages/Footer/Terms';
import PrivacyPolicy from '../pages/Footer/PrivacyPolicy';
import Credits from '../pages/Footer/Credits';

import NotFound from '../pages/NotFound/NotFound'; 

import AdminRoute from './AdminRoute';

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
            <Route path="/collections/:collectionId/edit" element={<EditCollection />} />

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
            <Route path="/:userId/collections/created" element={<CreatedCollection />} />
            <Route path="/:userId/collections/liked" element={<LikedCollection />} />
            <Route path="/:userId/activity" element={<Activity/>}/>
    
            {/* Setting */}
            <Route path="/settings" element={<EditProfile />} />
            <Route path="/withdraw" element={<Withdraw />} />
    
            {/* Admin */}
            <Route path="/admin" element={<MemberManage />} />
            <Route path="/admin/reviews" element={<ReviewManage />} />
            <Route path="/admin/comments" element={<CommentManage />} />

            {/* Footer Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/credits" element={<Credits />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;