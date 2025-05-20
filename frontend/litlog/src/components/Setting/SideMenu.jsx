import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { FaUserEdit, FaTrashAlt, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '../../libs/useLogout';

const SideMenu = ({ isAdmin, activeMenu }) => {
  const logout = useLogout(); 
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

      </nav>
      <div className={styles.bottomMenu}>
          <button className={`${styles.logoutButton}`} onClick={() => logout('/')}>
            <FaSignOutAlt className={styles.icon} />
            Sign Out
          </button>
        </div>

    </div>
  );
};

export default SideMenu;
