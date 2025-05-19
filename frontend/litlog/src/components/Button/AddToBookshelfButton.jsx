import React, { useState, useEffect } from "react";
import "./AddToBookshelfButton.css"; 
import axios from "axios";

function AddToBookshelfButton({bookApiId, handleClick, handleAddedClick}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const options = [
    { label: "To Read", value: 1 },
    { label: "Currently Reading", value: 2 },
    { label: "Finished Reading", value: 3 },
  ];

  const options_added = [
    { label: "Move to My Bookshelf", value: 1 },
    { label: "Remove from bookshelf", value: 2 },
  ]

  useEffect(()=> {
    setBookshelf(bookApiId);
  }, [bookApiId, isAdded]);

  const setBookshelf = async (bookApiId) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/bookshelf`, {
        params: { bookApiId }, withCredentials: true
      });
      const result = response.data;
      setIsAdded(result);
    } catch (error) {
      console.error("Fail to fetch counts:", error);
      setIsAdded(false);
    }
  }


  const handleOptionClick = async (option) => {
    try {
      await handleClick(option);
      setBookshelf(bookApiId);
    } catch (err) {
      console.error("Error adding to bookshelf:", err);
    }
  
    setShowOptions(false);
  };

  const handleOptionAddedClick = async (option) => {
    try{
      await handleAddedClick(option);
      setBookshelf(bookApiId);
    }catch (err) {
      console.error("Error removing from bookshelf:", err);
    }
  }

  return (
    <>
      <div
        className="addtobookshelf-container"
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <button className="addtobookshelf-button">
          <img src="/icons/bookshelf.svg" alt="Bookshelf Icon" />
          {" Add to Bookshelf"}
        </button>

        {(showOptions && isAdded) && (
          <div className="options-dropdown">
            {options_added.map((option) => (
              <div
                key={option.value}
                className="option-item"
                onClick={() => handleOptionAddedClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}

        {(showOptions && !isAdded) && (
          <div className="options-dropdown">
            {options.map((option) => (
              <div
                key={option.value}
                className="option-item"
                onClick={() => handleOptionClick(option.value)}
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

export default AddToBookshelfButton;
