import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import styles from './ManageUser.module.css';
import SearchBar from '../SearchBar/SearchBar';

function ManageUser() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('pageNum')) || 1);
  const [pageCount, setPageCount] = useState(1);
  const [searchName, setSearchName] = useState(searchParams.get('searchName') || '');
  const navigate = useNavigate
  const userPerPage = 10;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, searchName]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:9090/admin`, {
        params: { pageNum: page, searchName },
      });
      setUsers(response.data.users || []);
      setPageCount(response.data.pageCount || 1);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    nnavigate(`/admin?pageNum=${pageNum}&searchName=${encodeURIComponent(searchName)}`);
  };

  return (
    <div className={styles.userSection}>
      <h3 className={styles.title}>Manage Users</h3>
      <SearchBar 
        className={styles.adminSearchBar}
        handleSearch={(searchKeyword)=>{
            const trimmed = searchKeyword.trim();
            if (trimmed) {
              setSearchName(trimmed);
              setCurrentPage(1);
              navigate(`/admin?pageNum=1&searchName=${encodeURIComponent(trimmed)}`)
            }
        }} 
        value={searchName} 
        onChange={(e) => setSearchName(e.target.value)} 
        placeholder="Search Users..."
          />

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          {users.length > 0 ? (
            <>
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
                          {user.nickname}
                          <span className={styles.userIdGray}> ({user.id})</span>
                        </h3>
                        <div className={styles.userStats}>
                          <img className={styles.icon} src="/icons/bookshelf.svg" alt="reviews" />
                          <p className={styles.stat}>{user.reviews ?? 0}</p>
                          <img className={styles.icon} src="/icons/collections.svg" alt="collections" />
                          <p className={styles.stat}>{user.collections ?? 0}</p>
                        </div>
                      </div>
                      <div className={styles.userProfile}>
                        <img
                          className={styles.userProfileImg}
                          src={user.profile || "/icons/profile.svg"}
                          alt="profile"
                        />
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
