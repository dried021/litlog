import React, { useState, useEffect } from "react";
import styles from "./SwitchButton.module.css"; 
import axios from "axios";
import CustomModal from "../Modal/CustomModal"; 

function SwitchButton({userId, onOptionChange, buttonType, currentOption}) {
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState("");
  const [modalData, setModalData] = useState({
    show:false,
    message: "",
    mode: "close",
  });

  const handleCloseModal = () => {
    setModalData({...modalData, show:false,});
  };

  const openModal = (
      successMessage, 
      failMessage = "", 
      resultValue="1",  
      mode="close",
      callbackOnSuccess=null,
      callbackOnFail=null) => {
    setModalData({
      show:true,
      successMessage,
      failMessage, 
      resultValue, 
      mode,
      callbackOnSuccess, 
      callbackOnFail
    });
  };

  
  const options = (buttonType === "userType") ? [
    { label: "ADMIN", value: 1 },
    { label: "USER", value: 2 },
  ] : [
    { label: "ACTIVE", value: 1 },
    { label: "BANNED", value: 2 },
    { label: "WITHDRAWN", value: 3 },
  ];

  useEffect(()=>{
    setOption(currentOption);
  }, [currentOption])

  const handleOptionClick = (value) => {
    if (value === currentOption) return;
    if (buttonType === "userStatus" && currentOption === 3) {
      openModal("Cannot change status of withdrawn user");
      return;
    }
  
    const confirmMessage = `Would you like to change ${buttonType === "userType" ? "user type" : "user status"}?`;
  
    const handleConfirm = async () => {
      try {
        const response = await axios.post(`http://localhost:9090/admin/user`, {
          id: userId,
          option: value,
          buttonType: buttonType,
        });
        setOption(value);
        setShowOptions(false);
        if (onOptionChange) onOptionChange(value);
        openModal("Option updated successfully");
      } catch (error) {
        console.error("Failed to update option:", error);
        openModal("Failed to update option");
      }
    };
  
    openModal(
      confirmMessage,         
      "",                    
      "1",                 
      "confirm",              
      handleConfirm,         
      null               
    );
  };

  return (
    <>
      <div
        className={styles['option-container']}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        onClick={(e) => {
          if (buttonType === "userStatus" && currentOption === 3) {
            e.stopPropagation();
            e.preventDefault();
            openModal("Cannot change status of withdrawn user");
            return;
          }
    
          if (currentOption == null || currentOption === "") {
            openModal("Cannot change option of withdrwan user");
            return;
          }
        }}
      >
        <button className={styles['option-button']}>
          {buttonType==="userType" ? "Switch Type": "Change Status"}
        </button>

        {(showOptions) && (
          <div className={styles['options-dropdown']}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles['option-item']} ${option.value === currentOption ? styles['selected'] : ''}`}
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
            successMessage={modalData.successMessage}
            failMessage={modalData.failMessage}
            resultValue={modalData.resultValue}
            mode={modalData.mode}
            callbackOnSuccess={modalData.callbackOnSuccess}
            callbackOnFail={modalData.callbackOnFail}/>
    </>
  );
}
export default SwitchButton;
