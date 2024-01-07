import React, { useState } from "react";
import BingoSquare from "./BingoSquare";
import "./BingoCard.css";


const BingoCard = ({backgroundColor, textColor, outlineColor, titleColor}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Click to edit');

    const handleTitleClick = () => {
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
      <div className = "bingocard">
        <h2  id = "title" style = {{color: titleColor}} onClick={handleTitleClick}>
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
        </h2>

        <div className = "squares">
          {[...Array(9).keys()].map((index) => (
            <BingoSquare key={index} backgroundColor={backgroundColor}
            textColor={textColor}
            outlineColor={outlineColor}
            />
          ))}
        </div>

      </div>

      );
};

export default BingoCard;