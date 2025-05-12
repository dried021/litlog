import React, { useState } from "react";
import "./AddToBookshelfButton.css"; 

function AddToBookshelfButton({handleClick}) {
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    { label: "Currently Reading", value: 1 },
    { label: "Finished Reading", value: 2 },
    { label: "To Read", value: 3 },
  ];

  const handleOptionClick = (option) => {
    handleClick(option);
    setShowOptions(false);
  };

  return (
    <div
      className="addtobookshelf-container"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <button className="addtobookshelf-button">
        <img src="/icons/bookshelf.svg" alt="Bookshelf Icon" />
        {" Add to Bookshelf"}
      </button>

      {showOptions && (
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
  );
}

export default AddToBookshelfButton;
