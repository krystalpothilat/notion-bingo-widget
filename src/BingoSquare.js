import React, { useState } from "react";
import "./BingoSquare.css";

const BingoSquare = ({ backgroundColor, textColor, outlineColor }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Click to edit');

    const handleBoxClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        setIsEditing(false);
        }
    };

    return (
      <div className="square" style={{ backgroundColor, color: textColor, border: `1px solid ${outlineColor}`}} onClick={handleBoxClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        text
      )}
      </div>

    );

}

export default BingoSquare;