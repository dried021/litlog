import React from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import "./TabMenu.css";

const TabMenu = () => {
  const { userId } = useParams();
  const location = useLocation();

  return (
    <div className="mypage-tab">
      <nav>
        <NavLink to={`/${userId}`} end>Profile</NavLink>
        <NavLink to={`/${userId}/bookshelf`}>Bookshelf</NavLink>
        <NavLink
          to={`/${userId}/reviews`}
          className={({ isActive }) =>
            location.pathname.startsWith(`/${userId}/reviews`) ? "active" : ""}>My Reviews</NavLink>
        <NavLink to={`/${userId}/collections`}>My Collections</NavLink>
      </nav>
    </div>
  );
};

export default TabMenu;
