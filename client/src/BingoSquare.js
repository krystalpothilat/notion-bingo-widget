import React, { useState, useRef, useEffect } from "react";
import "./styles/BingoSquare.css";

const BingoSquare = ({ backgroundColor, textColor, outlineColor, initialText, onSquareTextChange}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText || 'Click to edit');
    const textarea = useRef(null);

    useEffect(() => {
        setText(initialText || 'Click to edit');
    }, [initialText]);

    
    useEffect(() => {
      if(isEditing && textarea.current){
        const length = textarea.current.value.length;
        textarea.current.selectionStart = length;
        textarea.current.selectionEnd = length;
        textarea.current.style.fontSize = '15px';
        
      }
    })

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
    
    // useEffect(() => {
    //     console.log('BingoSquare Props:', { backgroundColor, textColor, outlineColor, initialText });
    //   }, [backgroundColor, textColor, outlineColor, initialText]);

    return (
      <div className="square" style={{ backgroundColor, color: textColor, border: `1px solid ${outlineColor}`}} onClick={handleBoxClick}>
      {isEditing ? (
        <textarea
         ref={textarea}
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
            lineHeight: 'inherit',
            textAlign: 'center',
            fontFamily: 'Poppins, sans-serif',
            boxSizing: 'border-box',
            resize: 'none',
          }}
        />
      ) : (
        <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
          {text}
        </div>
      )}
      </div>

    );

}

export default BingoSquare;