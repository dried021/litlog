import React from "react";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./TabMenu.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../libs/UserContext";

const TabMenu = () => {
  const {user} = useContext(UserContext); /* 로그인된 user */
  const userId = useParams().userId; /* 현재 페이지 주인 */
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
        {(user && user===userId) && (
          <NavLink to={`/${userId}/activity`}>Activity</NavLink>
        )}
      </nav>
    </div>
  );
};

export default TabMenu;
