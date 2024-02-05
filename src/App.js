import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css";
import WidgetPreview from "./WidgetPreview";
import WidgetRenderComponent from './WidgetRenderComponent';

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [titleColor, setTitleColor] = useState("#000000");
  const [squareTexts, setSquareTexts] = useState(Array(9).fill(""));
  const [title, setTitle] = useState("");
  const [squareTextEdit, setSquareTextEdit] = useState(Array(9).fill(false));
  const [titleToggle, setTitleToggle] = useState(true);
  const [widgetId, setWidgetId] = useState("");
  
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
    setSquareTexts((prevSquareTexts) => {
      const newSquareTexts = [...prevSquareTexts];
      newSquareTexts[index] = newSquareText;
      return newSquareTexts;
    });

  };

  const handleAnySquareEdit = (index) => {
    setSquareTextEdit((prevSquareTextEdits) => {
      const newSquareEdits = [...prevSquareTextEdits];
      newSquareEdits[index] = true;
      return newSquareEdits;
    });
  }

  const toggleSave = async () => {
    if(titleToggle && title ===""){
      alert("Title cannot be empty when visible.");
    }

    const isAllTrue = squareTextEdit.every((value) => value === true);

    if (!isAllTrue) {
      alert(`Missing text in at least 1 square.`);
      return;
    }

    const widgetData = {
        backgroundColor,
        textColor,
        outlineColor,
        titleColor,
        squareInputs: squareTexts.map((text, index) => ({ index, text })),
        titleToggle,
        title,
    };


    try {
      const response = await fetch('http://localhost:8080/WidgetCustomization/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(widgetData),
      });
      
      const { widgetId} = await response.json();
      setWidgetId(widgetId);
      console.log (widgetId);

      const customUrl = `http://localhost:3000/${widgetId}`;

      console.log('Custom URL:', customUrl);

    } catch (error) {
      console.error('Error saving widget:', error);
    }

    try {
      console.log("fetchwidgetdata in widgetrendercomponent.js");
      // Fetch widget data based on widgetId from the server
      const response = await fetch(`http://localhost:8080/${widgetId}`);
      // const data = await response.json();
      console.log(response);

    } catch (error) {
      console.error('Error fetching widget data:', error);
    }

  };


  return (

    <Router>
      <Routes>
    {/* <Switch> */}
      {/* <Route path="/:widgetId" component={<WidgetRenderComponent/>}/> */}

      <Route path="/" element = {
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
                <label htmlFor="backgroundColor" className = "inputlabel">Background Color:</label>
                <div className = "input-container">
                <input
                    type="color"
                    className = "hex"
                    id="backgroundColor"
                    value={backgroundColor}
                    onChange={handleBackgroundColorChange}
                />
                <input
                    type="text"
                    className = "textbox"
                    id="hexBackgroundColor"
                    value={hexBackgroundColor}
                    onChange={(e) => setHexBackgroundColor(e.target.value)}
                    placeholder="Enter Hex Code"
                />

                </div>
            </div>
            
            <div className = "input">
                <label htmlFor="textColor" className = "inputlabel">Text Color:</label>
                <div className = "input-container">
                <input
                    type="color"
                    className = "hex"
                    id="textColor"
                    value={textColor}
                    onChange={handleTextColorChange}
                />
                <input
                    type="text"
                    className = "textbox"
                    id="hexTextColor"
                    value={hexTextColor}
                    onChange={(e) => setHexTextColor(e.target.value)}
                    placeholder="Enter Hex Code"
                />
                </div> 
            </div>

            

            <div className = "input">
                <label htmlFor="outlineColor" className = "inputlabel">Outline Color:</label>
                <div className = "input-container">
                <input
                    type="color"
                    className = "hex"
                    id="outlineColor"
                    value={outlineColor}
                    onChange={handleOutlineColorChange}
                />
                <input
                    type="text"
                    className = "textbox"
                    id="hexOutlineColor"
                    value={hexOutlineColor}
                    onChange={(e) => setHexOutlineColor(e.target.value)}
                    placeholder="Enter Hex Code"
                />
                </div> 
            </div>

            <div className = "input">
                <label htmlFor="titleColor" className = "inputlabel">Title Color:</label>
                <div className = "input-container">
                <input
                    type="color"
                    className = "hex"
                    id="titleColor"
                    value={titleColor}
                    onChange={handleTitleColorChange}
                />
                <input
                    type="text"
                    className = "textbox"
                    id="hexTitleColor"
                    value={hexTitleColor}
                    onChange={(e) => setHexTitleColor(e.target.value)}
                    placeholder="Enter Hex Code"
                />
                </div> 
            </div>
            <div className="title-toggle">
              <label className = "slider-label" > Title</label>
              <div className = "input-container" id = "slider-container">
              <label className="slider">
                <input type="checkbox" checked={titleToggle} onChange={handleTitleToggle} />
                <div className="slider-btn"></div>
              </label>
              </div>
            </div>

            <div className = "input">
              <button onClick={toggleSave} id = "save-button"> Save Widget</button>

            </div>

        </div>

    </div>

      } />
      {/* </Switch> */}
      </Routes>
    </Router>
  );
}

export default App;
