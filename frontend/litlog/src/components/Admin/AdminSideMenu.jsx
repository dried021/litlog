import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminSideMenu.module.css';

const AdminSideMenu = () => {
  return (
    <div className={styles.menuContainer}>
      <nav className={styles.menu}>
        <NavLink to="/admin" className={styles.menuItem}>
          <img src="/icons/sidebar_user.svg" className={styles.menuItem}/>
          Manage Members
        </NavLink>

        <NavLink to="/admin/reviews" className={styles.menuItem}>
        <img src="/icons/sidebar_menu.svg" className={styles.menuItem}/>
          Manage Reviews
        </NavLink>

        <NavLink to="/admin/comments" className={styles.menuItem}>
        <img src="/icons/sidebar_comment.svg" className={styles.menuItem}/>
          Manage Collections &Comments
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSideMenu;
