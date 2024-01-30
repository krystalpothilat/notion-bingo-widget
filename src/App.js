import React, { useState, useEffect } from "react";

import "./App.css";
import WidgetPreview from "./WidgetPreview";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [titleColor, setTitleColor] = useState("#000000");
  const [squareTexts, setSquareTexts] = useState(Array(9).fill(""));
  const [title, setTitle] = useState("");
  const [squareTextEdit, setSquareTextEdit] = useState(Array(9).fill(false));
  const [titleToggle, setTitleToggle] = useState(true);

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
  
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };
  
  const handleTitleToggle = () => {
    setTitleToggle(!titleToggle);
  }
  const handleAnySquareTextChange = (index, newSquareText) => {
    // Update the squareTexts state with the new text for the specific square
    console.log("made it to app.js, square change!");
    console.log("in app.js, the new string is " + newSquareText + " for square " + index);
    setSquareTexts((prevSquareTexts) => {
      const newSquareTexts = [...prevSquareTexts];
      newSquareTexts[index] = newSquareText;
      return newSquareTexts;
    });
    console.log("All squareTexts:", squareTexts);

  };

  const handleAnySquareEdit = (index) => {
    setSquareTextEdit((prevSquareTextEdits) => {
      const newSquareEdits = [...prevSquareTextEdits];
      newSquareEdits[index] = true;
      return newSquareEdits;
    });
    console.log("All square edits:", squareTextEdit);
  }

  const toggleSave = () => {
    if(titleToggle && title ===""){
      alert("Title cannot be empty when visible.");
      return;
    }

    const isAllTrue = squareTextEdit.every((value) => value === true);

    if (!isAllTrue) {
      // console.log("Not all elements in squareTextEdit are true. Aborting save.");
      alert(`Missing text in at least 1 square.`);
      return;
    }

    const widgetData = {
        backgroundColor,
        textColor,
        outlineColor,
        titleColor,
        squareInputs: squareTexts.map((text, index) => ({ index, text })),
        title,
    };
    console.log("toggle save");
    console.log("All squareTexts:", squareTexts);

    fetch('http://localhost:8080/WidgetCustomization/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(widgetData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Widget saved:', data);
        console.log("saved");
      })
      .catch((error) => {
        console.error('Error saving widget:', error);
      });  
  };


  return (
    <div className="App">
      <WidgetPreview backgroundColor = {backgroundColor}
              textColor = {textColor}
              outlineColor = {outlineColor} 
              titleColor = {titleColor}
              titleToggle = {titleToggle}
              onTitleChange={handleTitleChange}
              onAnySquareTextChange={handleAnySquareTextChange}
              onAnySquareTextEdit={handleAnySquareEdit}/>

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
            <div className="title-toggle">
              <label className = "slider-label"> Title</label>
              <label className="slider">
                <input type="checkbox" checked={titleToggle} onChange={handleTitleToggle} />
                <div className="slider-btn"></div>
              </label>
            </div>
            <div className = "input">
              <button onClick={toggleSave} > Save Widget</button>

            </div>

        </div>

    </div>
  );
}

export default App;
