import React from 'react';
import './Button.css';

function AddLikeButton({handleClick}) {
  return (
        <button className="button-common addlike-button" onClick={() => {handleClick(isLiked)}}>
            <img src="/icons/heart_filled.svg"/>
            {" Add Like"}
        </button>
  );
}
export default AddLikeButton;
