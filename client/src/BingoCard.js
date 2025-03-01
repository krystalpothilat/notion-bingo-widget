import React, { useState, useEffect } from "react";
import BingoSquare from "./BingoSquare";
import "./styles/BingoCard.css";


const BingoCard = ({backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares, squareBackgrounds, gridSize, onTitleChange, onAnySquareTextChange, onBoxClick, isEditable}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(title || 'Click to edit');

    const totalSquares = gridSize * gridSize;
    const squaresArray = squares ? squares : Array(totalSquares).fill('');

    useEffect(() => {
        setText(title || 'Click to edit');
    }, [title]);

    const handleTitleClick = () => {
        if(isEditable){
            setIsEditing(true);
        }
    };

    const handleTitleChange = (e) => {
        if (isEditable) {
            setText(e.target.value);
            onTitleChange(e.target.value);
        }
    };

    
    const handleSquareTextChange = (index, newSquareText) => {
        if (isEditable){
            onAnySquareTextChange(index, newSquareText);
        }
    };

    const handleSquareClick = (index) => {
        if(!isEditable){
            onBoxClick(index);
        }
    }

    const gridTemplateColumns = `repeat(${gridSize}, 1fr)`; //dynamically set grid columns to match grid size


    return (
      <div className = "bingocard">
        <h2  id = "title" style = {{color: titleColor, visibility: titleToggle ? 'visible' : 'hidden',}} onClick={handleTitleClick}>
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={handleTitleChange}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                    style={{ color: titleColor }}
                />
          ) : (
            text
          )}
        </h2>
        
        <div className = "squares" style={{border: `1px solid ${outlineColor}`, gridTemplateColumns}}>
            {squaresArray.map((square, index) => (
            <BingoSquare
                key={index}
                backgroundColor={backgroundColor}
                textColor={textColor}
                outlineColor={outlineColor}
                initialText={square || ''} // Ensure initialText is always a string
                onSquareTextChange={(newSquareText) => handleSquareTextChange(index, newSquareText)}
                isEditable={isEditable}
                squareBackground={squareBackgrounds[index]}
                onBoxClick={() => handleSquareClick(index)}
            />
            ))}
        </div>
        
      </div>

      );
};

export default BingoCard;