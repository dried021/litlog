import React from 'react';
import './Button.css';

function ReadMoreButton({isOpen, handleReadMore}) {
  return (
        <button className="button-common readmore-button" onClick={() => handleReadMore(isOpen)}>
        {isOpen? ("Show Less") : ("Read More")}
      </button>
  );
}
export default ReadMoreButton;