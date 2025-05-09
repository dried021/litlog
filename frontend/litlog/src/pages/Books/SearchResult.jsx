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
    const [totalItems, setTotalItems] = useState(0);
    const isFirstLoad = useRef(true);

    const queryParams = new URLSearchParams(location.search);
    const pageNum = parseInt(queryParams.get('pageNum')) || 1;
    const searchParam = queryParams.get('keyword') || '';

    const itemsPerPage = 10;

    useEffect(() => {
        if (isFirstLoad.current && searchParam) {
            isFirstLoad.current = false;
            setKeyword(searchParam);
            handleSearch(searchParam, pageNum);
        }
    }, [pageNum, searchParam]);

    const handleOptionClick = (option) => {
        setIsRelevance(option === "relevance");
    };

    const handleSearch = async (searchKeyword, pageNum) => {
        const trimmedKeyword = searchKeyword.trim();
        if (trimmedKeyword) {
            setLoading(true);

            try {
                const response = await axios.get(`http://localhost:9090/books/search`, {
                    params: {
                        keyword: trimmedKeyword,
                        startIndex: (pageNum - 1) * itemsPerPage,
                        maxResults: itemsPerPage
                    },
                });

                const { items, totalItems } = response.data;
                setBooks(items || []);
                setTotalItems(totalItems || 0);

                console.log(totalItems);
                if (!items){
                    alert("api 호출 오류");
                    navigate(-1);
                }

            } catch (error) {
                console.error("Fail to search:", error);
                setBooks([]);
                setTotalItems(0);
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
                    Relevance
                </p>
                <p 
                    className={`option ${!isRelevance ? "active" : ""}`} 
                    onClick={() => handleOptionClick("newest")}
                >
                    Newest
                </p>
            </div>
            
            <SearchBar 
                handleSearch={(searchKeyword)=>{
                    if (searchKeyword.trim()) {
                        navigate(`/books/search?keyword=${encodeURIComponent(searchKeyword)}`);
                        handleSearch(searchKeyword.trim(), 1);
                    }
                }} 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search books..."
            />

            <div className="search-result">
                {loading ? (
                    <p className="search">Searching...</p>
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
                        pageBlock={5}
                        pageCount={Math.max(1, Math.ceil(totalItems / itemsPerPage))}
                        onPageChange={(newPageNum) => {
                            handleSearch(keyword, newPageNum);
                            navigate(`/books/search?keyword=${encodeURIComponent(keyword)}&pageNum=${newPageNum}`);
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default SearchResult;
