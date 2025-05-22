import React, { useContext, useState } from 'react';
import styles from './CommentList.module.css';
import { UserContext } from '../../libs/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomModal from "../../components/Modal/CustomModal";
import defaultProfile from '../../assets/default_profile.png';

const CommentList = ({ comments, onRefresh }) => {
  const { user } = useContext(UserContext);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    mode: "close",
    resultValue: "1",
  });

  const openModal = ({ message, mode = "close", resultValue = "1", callbackOnSuccess = null, callbackOnFail = null }) => {
    setModalData({
      show: true,
      message,
      mode,
      resultValue,
      callbackOnSuccess,
      callbackOnFail
    });
  };

  const handleCloseModal = () => {
    setModalData(prev => ({ ...prev, show: false }));
  };

  const handleDelete = (commentId) => {
  setModalData({
    show: true,
    message: 'Are you sure you want to delete this comment?',
    mode: 'confirm',
    resultValue: '1',
    callbackOnSuccess: async () => {
      try {
        await axios.delete(`/api/collections/comments/${commentId}`, {
          withCredentials: true
        });

        setModalData({
          show: true,
          message: 'The comment was successfully deleted.',
          mode: 'close',
          resultValue: '1',
        });

        onRefresh(); 
      } catch (err) {
        console.error('Failed to delete comment:', err);
        setModalData({
          show: true,
          message: 'Failed to delete the comment.',
          mode: 'close',
          resultValue: '0',
        });
      }
    },
    callbackOnFail: () => {
    }
  });
};

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content.trim().replace(/\s{2,}/g, ' '));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleSaveEdit = async (commentId) => {
    if (!editContent.trim()) return openModal({ message:'Please enter content.'});

    try {
      await axios.put(`/api/collections/comments/${commentId}`, {
        content: editContent
      }, { withCredentials: true });

      setEditingId(null);
      setEditContent('');
      onRefresh(); 
    } catch (err) {
      console.error('Failed to modify comment:', err);
    }
  };

  const toggleExpand = (commentId) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
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
                <img
                  src={
                    comment.profileImage
                      ? (comment.profileImage.startsWith('http')
                          ? comment.profileImage
                          : `/api/${comment.profileImage}`)
                      : defaultProfile
                  }
                  alt="profile"
                  className={styles.profileIcon}
                />
                {comment.nickname}
              </Link>
              <span className={styles['comment-date']}>
                {new Date(comment.creationDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>

            {editingId === comment.id ? (
              <>
                <textarea
                  className={styles.editTextarea}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <small className={styles.charCount}>{editContent.length} / 1000</small>

                <div className={styles.commentActions}>
                  <button className={styles.saveBtn} onClick={() => handleSaveEdit(comment.id)}>Save</button>
                  <button className={styles.cancelBtn} onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`${styles['comment-content']} ${!expandedComments.has(comment.id) ? styles.collapsed : ''}`}
                >
                  {comment.content}
                </div>
                <div className={styles.expandButtonWrapper}>
                  <button
                    className={styles.expandBtn}
                    onClick={() => toggleExpand(comment.id)}
                  >
                    {expandedComments.has(comment.id) ? 'Show Less' : 'Show More'}
                  </button>
                </div>
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
      <CustomModal
        show={modalData.show}
        onHide={handleCloseModal}
        successMessage={modalData.message}
        failMessage={modalData.message}
        resultValue={modalData.resultValue}
        mode={modalData.mode}
        callbackOnSuccess={modalData.callbackOnSuccess}
        callbackOnFail={modalData.callbackOnFail}
      />
    </div>
  );
};

export default CommentList;
