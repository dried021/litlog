import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSlider from "../../components/Book/BookSlider/BookSlider";
import SearchBar from '../../components/SearchBar/SearchBar';

const BookMain = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    // const [popularBookList, setPopularBookList] = useState([]);
    // const [justReviewedBookList, setJustReviewedBookList] = useState([]);

    // useEffect(()=>{
        

    // }, [popularBookList, justReviewedBookList]);

    // 더미 데이터
    const booklist = [
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
        }
    ];

    const handleSearch = (searchKeyword) => {
        if (searchKeyword.trim()) {
            navigate(`/books/search?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };

    return (
        <div>
            <h2 className="title">Books Main Page</h2>
            <SearchBar 
                handleSearch={handleSearch} 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search books..."
            />

            <BookSlider title="Popular Books This Week" books={booklist} />
            <BookSlider title="Just Reviewed Books" books={booklist} />
        </div>
    );
};

export default BookMain;
