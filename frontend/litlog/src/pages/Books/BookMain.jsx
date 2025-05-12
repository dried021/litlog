import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSlider from "../../components/Book/BookSlider/BookSlider";
import SearchBar from '../../components/SearchBar/SearchBar';
import axios from "axios";

const BookMain = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [popularBookList, setPopularBookList] = useState([]);
    const [justReviewedBookList, setJustReviewedBookList] = useState([]);

    useEffect(()=>{
        getPopularBookList();
        getJustReviewedBookList();
        console.log(popularBookList);
    }, []);

    const getPopularBookList = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/books/popularBookList`);
            setPopularBookList(response.data || []);
        } catch (error) {
            console.error("Fail to load booklist:", error);
            setPopularBookList([]);
        }
    };

    const getJustReviewedBookList = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/books/justReviewedBookList`);
            setJustReviewedBookList(response.data || []);
        } catch (error) {
            console.error("Fail to load booklist:", error);
            setJustReviewedBookList([]);
        }
    };

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

            <BookSlider title="Popular Books This Week" books={popularBookList} />
            <BookSlider title="Just Reviewed Books" books={justReviewedBookList} />
        </div>
    );
};

export default BookMain;



    // 더미 데이터
    // const booklist = [
    //     {
    //         id: 1,
    //         title: 'THUNDERBOLTS',
    //         image: '/images/cat.jpg',
    //         link: '/books/thunderbolts',
    //         views: '473K',
    //         likes: '118K',
    //         hearts: '205K',
    //     },
    //     {
    //         id: 2,
    //         title: 'SINNERS',
    //         image: '/images/cat.jpg',
    //         link: '/books/sinners',
    //         views: '994K', <<bookshelf
    //         likes: '169K', << like
    //         hearts: '468K', << reviews
    //     }
    // ];
