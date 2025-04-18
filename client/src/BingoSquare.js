import React, { useState, useRef, useEffect } from "react";
import "./styles/BingoSquare.css";
import star from "./imgs/star.png";

const BingoSquare = ({ backgroundColor, textColor, outlineColor, initialText, squareBackground, onSquareTextChange, onBoxClick, isEditable}) => {

    const [text, setText] = useState(initialText || 'Click to edit');
    const squareRef = useRef(null);
    const editableDivRef = useRef(null);

    useEffect(() => {
        setText(initialText || 'Click to edit');
    }, [initialText]);

    // Dynamically adjust font size based on content width
    const adjustFontSize = () => {
        if (squareRef.current && editableDivRef.current) {
            const squareWidth = squareRef.current.offsetWidth;
            const textLength = editableDivRef.current.textContent.length;
            let fontSize = 15; // Initial font size

            // Shrink the font size depending on text length and square width
            if (textLength > 20) {
                fontSize = Math.max(15 - (textLength / squareWidth) * 10, 10); // Shrink until font size 10
            }

            editableDivRef.current.style.fontSize = `${fontSize}px`; // Apply dynamic font size
        }
    };

    const handleBoxClick = () => {
        if(isEditable){
            editableDivRef.current.setAttribute("contenteditable", "true");
            editableDivRef.current.focus();
        } else {
            onBoxClick(); // Notify parent to toggle background
        }
    };

    const handleInputChange = (e) => {
        if(isEditable){
            setText(e.target.textContent);
            onSquareTextChange(e.target.textContent); // callback to parent
            adjustFontSize(); // Adjust font size on every input change
            setCaretToEnd(); // Ensure the cursor stays at the end 
        }
        
    };

    // Function to move cursor to the end of the contenteditable div
    const setCaretToEnd = () => {
        const div = editableDivRef.current;
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(div); // Select all text inside the div
        range.collapse(false); // Collapse the range to the end (set the cursor at the end)
        selection.removeAllRanges(); // Remove any existing selections
        selection.addRange(range); // Add the new selection
        div.focus(); // Ensure the div remains focused
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // prevent Enter key from creating a new line
        }
    };

    const squareStyle = {
        background: backgroundColor, 
        color: textColor,
        border: `1px solid ${outlineColor}`,
      };

      
    useEffect(() => {
        adjustFontSize(); 
        // console.log(squareBackground);
    }, [text]);

    return (
    <div
        className="square"
        style={squareStyle}
        ref={squareRef}
        onClick={handleBoxClick}
    >   
    {squareBackground && <img src={star} alt="Square background" className="square-image" />}
        <div
            ref={editableDivRef}
            contentEditable="false" // Initially set to false to prevent accidental editing
            onInput={handleInputChange}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning={true} // Suppress React warning for contenteditable
        >
            {text}
        </div>
        {squareBackground && <img src={star} alt="Square background" className="square-image" />}
    </div>
    );

}

export default BingoSquare;