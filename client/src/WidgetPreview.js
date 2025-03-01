import React, { useState, useEffect } from "react";

import "./styles/WidgetPreview.css"; 
import BingoCard from "./BingoCard";

const WidgetPreview = ({backgroundColor, textColor, outlineColor, titleColor, titleToggle, title, squares, gridSize, onTitleChange, onAnySquareTextChange, }) => {
    const handleTitleChange = (newTitle) => {
        onTitleChange(newTitle);
    };
    
    const handleAnySquareTextChange = (index, newSquareText) => {
      onAnySquareTextChange(index, newSquareText);
    };

      
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
                gridSize = {gridSize}
                onTitleChange={handleTitleChange}
                onAnySquareTextChange={handleAnySquareTextChange}
                isEditable = {true}
                />
        </div>

    );
}

export default WidgetPreview;