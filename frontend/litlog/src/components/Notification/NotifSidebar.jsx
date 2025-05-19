import React, { useEffect, useState } from 'react';
import styles from './NotifSidebar.module.css';
import { useNavigate } from 'react-router-dom';

const NotifSidebar = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [closing, setClosing] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9090/api/notifications', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setNotifications(data || []))
      .catch(err => console.error('Failed to fetch notifications:', err));
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
    }

    if (notification.type === 'REVIEW_LIKE') {
      navigate(`/books/detail/${notification.targetId}`);
    } else if (
      notification.type === 'COLLECTION_LIKE' ||
      notification.type === 'COLLECTION_COMMENT'
    ) {
      navigate(`/collections/${notification.targetId}`);
    }

    handleClose(); 
  };

  return (
    <div className={`${styles.panel} ${closing ? styles.hidden : ''}`}>
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
                {!noti.isRead && <span className={styles.dot}>•</span>}
                {noti.message}
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
