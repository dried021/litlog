import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AddLikeButton.css"; 

function AddLikeButton({ bookApiId, isLiked, setIsLiked, handleClick, handleAddedClick, likeTrigger }) {
  const [showOptions, setShowOptions] = useState(false);

  const options_liked = [
    { label: "Move to My favorites", value: 1 },
    { label: "Remove like", value: 2 },
  ];

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

  const handleAddedOptionClick = async (option) => {
    try {
      await handleAddedClick(option);
      if (option === 2) setIsLiked(false);
    } catch (err) {
      console.error("Error removing like:", err);
    }
    setShowOptions(false);
  };

  const handleLikeClick = async () => {
    if (!isLiked) {
      await handleClick(); 
      setIsLiked(true);
    }
  };

  return (
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
        <img src="/icons/heart_filled.svg" alt=""/>
        <span>Add Like</span>
      </button>

      {(showOptions && isLiked) && (
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
  );
}

export default AddLikeButton;
