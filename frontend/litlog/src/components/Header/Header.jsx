import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../libs/UserContext';

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <header>
            <nav>
                <Link to="/">LitLog</Link>
                <Link to="/books">Books</Link>
                <Link to="/collections">Collections</Link>
                <Link to="/readers">Readers</Link>
                <Link to="/sign-in">Sign in</Link>
                <Link to={`/${user}`}>Profile</Link>
                <Link to="/books/-9F9WaXUhRYC"> 테스트용 </Link>
            </nav>
        </header>
    )

}
export default Header;