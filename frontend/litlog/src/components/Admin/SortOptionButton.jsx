import React, { useState } from "react";
import styles from "./SortOptionButton.module.css"; 

function SortOptionButton({onSortChange}) {
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState("");

  const options = [
    { label: "Relevance", value: 1 },
    { label: "Newest", value: 2 },
    { label: "Oldest", value: 3 },
  ];

  const handleOptionClick = (value) => {
    setOption(value);
    if (onSortChange){
        onSortChange(value);
    }
    setShowOptions(false);
  }

  return (
    <>
      <div
        className={styles['option-container']}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <button className={styles['option-button']}>
          {" Sort by "+option}
        </button>

        {(showOptions) && (
          <div className={styles['options-dropdown']}>
            {options.map((option) => (
              <div
                key={option.value}
                className={styles['option-item']}
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

export default SortOptionButton;
