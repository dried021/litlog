import React from 'react';
import BookSearch from "../../components/Book/BookSearch/BookSearch";
import BookSlider from "../../components/Book/BookSlider/BookSlider";

const BookMain = () => {

    //테스트용
    const books = [
        {
        id: 1,
        title: 'THUNDERBOLTS',
        image: '/images/cat.jpg',
        link: '/books/thunderbolts',
        views: '473K',
        likes: '118K',
        hearts: '205K',
        },
        {
        id: 2,
        title: 'SINNERS',
        image: '/images/cat.jpg',
        link: '/books/sinners',
        views: '994K',
        likes: '169K',
        hearts: '468K',
        },
        {
        id: 3,
        title: 'CONCLAVE',
        image: '/images/cat.jpg',
        link: '/books/conclave',
        views: '1.5M',
        likes: '241K',
        hearts: '498K',
        },
        {
        id: 4,
        title: 'ANOTHER SIMPLE FAVOR',
        image: '/images/cat.jpg',
        link: '/books/another',
        views: '67K',
        likes: '9.2K',
        hearts: '9.4K',
        },
        // 필요한 만큼 추가 가능
    ];

    return(
        <div>
            <h2> Books 메인 페이지 </h2>
            <BookSearch/>
            <BookSlider title="Popular Books This Week" books={books} />
            <BookSlider title="Just Reviewed Books" books={books} />
        </div>
    );
};

export default BookMain;