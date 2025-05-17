import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../libs/UserContext';
import styles from './Header.module.css';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">LitLog</Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/books">Books</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/readers">Readers</Link>
      </nav>
      <div className={styles.authMenu}>
        {user ? (
          <>
            <Link to={`/${user}`}>Profile</Link>
            <Link to="/settings">Settings</Link>
          </>
        ) : (
          <Link to="/sign-in">Sign in</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
