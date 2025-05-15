import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import CommentList from './CommentList';
import Pagination from '../../components/Pagination/Pagination';

const CollectionCommentSection = ({ collectionId }) => {
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const commentsPerPage = 5;

  const fetchComments = () => {
    axios.get(`http://localhost:9090/collections/${collectionId}/comments`, {
      params: { page: commentPage },
      withCredentials: true
    })
      .then(res => {
        setComments(res.data.comments);
        setTotalComments(res.data.totalCount);
      })
      .catch(err => console.error('댓글 불러오기 실패', err));
  };

  useEffect(() => {
    fetchComments();
  }, [collectionId, commentPage]);

  const handleSubmitComment = (content) => {
    axios.post(`http://localhost:9090/collections/${collectionId}/comments`, { content }, {
      withCredentials: true
    })
      .then(() => {
        setShowAddForm(false);
        setCommentPage(1); // 새로고침 의미로 1페이지로
        fetchComments();   // 여기서 새로 불러오기
      })
      .catch(err => console.error('댓글 등록 실패', err));
  };


  return (
    <div>
      <div className="comment-header">
        <h3>Comments</h3>
        <button onClick={() => setShowAddForm(prev => !prev)}>
          {showAddForm ? 'Cancel' : 'Add Comment'}
        </button>
      </div>

      {showAddForm && (
        <AddComment
          onSubmit={handleSubmitComment}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <CommentList comments={comments} onRefresh={() => {
        axios.get(`http://localhost:9090/collections/${collectionId}/comments`, {
          params: { page: commentPage },
          withCredentials: true
        })
          .then(res => {
            setComments(res.data.comments);
            setTotalComments(res.data.totalCount);
          })
          .catch(err => console.error('댓글 불러오기 실패', err));
      }} />

      <Pagination
        currentPage={commentPage}
        pageCount={Math.ceil(totalComments / commentsPerPage)}
        onPageChange={setCommentPage}
      />
    </div>
  );
};

export default CollectionCommentSection;
