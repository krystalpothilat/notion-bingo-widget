import React, { useState, useEffect } from "react";

import "./styles/WidgetPreview.css"; 
import BingoCard from "./BingoCard";

const WidgetPreview = ({backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares, onTitleChange, onAnySquareTextChange, onAnySquareTextEdit}) => {
    const handleTitleChange = (newTitle) => {
        onTitleChange(newTitle);
    };
    
    const handleAnySquareTextChange = (index, newSquareText) => {
      onAnySquareTextChange(index, newSquareText);
    };

    const handleAnySquareTextEdit = (index, newSquareText) => {
      onAnySquareTextEdit(index, newSquareText);
    };

    // useEffect(() => {
    //     console.log('WidgetPreview Props:', { backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares });
    //   }, [backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares]);

      
    return (
        <div className = "preview">
            <BingoCard
                backgroundColor={backgroundColor}
                textColor={textColor}
                outlineColor={outlineColor}
                titleColor = {titleColor}
                titleToggle = {titleToggle}
                title = {title}
                squares = {squares}
                onTitleChange={handleTitleChange}
                onAnySquareTextChange={handleAnySquareTextChange}
                onAnySquareTextEdit={handleAnySquareTextEdit}
                />
        </div>

    );
}

export default WidgetPreview;