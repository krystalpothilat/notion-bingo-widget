import React, { useState, useEffect } from "react";
import "./WidgetCustomization.css"; 

function WidgetCustomization(){
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [outlineColor, setOutlineColor] = useState("#000000");
    const [text, setText] = useState("Hello, World!");
    // const [widgetId, setWidgetId] = useState(null);


    const [hexBackgroundColor, setHexBackgroundColor] = useState('#ffffff');
    const [hexTextColor, setHexTextColor] = useState('#000000');
    const [hexOutlineColor, setHexOutlineColor] = useState('#007bff');

    const handleBackgroundColorChange = (e) => {
        setBackgroundColor(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleTextColorChange = (e) => {
        setTextColor(e.target.value);
    };

    const handleOutlineColorChange = (e) => {
        setOutlineColor(e.target.value);
    };


    const updateColorFromHex = (hexCode, setColorFunction) => {
        // Validate hex code format
        const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
        if (hexRegex.test(hexCode)) {
          setColorFunction(hexCode);
        }
    };

    useEffect(() => {
        updateColorFromHex(hexBackgroundColor, setBackgroundColor);
    }, [hexBackgroundColor]);
    
    useEffect(() => {
    updateColorFromHex(hexTextColor, setTextColor);
    }, [hexTextColor]);

    useEffect(() => {
    updateColorFromHex(hexOutlineColor, setOutlineColor);
    }, [hexOutlineColor]);


    return (
        <div className = "widget-customization-container">
            <h2> Customize Widget </h2>

            <div className = "input">
                <label htmlFor="backgroundColor">Background Color:</label>
                <input
                    type="color"
                    id="backgroundColor"
                    value={backgroundColor}
                    onChange={handleBackgroundColorChange}
                />
                <input
                    type="text"
                    id="hexBackgroundColor"
                    value={hexBackgroundColor}
                    onChange={(e) => setHexBackgroundColor(e.target.value)}
                    placeholder="Enter Hex Code"
                />
            </div>
            
            <div className = "input">
                <label htmlFor="textColor">Text Color:</label>
                <input
                    type="color"
                    id="textColor"
                    value={textColor}
                    onChange={handleTextColorChange}
                />
                <input
                    type="text"
                    id="hexTextColor"
                    value={hexTextColor}
                    onChange={(e) => setHexTextColor(e.target.value)}
                    placeholder="Enter Hex Code"
                /> 
            </div>

            

            <div className = "input">
                <label htmlFor="outlineColor">Outline Color:</label>
                <input
                    type="color"
                    id="outlineColor"
                    value={outlineColor}
                    onChange={handleOutlineColorChange}
                />
                <input
                    type="text"
                    id="hexOutlineColor"
                    value={hexOutlineColor}
                    onChange={(e) => setHexOutlineColor(e.target.value)}
                    placeholder="Enter Hex Code"
                /> 
            </div>

            <div className = "input">
                <label htmlFor="text">Text:</label>
                <input
                    type="text"
                    id="text"
                    value={text}
                    onChange={handleTextChange}
                />
            </div>
        </div>
    );
}

export default WidgetCustomization;