import React from 'react';
import './Button.css';

function AddLikeButton({isLiked, handleClick}) {
  return (
        <button className="button-common addlike-button" onClick={() => {handleClick(isLiked)}}>
            <img src={isLiked? ("/icons/heart_filled.svg") : ("/icons/heart_outline.svg")}/>
            {" Add Like"}
        </button>
  );
}
export default AddLikeButton;
