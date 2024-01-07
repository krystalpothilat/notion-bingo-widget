import React, { useState, useEffect } from "react";
import "./WidgetCustomization.css"; 

const WidgetCustomization = ({backgroundColor, textColor, outlineColor, 
    onBackgroundColorChange, onTextColorChange, onOutlineColorChange}) => {

    return (
        <div className = "widget-customization-container">
            <h2> Customize Widget </h2>

            <div className = "input">
                <label htmlFor="backgroundColor">Background Color:</label>
                <input
                    type="color"
                    id="backgroundColor"
                    value={backgroundColor}
                    onChange={onBackgroundColorChange}
                />
                {/* <input
                    type="text"
                    id="hexBackgroundColor"
                    value={hexBackgroundColor}
                    onChange={(e) => setHexBackgroundColor(e.target.value)}
                    placeholder="Enter Hex Code"
                /> */}
            </div>
            
            <div className = "input">
                <label htmlFor="textColor">Text Color:</label>
                <input
                    type="color"
                    id="textColor"
                    value={textColor}
                    onChange={onTextColorChange}
                />
                {/* <input
                    type="text"
                    id="hexTextColor"
                    value={hexTextColor}
                    onChange={(e) => setHexTextColor(e.target.value)}
                    placeholder="Enter Hex Code"
                />  */}
            </div>

            

            <div className = "input">
                <label htmlFor="outlineColor">Outline Color:</label>
                <input
                    type="color"
                    id="outlineColor"
                    value={outlineColor}
                    onChange={onOutlineColorChange}
                />
                {/* <input
                    type="text"
                    id="hexOutlineColor"
                    value={hexOutlineColor}
                    onChange={(e) => setHexOutlineColor(e.target.value)}
                    placeholder="Enter Hex Code"
                />  */}
            </div>

        </div>
    );
}

export default WidgetCustomization;