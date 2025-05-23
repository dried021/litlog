import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './ProfileDropdown.module.css';

const ProfileDropdown = ({ userId, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isInMyPage = location.pathname.startsWith(`/${userId}`);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button onClick={handleToggle} className={`${styles.trigger} ${open ? styles.triggerOpen : ''} ${isInMyPage ? styles.active : ''}`}>
        <span className={styles.nickname}>{userId}</span>
        <span className={styles.dropdown}>▼</span>
      </button>

      {open && (
        <div className={styles.menu}>
          <Link to={`/${userId}`}>Profile</Link>
          <Link to={`/${userId}/bookshelf`}>Bookshelf</Link>
          <Link to={`/${userId}/reviews/list`}>My Reviews</Link>
          <Link to={`/${userId}/collections/created`}>My Collections</Link>
          <Link to={`/${userId}/activity`}>Activity</Link>
          <div className={styles.divider} />
          <Link to="/settings">Settings</Link>
          <button onClick={onLogout} className={styles.logout}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
