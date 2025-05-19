import React, { useState, useEffect } from "react";
import "./AddToBookshelfButton.css"; 
import axios from "axios";
import CustomModal from "../Modal/CustomModal";

function AddToBookshelfButton({bookApiId, handleClick}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const [modalData, setModalData] = useState({
    show:false,
    message: "",
    mode: "close",
  });

  const handleCloseModal = () => {
    setModalData({...modalData, show:false,});
  };

  const openModal = (message) => {
    setModalData({
      show:true,
      message,
      mode: "close",
    });
  };


  const options = [
    { label: "To Read", value: 1 },
    { label: "Currently Reading", value: 2 },
    { label: "Finished Reading", value: 3 },
  ];

  useEffect(()=> {
    setBookshelf(bookApiId);
  }, [bookApiId, isAdded]);

  const setBookshelf = async (bookApiId) => {
    try {
      const response = await axios.get(`http://localhost:9090/books/bookshelf`, {
        params: { bookApiId },
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

  return (
    <>
      <div
        className="addtobookshelf-container"
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        onClick={() => {
          if (isAdded) {
            openModal("The book is already added to the bookshelf.");
          }
        }}
      >
        <button className="addtobookshelf-button">
          <img src="/icons/bookshelf.svg" alt="Bookshelf Icon" />
          {" Add to Bookshelf"}
        </button>

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
      
      <CustomModal
        show={modalData.show}
        onHide={handleCloseModal}
        successMessage={modalData.message}
        failMessage={modalData.message}
        resultValue={"1"}
        mode="close"
      />
    </>
  );
}

export default AddToBookshelfButton;
