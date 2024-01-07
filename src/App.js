import React, { useState, useEffect } from "react";

import "./App.css";
// import WidgetCustomization from "./WidgetCustomization";
import WidgetPreview from "./WidgetPreview";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [titleColor, setTitleColor] = useState("#000000");
  
  const handleBackgroundColorChange = (color) => {
    setHexBackgroundColor(color.target.value);
    setBackgroundColor(color.target.value);
  };

  const handleTextColorChange = (color) => {
    setHexTextColor(color.target.value);
    setTextColor(color.target.value);
  };

  const handleOutlineColorChange = (color) => {
    setHexOutlineColor(color.target.value);
    setOutlineColor(color.target.value);
  };

  const handleTitleColorChange = (color) => {
    setHexTitleColor(color.target.value);
    setTitleColor(color.target.value);
  };

  const [hexBackgroundColor, setHexBackgroundColor] = useState('#ffffff');
  const [hexTextColor, setHexTextColor] = useState('#000000');
  const [hexOutlineColor, setHexOutlineColor] = useState('#007bff');
  const [hexTitleColor, setHexTitleColor] = useState("#000000");

  const updateColorFromHex = (hexCode, setColorFunction) => {
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

  useEffect(() => {
  updateColorFromHex(hexTitleColor, setTitleColor);
  }, [hexTitleColor]);

  const [saveWidget, setSaveWidget] = useState(false);

  const toggleSave = () => {
    setSaveWidget(true);
  };


  return (
    <div className="App">
      <WidgetPreview backgroundColor = {backgroundColor}
              textColor = {textColor}
              outlineColor = {outlineColor} 
              titleColor = {titleColor}/>

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
                <label htmlFor="titleColor">Title Color:</label>
                <input
                    type="color"
                    id="titleColor"
                    value={titleColor}
                    onChange={handleTitleColorChange}
                />
                <input
                    type="text"
                    id="hexTitleColor"
                    value={hexTitleColor}
                    onChange={(e) => setHexTitleColor(e.target.value)}
                    placeholder="Enter Hex Code"
                /> 
            </div>

            <div className = "input">
              <button onClick={toggleSave} > Save Widget</button>

            </div>

        </div>

    </div>
  );
}

export default App;
