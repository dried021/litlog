import React from 'react';
import './Button.css';

function ViewMoreButton({handleLoadMore}) {
  return (
    <button className="button-common moreview-button" onClick={handleLoadMore}>
      {"View More"}
    </button>
  );
}

export default ViewMoreButton;