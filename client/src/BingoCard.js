import React, { useState } from "react";
import BingoSquare from "./BingoSquare";
import "./styles/BingoCard.css";


const BingoCard = ({backgroundColor, textColor, outlineColor, titleColor, titleToggle,onTitleChange, onAnySquareTextChange, onAnySquareTextEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Click to edit');

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        setIsEditing(false);
        }
    };
    
    const handleSquareTextChangeLocal = (index, newSquareText) => {
      onAnySquareTextChange(index, newSquareText);

    };
    
    const handleTitleChangeLocal = (e) => {
      setText(e.target.value);
      onTitleChange(e.target.value);
    }
    
    const handleAnySquareTextEditLocal = (index) => {
      onAnySquareTextEdit(index);
    };

    return (
      <div className = "bingocard">
        <h2  id = "title" style = {{color: titleColor, visibility: titleToggle ? 'visible' : 'hidden',}} onClick={handleTitleClick}>
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={handleTitleChangeLocal}
              onBlur={() => setIsEditing(false)}
              onKeyPress={handleKeyPress}
              autoFocus
              style={{
                color: titleColor, 
              }}
            />
          ) : (
            text
          )}
        </h2>
        
        <div className = "squares" style={{border: `1px solid ${outlineColor}`}}>
          {[...Array(9).keys()].map((index) => (
            <BingoSquare key={index} backgroundColor={backgroundColor}
            textColor={textColor}
            outlineColor={outlineColor}
            onSquareTextChange = {(newSquareText) => {
              handleSquareTextChangeLocal(index, newSquareText);
              handleAnySquareTextEditLocal(index);
            }}
            />
          ))}
        </div>
        
      </div>

      );
};

export default BingoCard;