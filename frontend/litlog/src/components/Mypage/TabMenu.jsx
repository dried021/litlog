import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./TabMenu.css";
import { useParams } from "react-router-dom";

const TabMenu = () => {
  const userId = useParams().userId;
  const location = useLocation();

  return (
    <div className="mypage-tab">
      <nav>
        <NavLink to={`/${userId}`} end>Profile</NavLink>
        <NavLink to={`/${userId}/bookshelf`}>Bookshelf</NavLink>
        <NavLink
          to={`/${userId}/reviews/timeline`}
          className={({ isActive }) =>
            location.pathname.startsWith(`/${userId}/reviews/timeline`) || location.pathname.startsWith(`/${userId}/reviews/list`) 
            ? "active" : ""}
        >
          My Reviews
        </NavLink>
        <NavLink
          to={`/${userId}/collections/created`}
          className={({ isActive }) =>
            location.pathname.startsWith(`/${userId}/collections`) ? "active" : ""}
        >
          My Collections
        </NavLink>
        <NavLink to={`/${userId}/activity`}>Activity</NavLink>
      </nav>
    </div>
  );
};

export default TabMenu;
