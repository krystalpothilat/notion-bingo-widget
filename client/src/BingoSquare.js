import React, { useState } from "react";
import "./styles/BingoSquare.css";

const BingoSquare = ({ backgroundColor, textColor, outlineColor, onSquareTextChange}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Click to edit');

    const handleBoxClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
        onSquareTextChange(e.target.value); //callback
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        setIsEditing(false);
        }
    };
    

    return (
      <div className="square" style={{ backgroundColor, color: textColor, border: `1px solid ${outlineColor}`}} onClick={handleBoxClick}>
      {isEditing ? (
        <textarea
          type="text"
          value={text}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)}
          onKeyPress={handleKeyPress}
          autoFocus
          maxLength={50}
          style={{
            color: textColor, 
            backgroundColor: backgroundColor,
          }}
        />
      ) : (
        text
      )}
      </div>

    );

}

export default BingoSquare;