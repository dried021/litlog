import React, { useEffect, useState, useRef } from 'react';
import styles from './NotifSidebar.module.css';
import { useNavigate, useLocation } from 'react-router-dom'; 

const NotifSidebar = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [opening, setOpening] = useState(false);
  const [closing, setClosing] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const sidebarRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:9090/api/notifications', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const mapped = (data || []).map(n => ({
          ...n,
          isRead: n.isRead ?? n.read ?? false 
        }));
        setNotifications(mapped);
      })
      .catch(err => console.error('Failed to fetch notifications:', err));
  }, []);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      handleClose();
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setOpening(true), 0);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); 
  };

  const handleClick = async (notification) => {
    if (!notification.isRead) {
      await fetch(`http://localhost:9090/api/notifications/${notification.id}/read`, {
        method: 'PATCH',
        credentials: 'include',
      });
      setNotifications(prev =>
        prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
      );
    }

    if (notification.type === 'FOLLOW') {
      navigate(`/${notification.senderId}`);
      handleClose();
    } else if (notification.type === 'REVIEW_LIKE') {
      navigate(`/books/${notification.bookApiId}`);
      handleClose();
    } else if (
      notification.type === 'COLLECTION_LIKE' ||
      notification.type === 'COLLECTION_COMMENT'
    ) {
      navigate(`/collections/${notification.targetId}`);
      handleClose();
    }
  };

  const renderMessage = (noti) => {
    const name = noti.senderNickname || 'Someone';
    switch (noti.type) {
      case 'FOLLOW':
        return `${name} is now Following you!`;
      case 'REVIEW_LIKE':
        return `${name} Liked your Review.`;
      case 'COLLECTION_LIKE':
        return `${name} Liked your Collection.`;
      case 'COLLECTION_COMMENT':
        return `${name} Commented on your Collection.`;
      default:
        return 'You have a new notification.';
    }
  };

  return (
    <div ref={sidebarRef} className={`${styles.panel} ${closing ? styles.hidden : ''} ${opening ? styles.open : ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>Notifications</span>
        <button className={styles.closeBtn} onClick={handleClose}>×</button>
      </div>
      <div className={styles.subtext}>Only notifications from the past 7 days are shown.</div>
      <div className={styles.list}>
        {notifications.length === 0 ? (
          <div className={styles.empty}>No notifications</div>
        ) : (
          notifications.map((noti) => (
            <div
              key={noti.id}
              className={`${styles.item} ${noti.isRead ? styles.read : styles.unread}`}
              onClick={() => handleClick(noti)}
            >
              <div className={styles.message}>
                <span className={styles.dot}>•</span>
                {renderMessage(noti)}
              </div>
              <div className={styles.time}>{formatTimeAgo(noti.createdAt)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function formatTimeAgo(timestamp) {
  const diff = (new Date() - new Date(timestamp)) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default NotifSidebar;
