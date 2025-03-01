import React, { useState, useEffect } from "react";
import "../assets/css/components/deletemodel.css";

const DeleteModal = ({ isOpen, onClose, onConfirm, fieldName }) => {
  const [randomNumber, setRandomNumber] = useState(null); 
  const [userInput, setUserInput] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const newRandom = Math.floor(Math.random() * 100) + 1;
      setRandomNumber(newRandom);
      setUserInput("");
      setIsCorrect(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setIsCorrect(Number(value) === randomNumber); // Validate input
  };

  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">
          Enter this number to confirm: <strong>{randomNumber}</strong>
        </h3>
        <input
          type="number"
          className="random-number-input"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter the number"
        />
        {!isCorrect && <p className="error-message">Enter the correct number to proceed</p>}
        
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            <i className="fa-solid fa-xmark text-sm"></i> Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="delete-btn" 
            disabled={!isCorrect} 
          >
            <i className="fa-solid fa-trash text-sm"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;