import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import "./AddLikeButton.css"; 
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../libs/UserContext';
import CustomModal from "../Modal/CustomModal"; 

function AddLikeButton({ bookApiId, isLiked, setIsLiked, handleClick, handleAddedClick, likeTrigger }) {
  const [showOptions, setShowOptions] = useState(false);

  const options_liked = [
    { label: "View My Favorites", value: 1 },
    { label: "Remove from Favorites", value: 2 },
  ];

  const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [modalData, setModalData] = useState({
        show:false,
        message: "",
        mode: "close",
      });
    
      const handleCloseModal = () => {
        setModalData({...modalData, show:false,});
      };
    
      const openModal = (
          successMessage, 
          failMessage = "", 
          resultValue="1",  
          mode="close",
          callbackOnSuccess=null,
          callbackOnFail=null) => {
        setModalData({
          show:true,
          successMessage,
          failMessage, 
          resultValue, 
          mode,
          callbackOnSuccess, 
          callbackOnFail
        });
      };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!bookApiId) {
        setIsLiked(false); 
        return;
      }
      try {
        const response = await axios.get(`http://localhost:9090/books/counts`, {
          params: { bookApiId },
          withCredentials: true
        });
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error("Fail to fetch counts:", error);
        setIsLiked(false);
      }
    };
    fetchLikeStatus();
  }, [bookApiId, likeTrigger]);

  const handleLoginCheck = (action) => {
    if (!user) {
      openModal(
        "You need to sign in to use this feature.",
        "",
        "1",
        "confirm",
        () => {
          navigate('/sign-in', {
            state: { from: location.pathname },
            replace: true
          });
        },
        null
      );
    } else {
      action();
    }
  };

  const handleAddedOptionClick = async (option) => {
    handleLoginCheck(async () => {
      try {
        await handleAddedClick(option);
        if (option === 2) setIsLiked(false);
      } catch (err) {
        console.error("Error removing like:", err);
      }
      setShowOptions(false);
    });
  };

  const handleLikeClick = async () => {
    handleLoginCheck(async () => {
      if (!isLiked) {
        await handleClick();
        setIsLiked(true);
      }
    });
  };

  return (
    <>
    <div
      className="addlike-container"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <button className="addlike-button" 
        onClick={() => {
          if (!isLiked) {
            handleLikeClick();
          }
        }}>
        <span>Add to Favorites</span>
      </button>

      {(showOptions && isLiked === true) && (
        <div className="options-dropdown">
          {options_liked.map((option) => (
            <div
              key={option.value}
              className="option-item"
              onClick={() => handleAddedOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
    <CustomModal
            show={modalData.show}
            onHide={handleCloseModal}
            successMessage={modalData.successMessage}
            failMessage={modalData.failMessage}
            resultValue={modalData.resultValue}
            mode={modalData.mode}
            callbackOnSuccess={modalData.callbackOnSuccess}
            callbackOnFail={modalData.callbackOnFail}/>
    </>
  );
}

export default AddLikeButton;
