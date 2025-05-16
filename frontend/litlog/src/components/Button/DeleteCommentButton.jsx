import React from 'react';
import axios from 'axios';
import styles from './DeleteButton.module.css';

function DeleteCommentButton({ commentId, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.post(`http://localhost:9090/admin/comment`,
        { id: commentId },
      );
      if (onDelete) onDelete(commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('Failed to delete comment.');
    }
  };

  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      Delete Comment
    </button>
  );
}

export default DeleteCommentButton;
