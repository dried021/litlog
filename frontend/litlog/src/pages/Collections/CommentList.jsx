import React, { useContext, useState } from 'react';
import styles from './CommentList.module.css';
import { UserContext } from '../../libs/UserContext';
import axios from 'axios';

const CommentList = ({ comments, onRefresh }) => {
  const { user } = useContext(UserContext);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`http://localhost:9090/collections/comments/${commentId}`, {
        withCredentials: true
      });
      onRefresh(); // 다시 목록 불러오기
    } catch (err) {
      console.error('댓글 삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
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
    if (!editContent.trim()) return alert('내용을 입력하세요.');

    try {
      await axios.put(`http://localhost:9090/collections/comments/${commentId}`, {
        content: editContent
      }, { withCredentials: true });

      setEditingId(null);
      setEditContent('');
      onRefresh(); // 목록 갱신
    } catch (err) {
      console.error('댓글 수정 실패:', err);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.commentList}>
      {comments.length === 0 ? (
        <p className={styles.noComment}>작성된 댓글이 없습니다.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.id} className={styles['comment-item']}>
            <div className={styles['comment-header']}>
              <span className={styles['comment-nickname']}>{comment.nickname}</span>
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
