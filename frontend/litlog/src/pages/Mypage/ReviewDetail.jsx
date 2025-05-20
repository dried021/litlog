import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ReviewDetail.module.css'; 
import TabMenu from "../../components/Mypage/TabMenu";
import CustomModal from "../../components/Modal/CustomModal";
import { UserContext } from '../../libs/UserContext'; 

const ReviewDetail = () => {
  const { userId, reviewId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); 
  const isOwner = user === userId;

  const [review, setReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState(1);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteResultModal, setShowDeleteResultModal] = useState(false);
  const [deleteResultValue, setDeleteResultValue] = useState("0");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resultValue, setResultValue] = useState("0");

  const fetchReviewDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9090/api/members/${userId}/reviews/${reviewId}`,
        { withCredentials: true } 
      );
      setReview(res.data);
    } catch (err) {
      console.error('Fail to load', err);
    }
  };

  useEffect(() => {
    fetchReviewDetail();
  }, [userId, reviewId]);

  useEffect(() => {
    if (review) {
      setEditedContent(review.content || "");
      setEditedRating(review.rating || 1);
    }
  }, [review]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={i < rating ? '/icons/star.svg' : '/icons/star_gray.svg'}
        alt="별점"
        width={18}
        height={18}
      />
    ));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', options);
  };

  const formatPublishedDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toISOString().slice(0, 10); // yyyy-MM-dd
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedContent(review.content || "");
    setEditedRating(review.rating || 1);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:9090/api/members/${userId}/reviews/${reviewId}`,
        {
          content: editedContent,
          rating: editedRating
        },
        {
          withCredentials: true 
        }
      );
      setResultValue("1");  
      setShowModal(true);
    } catch (err) {
      console.error("Update failed", err);
      setResultValue("0");  
      setShowModal(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:9090/api/members/${userId}/reviews/${reviewId}`, 
        {
          withCredentials: true
        }
      );
      setDeleteResultValue("1"); 
      setShowDeleteResultModal(true);
    } catch (err) {
      console.error("Delete failed", err);
      setDeleteResultValue("0"); 
      setShowDeleteResultModal(true);
    }
  };

  if (!review) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <TabMenu userId={userId} />
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to={`/books/${review.bookApiId}`}>
            <img className={styles.thumbnail} src={review.thumbnail || '/images/covernotavailable.png'} alt="책 표지"/>
          </Link>
        </div>

        <div className={styles.right}>
          <h2 className={styles.title}>
            <Link to={`/books/${review.bookApiId}`} className={styles.titleLink}>
              {review.title}
            </Link>
            <span className={styles.author}>{review.authors}</span>
          </h2>
          <div className={styles.meta}>
            {review.publisher} &nbsp;|&nbsp; {formatPublishedDate(review.publishedDate)} &nbsp;|&nbsp; {review.pageCount}pg
          </div>

          <div className={styles.header}>
            <div className={styles.starsWrapper}>
              <span className={`${styles.stars} ${isEditing ? styles.editModeRating : ''}`}>
                {isEditing ? (
                  Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={i < editedRating ? '/icons/star.svg' : '/icons/star_gray.svg'}
                      onClick={() => setEditedRating(i + 1)}
                      alt="별점"
                      width={18}
                      height={18}
                      style={{ cursor: 'pointer' }}
                    />
                  ))
                ) : (
                  renderStars(review.rating)
                )}
              </span>
              {review.isLiked && (
                <img src="/icons/heart_filled.svg" alt="책 좋아요" className={styles.bookLikeIcon} />
              )}
            </div>
            <span>Logged on {formatDate(review.creationDate)}</span>
          </div>

          <div className={styles.content}>
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className={styles.textarea}
              />
            ) : (
              review.content
            )}
          </div>

          <div className={styles.footerRow}>
            <div className={styles.likes}>
              <img src="/icons/heart_gray.svg" alt="좋아요" />
              <span>{review.likeCount ?? 0} Likes</span>
            </div>

            {isOwner && ( 
              <div className={styles.actions}>
                {isEditing ? (
                  <>
                    <div className={styles.tooltipContainer}>
                      <img src="/icons/submit.svg" alt="Submit" className={styles.iconButton1} onClick={() => setShowConfirmModal(true)} />
                      <div className={styles.tooltipText}>Submit</div>
                    </div>
                    <div className={styles.tooltipContainer}>
                      <img src="/icons/cancel.svg" alt="Cancel" className={styles.iconButton2} onClick={cancelEdit} />
                      <div className={styles.tooltipText}>Cancel</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.tooltipContainer}>
                      <img src="/icons/edit.svg" alt="Edit" className={styles.iconButton1} onClick={() => setIsEditing(true)} />
                      <div className={styles.tooltipText}>Edit</div>
                    </div>
                    <div className={styles.tooltipContainer}>
                      <img src="/icons/delete.svg" alt="Delete" className={styles.iconButton2} onClick={() => setShowDeleteConfirmModal(true)} />
                      <div className={styles.tooltipText}>Delete</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 모달들 */}
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        resultValue={resultValue}
        successMessage="Review Updated Successfully."
        failMessage="Review Update Failed.."
        mode="close"
        callbackOnSuccess={() => {
          setIsEditing(false);
          fetchReviewDetail();
        }}
      />
      <CustomModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        resultValue="1"
        successMessage={
          <>
            Would you like to Update your review?
            <br />
            The log date will be changed as well.
          </>
        }
        failMessage=""
        mode="confirm"
        callbackOnSuccess={() => {
          setShowConfirmModal(false);
          handleSubmit(); 
        }}
        callbackOnFail={() => {
          setShowConfirmModal(false);  
        }}
      />
      <CustomModal
        show={showDeleteResultModal}
        onHide={() => setShowDeleteResultModal(false)}
        resultValue={deleteResultValue}
        successMessage="Review deleted successfully."
        failMessage="Failed to delete the review."
        mode="close"
        callbackOnSuccess={() => {
          navigate(`/${userId}/reviews/timeline`); 
        }}
      />
      <CustomModal
        show={showDeleteConfirmModal}
        onHide={() => setShowDeleteConfirmModal(false)}
        resultValue="1"
        successMessage={
          <>
            Would you like to Delete your review?
            <br />
            This action is irreversible.
          </>
        }
        failMessage=""
        mode="confirm"
        callbackOnSuccess={() => {
          setShowDeleteConfirmModal(false);
          handleDelete();
        }}
        callbackOnFail={() => {
          setShowDeleteConfirmModal(false);
        }}
      />
    </div>
  );
};

export default ReviewDetail;
