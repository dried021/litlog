import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/Book/BookList/BookList';
import ViewMoreButton from '../../components/Button/ViewMoreButton';
import TopButton from '../../components/Button/TopButton';
import { Row, Col } from 'react-bootstrap';
import './Book.css';


const SearchResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [loadedItems, setLoadedItems] = useState(0);
    const isFirstLoad = useRef(true);

    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('keyword') || '';

    const itemsPerPage = 10;

    useEffect(() => {
        if (isFirstLoad.current && searchParam) {
            isFirstLoad.current = false;
            setKeyword(searchParam);
            handleSearch(searchParam, 0);
        }
    }, [searchParam]);

    const handleSearch = async (searchKeyword, startIndex) => {
        const trimmedKeyword = searchKeyword.trim();
        if (trimmedKeyword) {
            setLoading(true);

            try {
                const response = await axios.get(`http://localhost:9090/books/search`, {
                    params: {
                        keyword: trimmedKeyword,
                        startIndex: startIndex,
                        maxResults: itemsPerPage,
                    },
                });

                const { items, totalItems } = response.data;

                if (startIndex === 0) {
                    setBooks(items || []);
                } else {
                    setBooks((prevBooks) => [...prevBooks, ...(items || [])]);
                }

                setTotalItems(totalItems || 0);
                setLoadedItems(startIndex + itemsPerPage);

                if (!items){
                    alert("Last page.");
                    shouldReload.current = true;
                    navigate(-1);
                }

            } catch (error) {
                console.error("Fail to search:", error);
                if (startIndex === 0) {
                    setBooks([]);
                }
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }
    };

    const handleLoadMore = () => {
        handleSearch(keyword, loadedItems);
    };

    const handleItemClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };
    
    return (
        <div>
            <h2 className="title">Search Result</h2>

            <SearchBar 
                handleSearch={(searchKeyword)=>{
                    if (searchKeyword.trim()) {
                        navigate(`/books/search?keyword=${encodeURIComponent(searchKeyword)}`);
                        setLoadedItems(0);
                        handleSearch(searchKeyword.trim(), 0);
                    }
                }} 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search Books..."
            />

            <div className="search-result">
                {loading && loadedItems === 0 ? (
                    <p className="search">Loading...</p>
                ) : books.length > 0 ? (
                    <BookList books={books} onItemClick={handleItemClick}/>
                ) : (
                    keyword && <p className="search">No search results found.</p>
                )}
            </div>

            <Row>
                <Col className="d-flex justify-content-center">
                    {(loadedItems < totalItems && !loading)&& (
                        <div>
                            <ViewMoreButton handleLoadMore={handleLoadMore}/>
                            <TopButton />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};
export default SearchResult;
