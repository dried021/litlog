import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import styles from './ManageUser.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SortOptionButton from './SortOptionButton';
import SwitchButton from '../Button/SwitchButton';

function ManageUser() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('pageNum')) || 1);
  const [pageCount, setPageCount] = useState(1);
  const [searchName, setSearchName] = useState(searchParams.get('searchName') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('searchName') || '');
  const [totalCount, setTotalCount] = useState(0);
  const [sortOption, setSortOption] = useState(1);
  //1이 관련성 2가 신규순 3이 옛날 유저 순

  const navigate = useNavigate();
  const userPerPage = 10;

  useEffect(() => {
    fetchUsers(currentPage, sortOption);
  }, [currentPage, searchName, sortOption]);

  const fetchUsers = async (page, sortOption) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin`, {
        params: { pageNum: page, searchName, sortOption },
      });
      setUsers(response.data.users || []);
      setPageCount(response.data.pageCount || 1);
      setTotalCount(response.data.totalCount || 0);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    navigate(`/admin?pageNum=${pageNum}&searchName=${encodeURIComponent(searchName)}`);
  };


  return (
    <div className={styles.userSection}>
      <SearchBar 
        className={styles.adminSearchBar}
        handleSearch={(searchKeyword)=>{
            const trimmed = searchKeyword.trim();
            if (!trimmed) {
              setSearchName(trimmed);
              setCurrentPage(1);
              navigate(`/admin`);
            }else{
              setSearchName(trimmed);
              setCurrentPage(1);
              navigate(`/admin?pageNum=1&searchName=${encodeURIComponent(trimmed)}`);
            }
        }} 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)} 
        placeholder="Search Users..."
          />

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          {users.length > 0 ? (
            <>
            <div className={styles['option-container']}>
                <div className={styles['leftContainer']}>
                  {searchName ? (
                    <p className={styles.searchResultP}>
                      Search results for <span className={styles.bold}>"{searchName}"</span>. A total of {totalCount} users were found.
                    </p>
                  ) : (
                    <p className={styles.searchResultP}>
                      Total:  {totalCount} users
                    </p>
                  )}
                
                </div>

                <div className={styles['rightContainer']}>
                    <SortOptionButton onSortChange={(option) => {setSortOption(option); setCurrentPage(1)}}/>
                </div>
            </div>



              <div className={styles.userList}>
                {users.map((user, index) => {
                  const displayIndex = index + (currentPage - 1) * userPerPage;
                  return (
                    <div key={`${user.id}-${displayIndex}`} className={styles.userItem}>
                      <div className={styles.userRank}>
                        <p className={styles.userRankP}>{displayIndex + 1}</p>
                      </div>
                      <div className={styles.userInfo}>
                        <h3 className={styles.userId}>
                          {user.nickname} <span className={styles.userIdGray}>({user.name} / {user.id})</span>
                        </h3>
                        <div className={styles.userInfo2}>
                          <p>{user.tel}</p>
                          <p>{user.email}</p>
                        </div>
                        <div className={styles.userStatusRow}>
                          <p>Type: {user.userType === 1 ? 'ADMIN' : 'USER'}</p>
                          <p>Status: {user.userStatus === 1 ? 'ACTIVE' : (
                              user.userStatus === 2 ? 'BANNED' :'WITHDRAWN')}</p>
                        </div>
                        
                        <div className={styles.userStats}>
                          <div className={styles.statItem} onClick={()=>{}}>
                            <img className={styles.icon} src="/icons/bookshelf.svg" alt="reviews" />
                            <p className={styles.stat}>{user.reviews ?? 0}</p>
                          </div>
                          <div className={styles.statItem}>
                            <img className={styles.icon} src="/icons/collections.svg" alt="collections" />
                            <p className={styles.stat}>{user.collections ?? 0}</p>
                          </div>
                          <div className={styles.statItem}>
                            <img className={styles.icon} src="/icons/collections.svg" alt="comments" />
                            <p className={styles.stat}>{user.comments ?? 0}</p>
                          </div>
                        </div>

                        

                      </div>
                      <div className={styles.userProfile}>
                        <img
                          className={styles.userProfileImg}
                          src={user.profile || "/icons/profile.svg"}
                          alt="profile"
                        />
                        <div className={styles.userToggleRow}>
                          <SwitchButton
                            userId = {user.id}
                            buttonType="userType"
                            currentOption={user.userType}
                            onOptionChange={(newType) => {
                              const updatedUsers = users.map(u =>
                                u.id === user.id ? { ...u, userType: newType } : u
                              );
                              setUsers(updatedUsers);
                            }}/>
                        </div>

                        <div className={styles.userToggleRow}>
                          <SwitchButton
                            userId = {user.id}
                            buttonType="userStatus"
                            currentOption={user.userStatus}
                            onOptionChange={(newStatus) => {
                              newStatus === 3 && navigate(`/admin`);
                              const updatedUsers = users.map(u =>
                                u.id === user.id ? { ...u, userStatus: newStatus } : u
                              );
                              setUsers(updatedUsers);
                            }}/>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className={styles.noData}>No registered users found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default ManageUser;
