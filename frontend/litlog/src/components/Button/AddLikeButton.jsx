import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./AddLikeButton.css"; 

function AddLikeButton({bookApiId, handleClick, handleAddedClick, likeTrigger}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const options_liked = [
    { label: "Move to My favorites", value: 1 },
    { label: "Remove like", value: 2 },
  ]

  useEffect(()=> {
    if (bookApiId) {
      checkLikeStatus(bookApiId);
    }
  }, [bookApiId, likeTrigger]);

  const checkLikeStatus = async (bookApiId) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/counts`, {
        params: { bookApiId }, withCredentials: true
      });
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error("Fail to fetch counts:", error);
    }
  }

  const handleAddedOptionClick = async (option) => {
    try {
      await handleAddedClick(option);
      if(option === 2) setIsLiked(false);
    } catch (err) {
      console.error("Error adding to bookshelf:", err);
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
    <>
      <div
        className="addlike-container"
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <button className="addlike-button" 
          onClick={() => {
            if(!isLiked){
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
    </>
  );
}
export default AddLikeButton;
