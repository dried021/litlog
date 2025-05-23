import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../libs/UserContext';
import { useLogout } from '../../libs/useLogout';
import styles from './Header.module.css';
import NotifSidebar from '../../components/Notification/NotifSidebar';
import ProfileDropdown from '../../components/Header/ProfileDropdown';

const Header = () => {
  const { user } = useContext(UserContext);
  const logout = useLogout();
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout('/');
  };

  return (
    <header className={styles.header}>
        <div className={styles.logo}>
          <NavLink to="/">LITLOG</NavLink>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            Books
          </NavLink>
          <NavLink
            to="/collections"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            Collections
          </NavLink>
          <NavLink
            to="/readers"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            Readers
          </NavLink>
        </nav>

        <div className={styles.authContainer}>
          {user ? (
            <>
              <img
                src="/LitLog/icons/notif.svg"
                alt="Notifications"
                className={styles.notifIcon}
                onClick={() => setShowNotif((prev) => !prev)}
              />
              {showNotif && <NotifSidebar onClose={() => setShowNotif(false)} />}
              <ProfileDropdown userId={user} onLogout={handleLogout} />
            </>
          ) : (
            <NavLink to="/sign-in" className={styles.signInBtn}>
              SIGN IN
            </NavLink>
          )}
        </div>
    </header>
  );
};

export default Header;
