import React, { useState, useEffect } from "react";
import BingoSquare from "./BingoSquare";
import "./styles/BingoCard.css";


const BingoCard = ({backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares, gridSize, onTitleChange, onAnySquareTextChange, onAnySquareTextEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(title || 'Click to edit');

    const totalSquares = gridSize * gridSize;
    const squaresArray = squares ? squares : Array(totalSquares).fill('');

    useEffect(() => {
        setText(title || 'Click to edit');
    }, [title]);

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
    
    const handleAnySquareTextEditLocal = (index, newSquareText) => {
      onAnySquareTextEdit(index, newSquareText);
    };

    const gridTemplateColumns = `repeat(${gridSize}, 1fr)`; //dynamically set grid columns to match grid size


    // useEffect(() => {
    //     console.log('BingoCard Props:', { backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares });
    //   }, [backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares]);
      
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
        
        <div className = "squares" style={{border: `1px solid ${outlineColor}`, gridTemplateColumns}}>
            {squaresArray.map((square, index) => (
    <BingoSquare
        key={index}
        backgroundColor={backgroundColor}
        textColor={textColor}
        outlineColor={outlineColor}
        initialText={square || ''} // Ensure initialText is always a string
        onSquareTextChange={(newSquareText) => {
            handleSquareTextChangeLocal(index, newSquareText);
            handleAnySquareTextEditLocal(index, newSquareText);
        }}
    />
))}
        </div>
        
      </div>

      );
};

export default BingoCard;