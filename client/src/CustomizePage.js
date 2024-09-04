import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "./styles/CustomizePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import WidgetPreview from "./WidgetPreview.js";
import Dropdown from 'react-bootstrap/Dropdown';
import { googleLogout } from '@react-oauth/google';


import copyimg from "./copy.png";
import userimg from "./userimg.png";

function CustomizePage() {
    const { widgetId } = useParams(); // Get the widgetId from the URL
    // const [widgetData, setWidgetData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [outlineColor, setOutlineColor] = useState("#000000");
    const [titleColor, setTitleColor] = useState("#000000");
    const [squareTexts, setSquareTexts] = useState(Array(9).fill(""));
    const [title, setTitle] = useState("");
    const [squareTextEdit, setSquareTextEdit] = useState(Array(9).fill(false));
    const [titleToggle, setTitleToggle] = useState(true);
    // const [widgetId, setWidgetId] = useState("");
    const [url, setUrl] = useState("");
    const [showUrl, setShowUrl] = useState(false);
    const [userName, setUserName] = useState('');
    const [savedWidget, setSavedWidget] = useState(false);

    useEffect(() => {
        if (widgetId) {
            const fetchWidget = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/saved/${widgetId}`);
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error('Trouble fetching saved widget data');
                    }

                    // setWidgetData(data);
                    setBackgroundColor(data.backgroundColor);
                    setTextColor(data.textColor);
                    setOutlineColor(data.outlineColor);
                    setTitleColor(data.titleColor);
                    setSquareTexts(data.squareInputs.map((input) => input.text));
                    setSquareTextEdit(data.squareInputs.map(() => true));
                    setTitle(data.title);
                    setTitleToggle(data.titleToggle);
                    setUrl(`https://notion-bingo-widget.vercel.app/${widgetId}`);
                    setShowUrl(true);
                    setSavedWidget(true);
                } catch (error) {
                    console.error("Error fetching widget data:", error);
                }
            };

            fetchWidget();
        }
    }, [widgetId]);

    // text input color changes
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
    const [hexOutlineColor, setHexOutlineColor] = useState('#000000');
    const [hexTitleColor, setHexTitleColor] = useState("#000000");

    const updateColorFromHex = (hexCode, setColorFunction) => {
        const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
        if (hexRegex.test(hexCode)) {
            setColorFunction(hexCode);
        }
    };

    //color changes from hex square
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

    //color changes from input widget data
    useEffect(() => {
        setHexBackgroundColor(backgroundColor);
    }, [backgroundColor]);

    useEffect(() => {
        setHexTextColor(textColor);
    }, [textColor]);

    useEffect(() => {
        setHexOutlineColor(outlineColor);
    }, [outlineColor]);

    useEffect(() => {
        setHexTitleColor(titleColor);
    }, [titleColor]);

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    const handleTitleToggle = () => {
        setTitleToggle(!titleToggle);
        setTitle('');
    }
    
    const handleAnySquareTextChange = (index, newSquareText) => {
        console.log("handle any square text change");
        setSquareTexts((prevSquareTexts) => {
            const newSquareTexts = [...prevSquareTexts];
            newSquareTexts[index] = newSquareText;
            return newSquareTexts;
        });
        console.log(squareTexts);
    };

    const handleAnySquareEdit = (index, newSquareText) => {
        console.log("handle any square edit");
        console.log(newSquareText);
        setSquareTextEdit((prevSquareTextEdits) => {
            const newSquareEdits = [...prevSquareTextEdits];
            newSquareEdits[index] = newSquareText !== '';
            console.log(newSquareEdits);
            return newSquareEdits;
        });
        console.log(squareTextEdit);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            console.log('URL copied to clipboard');
        }).catch((error) => {
            console.error('Failed to copy URL to clipboard', error);
        });
    };

    useEffect(() => {
        const userName = localStorage.getItem('userName');

        setUserName(userName); // Set the user name
    }, []);

    const toggleSave = async () => {
        if(titleToggle && title ===""){
            alert("Title cannot be empty when visible.");
            return;
        }

        const isAllTrue = squareTextEdit.every((value) => value === true);

        if (!isAllTrue) {
            alert(`Missing text in at least 1 square.`);
            return;
        }

        const userId = localStorage.getItem('userId');
        console.log(userId);
        if (!userId) {
            throw new Error('User ID is not available');
        }

        const widgetData = {
            backgroundColor,
            textColor,
            outlineColor,
            titleColor,
            squareInputs: squareTexts.map((text, index) => ({ index, text })),
            titleToggle,
            title,
            userId,
        };
        

        try {
        //   const response = await fetch('https://notion-bingo-widget-server.vercel.app/WidgetCustomization/save', {

            const response = await fetch('http://localhost:8080/WidgetCustomization/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(widgetData),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }   

            const { widgetId: updatedWidgetId } = await response.json();
            console.log (widgetId);

            const customUrl = `https://notion-bingo-widget.vercel.app/${updatedWidgetId}`;
            setUrl(customUrl);
            setShowUrl(true);

            console.log('Custom URL:', customUrl);

        } catch (error) {
            console.error('Error saving widget:', error);
        }

    };

    const toggleUpdate = async () => {
        if(titleToggle && title ===""){
            alert("Title cannot be empty when visible.");
            return;
        }

    
        const isAllTrue = squareTextEdit.every((value) => value === true);
        if (!isAllTrue) {
            alert(`Missing text in at least 1 square.`);
            return;
        }

        const userId = localStorage.getItem('userId');
        console.log(userId);
        if (!userId) {
            throw new Error('User ID is not available');
        }


        const widgetData = {
            widgetId,
            backgroundColor,
            textColor,
            outlineColor,
            titleColor,
            squareInputs: squareTexts.map((text, index) => ({ index, text })),
            titleToggle,
            title,
            userId,
        };
        

        try {
        //   const response = await fetch('https://notion-bingo-widget-server.vercel.app/WidgetCustomization/update', {

            const response = await fetch('http://localhost:8080/saved/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(widgetData),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }   
            console.log("update successful");

        } catch (error) {
            console.error('Error updating widget:', error);
        }

    };

    function signOut() {
        // clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');

        //sign user out of Google
        googleLogout();

    }

    // useEffect(() => {
    //     console.log('Title:', title);
    //     console.log('TitleToggle:', titleToggle);
    //     console.log('SquareTexts:', squareTexts);
    //     console.log('SquareTextEdits:', squareTextEdit);
    // }, [title, titleToggle, squareTexts, squareTextEdit]);
    

    return (

    <div className="App" id = "customize">
        <div className="header" id = "creater-page-header">
            <h1 id="creater-page-web-title">Bingo Widget Creator for Notion</h1>
            <div className = "usercontainer">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-toggle">
                        <img src = {userimg} alt = "Current User Image" id = "user-icon"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end" className="dropdown-menu">
                        <Dropdown.Item className = "hello" > Hello {userName}! </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/dashboard"> Saved Widgets </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/home" onClick = {signOut}> Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <div id="WidgetCreator">
            
            <WidgetPreview backgroundColor = {backgroundColor}
                    textColor = {textColor}
                    outlineColor = {outlineColor} 
                    titleColor = {titleColor}
                    titleToggle = {titleToggle}
                    title = {title}
                    squares = {squareTexts}
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
                
                <div className = "input"> 
                <label className="title-toggle">
                <label htmlFor="titleColor" className = "inputlabel">Title:</label>
                    <div className = "input-container" id = "slider-container">
                    <label className="slider">
                    <input type="checkbox" checked={titleToggle} onChange={handleTitleToggle} id = "titlecheck" />
                    <div className="slider-btn"></div>
                    </label>
                    </div>
                </label>
                </div>

                <div className = "input">
                <button onClick={savedWidget ? toggleUpdate : toggleSave} id = "save-button"> {savedWidget ? "Save Updates" : "Save Widget"} </button>
                </div>

                <div className="url-display">
                    {showUrl ? (
                    <div className = "url-container">
                        <div id="url">{url}</div>
                        <img src={copyimg} alt="Copy to Clipboard" onClick={copyToClipboard} style={{ cursor: 'pointer' }} />
                    </div>
                    ) : (
                    <div id="url">&nbsp;</div> // Non-breaking space
                    )}
                </div>


            </div>
        </div>
        
    </div>
    );
}

export default CustomizePage;
