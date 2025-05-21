import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './SearchReaders.module.css';
import UserList from '../../components/Ranking/UserList/UserList';
import Pagination from "../../components/Pagination/Pagination";


const SearchReaders = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isRelevance, setIsRelevance] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const isFirstLoad = useRef(true);

    const userPerPage = 10;

    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('keyword')  || '';

    useEffect(()=>{
        if (isFirstLoad.current && searchParam){
            isFirstLoad.current = false;
            setKeyword(searchParam);
            handleSearch(searchParam, 1, isRelevance)
        }else{
            setKeyword(searchParam);
            handleSearch(searchParam, currentPage, isRelevance)
        }
    }, [searchParam, currentPage, isRelevance])

    const handleSearch = async(searchKeyword, currentPage, isRelevance) => {
        const trimmedKeyword = searchKeyword.trim();
        if(trimmedKeyword){
            setLoading(true);
        }
        try{
            const response = await axios.get(`http://localhost:9090/readers/search`, {
                params: {
                    keyword: trimmedKeyword,
                    currentPage: currentPage,
                    isRelevance: !!isRelevance,
                }
            });
            const {users, usersCount} = response.data;
            setUsers(users || []);
            setUsersCount(usersCount || 0);

            if (usersCount === 0){
            }
            
        }catch(error){
            console.error("Fail to fetch users", error);
            setUsers([]);
            setUsersCount(0);
        }finally{
            setTimeout(()=>{
                setLoading(false);
            }, 500);
        }
    };

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const handleOptionClick = (option) => {
        setIsRelevance(option === "relevance");
        setCurrentPage(1);
    };

    const handleItemClick = (id) => {
        navigate(`/${id}`);
    };

    return (
        <div className={styles.searchResults}>
            <SearchBar 
                handleSearch={(searchKeyword)=>{
                    if (searchKeyword.trim()) {
                        navigate(`/readers/search?keyword=${encodeURIComponent(searchKeyword)}`);
                        handleSearch(searchKeyword.trim(), 1);
                    }
                }} 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search Readers..."
            />

            <div className={styles['search-result']}>
                {loading ? (
                    <p className="search">Loading...</p>
                ):users.length > 0? (
                    <>
                        <div className={styles['option-container']}>
                            <div className={styles['leftContainer']}>
                            <p className={styles.searchResultP}>
                                Search results for <span className={styles.bold}>"{searchParam}"</span>. A total of {usersCount} users were found.
                            </p>
                            </div>

                            <div className={styles['rightContainer']}>
                                <p 
                                className={`${styles['option']} ${isRelevance ? styles['optionActive'] : ""}`} 
                                onClick={() => handleOptionClick("relevance")}
                                >
                                Relevance
                                </p>
                                <p 
                                className={`${styles['option']} ${!isRelevance ? styles['optionActive'] : ""}`} 
                                onClick={() => handleOptionClick("popularity")}
                                >
                                Popularity
                                </p>
                            </div>
                        </div>
                        
                        <div className={styles['user-list-wrapper']}>
                            <UserList users={users} onItemClick = {handleItemClick} isRank = {false} currentPage={currentPage}/>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            pageCount={Math.ceil(usersCount / userPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    keyword && <p className={styles['search']}>No search results found.</p>
                )}
            </div>
        </div>
    );
};
export default SearchReaders;