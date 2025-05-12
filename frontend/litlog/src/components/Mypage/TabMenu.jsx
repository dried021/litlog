import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./TabMenu.css";
import { useRequireAuth } from "../../libs/useRequireAuth.js"

const TabMenu = () => {
  const userId = useRequireAuth();
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
