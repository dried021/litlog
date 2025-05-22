import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import CommentList from './CommentList';
import Pagination from '../../components/Pagination/Pagination';
import { UserContext } from '../../libs/UserContext';
import styles from './CollectionCommentSection.module.css';

const CollectionCommentSection = ({ collectionId }) => {
  const { user } = useContext(UserContext); 
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const commentsPerPage = 5;

  const fetchComments = () => {
    axios.get(`/api/collections/${collectionId}/comments`, {
      params: { page: commentPage, size: commentsPerPage },
      withCredentials: true
    })
    .then(res => {
      setComments(res.data.comments);
      setTotalComments(res.data.totalCount);
    })
    .catch(err => console.error('Failed to load comments.', err));
  };

  useEffect(() => {
    fetchComments();
  }, [collectionId, commentPage]);

  const handleSubmitComment = (content) => {
    axios.post(`/api/collections/${collectionId}/comments`, { content }, {
      withCredentials: true
    })
    .then(() => {
      setShowAddForm(false);
      setCommentPage(1);
      fetchComments();
    })
    .catch(err => console.error('Failed to post comment.', err));
  };

  return (
    <div>
      <div className={styles.commentHeader}>
        <h3>Comments</h3>
        {user && (
          <button
            onClick={() => setShowAddForm(prev => !prev)}
            className={styles.addCommentToggleBtn}
          >
            {showAddForm ? 'Cancel' : 'Add Comment'}
          </button>
        )}
      </div>
      {showAddForm && user && (
        <AddComment
          onSubmit={handleSubmitComment}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <CommentList
        comments={comments}
        onRefresh={fetchComments}
      />

      <Pagination
        currentPage={commentPage}
        pageCount={Math.ceil(totalComments / commentsPerPage)}
        onPageChange={setCommentPage}
      />
    </div>
  );
};

export default CollectionCommentSection;
