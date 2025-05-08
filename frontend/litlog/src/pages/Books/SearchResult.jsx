import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/Book/BookList/BookList';
import './Book.css';

const SearchResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRelevance, setIsRelevance] = useState(true);
    const isFirstLoad = useRef(true); 

    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('keyword') || '';

    useEffect(() => {
        if (isFirstLoad.current && searchParam) {
            isFirstLoad.current = false;
            setKeyword(searchParam);
            handleSearch(searchParam);
        }
    }, [searchParam]);

    const handleOptionClick = (option) => {
        setIsRelevance(option === "relevance");
    };

    const handleSearch = async (searchKeyword) => {
        const trimmedKeyword = searchKeyword.trim();
        if (trimmedKeyword) {
            navigate(`/books/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
            setLoading(true);

            try {
                const response = await axios.get(`http://localhost:9090/books/search`, {
                    params: { keyword: trimmedKeyword },
                });
                setBooks(response.data.items || []);
            } catch (error) {
                console.error("fail to search : ", error);
                setBooks([]);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }
    };

    const handleClick = () => {

    };

    return (
        <div>
            <h2 className="title">Search Result</h2>

            <div className="options-container">
                <p 
                    className={`option ${isRelevance ? "active" : ""}`} 
                    onClick={() => handleOptionClick("relevance")}
                >
                    relevance
                </p>
                <p 
                    className={`option ${!isRelevance ? "active" : ""}`} 
                    onClick={() => handleOptionClick("newest")}
                >
                    newest
                </p>
            </div>
            
            <SearchBar 
                handleSearch={handleSearch} 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search books..."
            />

            <div className="search-result">
                {loading ? (
                    <p className="search">searching...</p>
                ) : books.length > 0 ? (
                    books.map((book) => (
                        <>
                        <BookList key={book.id} book={book}/>
                        </>
                    ))
                ) : (
                    keyword && <p className="search">No search results found.</p>
                )}
            </div>
        </div>
    );
};



export default SearchResult;
