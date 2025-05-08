import React from 'react';
import { Link } from 'react-router-dom';

const TabMenu = ({ userId }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="tab-menu">
            <nav>
                <Link to={`/${userId}`}>Profile</Link>
                <Link to={`/${userId}/bookshelf`}>Bookshelf</Link>
                <Link to={`/${userId}/reviews/${currentYear}`}>My Reviews</Link>
                <Link to={`/${userId}/collections`}>My Collections</Link>
            </nav>
        </div>
    );
};

export default TabMenu;
