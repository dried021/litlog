import React, { useState, useEffect, useContext } from "react";
import "./AddToBookshelfButton.css"; 
import axios from "axios";
import { UserContext } from "../../libs/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../Modal/CustomModal";

function AddToBookshelfButton({bookApiId, handleClick, handleAddedClick, bookshelfTrigger}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    mode: "close",
    resultValue: "1",
    successMessage: "",
    failMessage: "",
    callbackOnSuccess: null,
    callbackOnFail: null,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, show: false });
  };

  const openModal = (
    successMessage,
    failMessage = "",
    resultValue = "1",
    mode = "close",
    callbackOnSuccess = null,
    callbackOnFail = null
  ) => {
    setModalData({
      show: true,
      successMessage,
      failMessage,
      resultValue,
      mode,
      callbackOnSuccess,
      callbackOnFail,
    });
  };

  const options = [
    { label: "To Read", value: 1 },
    { label: "Currently Reading", value: 2 },
    { label: "Finished Reading", value: 3 },
  ];

  const options_added = [
    { label: "Move to My Bookshelf", value: 1 },
    { label: "Remove from bookshelf", value: 2 },
  ]

  useEffect(() => {
    if (bookApiId && user) {
      setBookshelf(bookApiId);
    }
  }, [bookApiId, isAdded, user, bookshelfTrigger]);

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

  const handleButtonClick = () => {
    if (!user) {
      openModal(
        "You need to sign in before using this feature.",
        "",
        "1",
        "confirm",
        () => {
          navigate("/sign-in", {
            state: { from: location.pathname },
            replace: true,
          });
        },
        null
      );
    }
  };

  return (
    <>
      <div
        className="addtobookshelf-container"
        onMouseEnter={() => user && setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <button className="addtobookshelf-button" onClick={handleButtonClick}>
          {" Add to Bookshelf"}
        </button>

        {showOptions && (
          <div className="options-dropdown">
            {(isAdded ? options_added : options).map((option) => (
              <div
                key={option.value}
                className="option-item"
                onClick={() =>
                  isAdded
                    ? handleOptionAddedClick(option.value)
                    : handleOptionClick(option.value)
                }
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
        successMessage={modalData.successMessage}
        failMessage={modalData.failMessage}
        resultValue={modalData.resultValue}
        mode={modalData.mode}
        callbackOnSuccess={modalData.callbackOnSuccess}
        callbackOnFail={modalData.callbackOnFail}
      />
    </>
  );
}

export default AddToBookshelfButton;
