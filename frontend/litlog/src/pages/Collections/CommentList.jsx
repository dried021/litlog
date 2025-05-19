import React, { useContext, useState } from 'react';
import styles from './CommentList.module.css';
import { UserContext } from '../../libs/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommentList = ({ comments, onRefresh }) => {
  const { user } = useContext(UserContext);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.delete(`http://localhost:9090/collections/comments/${commentId}`, {
        withCredentials: true
      });
      onRefresh(); 
    } catch (err) {
      console.error('Failed to delete comment:', err);
      alert('Failed to delete due to an error.');
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleSaveEdit = async (commentId) => {
    if (!editContent.trim()) return alert('Please enter content.');

    try {
      await axios.put(`http://localhost:9090/collections/comments/${commentId}`, {
        content: editContent
      }, { withCredentials: true });

      setEditingId(null);
      setEditContent('');
      onRefresh(); 
    } catch (err) {
      console.error('Failed to modify comment:', err);
      alert('Failed to update due to an error.');
    }
  };

  return (
    <div className={styles.commentList}>
      {comments.length === 0 ? (
        <p className={styles.noComment}>No comments yet.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.id} className={styles['comment-item']}>
            <div className={styles['comment-header']}>
              <Link to={`/${comment.userId}`} className={styles['comment-nickname']}>
                {comment.nickname}
              </Link>
              <span className={styles['comment-date']}>
                {new Date(comment.creationDate).toLocaleDateString()}
              </span>
            </div>

            {editingId === comment.id ? (
              <>
                <textarea
                  className={styles.editTextarea}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className={styles.commentActions}>
                  <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className={styles['comment-content']}>{comment.content}</div>

                {user === comment.userId && (
                  <div className={styles.commentActions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(comment)}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(comment.id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
