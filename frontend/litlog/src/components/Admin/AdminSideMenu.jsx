import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminSideMenu.module.css';
import { FaUsers, FaCommentDots, FaStar, FaHome } from 'react-icons/fa';

const AdminSideMenu = () => {
  return (
    <div className={styles.menuContainer}>
      <nav className={styles.menu}>
        <NavLink to="/admin" className={styles.menuItem}>
          <FaHome className={styles.icon} />
          Admin Dashboard
        </NavLink>

        <NavLink to="/admin/members" className={styles.menuItem}>
          <FaUsers className={styles.icon} />
          Manage Members
        </NavLink>

        <NavLink to="/admin/contents/reviews" className={styles.menuItem}>
          <FaStar className={styles.icon} />
          Manage Reviews
        </NavLink>

        <NavLink to="/admin/contents/comment" className={styles.menuItem}>
          <FaCommentDots className={styles.icon} />
          Manage Comments
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSideMenu;
