import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { FaUserEdit, FaTrashAlt, FaUserShield } from 'react-icons/fa';

const SideMenu = ({ isAdmin, activeMenu }) => {
  return (
    <div className={styles.menuContainer}>
      <nav className={styles.menu}>
        <NavLink to="/settings" className={`${styles.menuItem} ${activeMenu==="settings" ? styles['menuItem-active'] : ''}`} >
          <FaUserEdit className={styles.icon} />
          Update My Info
        </NavLink>
        
        {!isAdmin && (
          <NavLink to="/withdraw" className={`${styles.menuItem} ${activeMenu==="withdraw" ? styles['menuItem-active'] : ''}`} >
          <FaTrashAlt className={styles.icon} />
            Delete Account
          </NavLink>
        )}

        {isAdmin && (
          <NavLink to="/admin" className={`${styles.menuItem}`} >
            <FaUserShield className={styles.icon} />
            Admin Page
          </NavLink>
        )}

        <button className={`${styles.menuItem} ${styles.logoutButton}`} onClick={() => logout('/')}>
                Sign Out
      </button>
      </nav>

      
    </div>
  );
};

export default SideMenu;
