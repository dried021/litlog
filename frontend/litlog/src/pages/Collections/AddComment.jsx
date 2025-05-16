import React, { useState } from 'react';
import styles from './AddComment.module.css';

const AddComment = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    onSubmit(content);
    setContent('');
  };

  return (
    <div className={styles.addCommentContainer}>
      <h3 className={styles.addCommentTitle}>Add Comment</h3>
      <textarea
        className={styles.textarea}
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handleSubmit}>Submit</button>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddComment;
