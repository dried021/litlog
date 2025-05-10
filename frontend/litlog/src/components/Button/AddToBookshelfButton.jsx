import React from 'react';
import './Button.css';

function AddToBookshelfButton({isAdded, handleClick}) {
  return (
        <button className="button-common addtobookshelf-button" onClick={() => {handleClick(isAdded)}}>
            <img src="/icons/bookshelf.svg"/>
            {" Add to Bookshelf"}
        </button>
  );
}
export default AddToBookshelfButton;
