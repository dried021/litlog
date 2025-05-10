import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/home">LitLog</Link>
                <Link to="/books">Books</Link>
                <Link to="/collections">Collections</Link>
                <Link to="/readers">Readers</Link>
                <Link to="/sign-in">Sign in</Link>
                <Link to="/:userId">Profile</Link>
                <Link to="/books/-9F9WaXUhRYC"> 테스트용 </Link>
            </nav>
        </header>
    )

}
export default Header;