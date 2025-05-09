import React from 'react';
import './Button.css';

function TopButton() {
    const scrollToTop = () => {
        window.scrollTo({top:0, behavior: 'smooth'});
    };
  return (
    <button className="button-common top-button" onClick={scrollToTop}>
        {"Top"}
    </button>
  );
}
export default TopButton;