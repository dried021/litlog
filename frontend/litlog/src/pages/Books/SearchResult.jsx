import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/Book/BookList/BookList';
import Pagination from '../../components/Pagination/Pagination';
import { Row, Col } from 'react-bootstrap';

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
    const pageNum = parseInt(queryParams.get('pageNum')) || 1;
    const searchParam = queryParams.get('keyword') || '';

    let count = 1;

    useEffect(() => {
        if (isFirstLoad.current && searchParam) {
            isFirstLoad.current = false;
            setKeyword(searchParam);
            handleSearch(searchParam);
        }
    }, [pageNum, searchParam]);

    const handleOptionClick = (option) => {
        setIsRelevance(option === "relevance");
    };

    const handleSearch = async (searchKeyword, pageNum) => {
        const trimmedKeyword = searchKeyword.trim();
        if (trimmedKeyword) {
            navigate(`/books/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
            setLoading(true);

            try {
                const response = await axios.get(`http://localhost:9090/books/search`, {
                    params: { keyword: trimmedKeyword, pageNum },
                });
                setBooks(response.data.items || []);
                console.log(response.data);
                if (books.length < 1) count = 0;
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
                    <BookList books={books}/>
                ) : (
                    keyword && <p className="search">No search results found.</p>
                )}
            </div>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Pagination
                        currentPage={pageNum}
                        onPageChange={(newPageNum) => {
                            handleSearch(keyword, newPageNum);
                            navigate(`/books/search?keyword=${encodeURIComponent(keyword)}&pageNum=${newPageNum}`);
                        }}
                        count={count}
                    />
            </Col>
            </Row>
        </div>
    );
};

export default SearchResult;
