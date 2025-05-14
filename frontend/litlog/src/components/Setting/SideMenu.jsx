import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { FaUserEdit, FaTrashAlt, FaUserShield } from 'react-icons/fa';

const SideMenu = ({ isAdmin }) => {
  return (
    <div className={styles.menuContainer}>
      <nav className={styles.menu}>
        <NavLink to="/settings" className={styles.menuItem}>
          <FaUserEdit className={styles.icon} />
          Update My Info
        </NavLink>
        
        <NavLink to="/withdraw" className={styles.menuItem}>
          <FaTrashAlt className={styles.icon} />
          Delete Account
        </NavLink>

        {isAdmin && (
          <NavLink to="/admin" className={styles.menuItem}>
            <FaUserShield className={styles.icon} />
            Admin Page
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default SideMenu;
