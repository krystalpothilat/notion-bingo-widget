import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/WidgetRenderComponent.css";
import star from "./imgs/star.png";

function WidgetRenderComponent() {
    const { widgetId } = useParams();
    const [widgetData, setWidgetData] = useState(null);
    const [backgrounds, setBackgrounds] = useState({});

    useEffect(() => {
        const fetchWidgetData = async () => {
            try {

                const response = await fetch(`http://localhost:8080/${widgetId}`);
                const data = await response.json();

                setWidgetData(data);

                //set all backgrounds to transparent
                const initialBackgrounds = data.squareInputs.reduce((acc, _, index) => {
                    acc[index] = false; // Default to transparent
                    return acc;
                }, {});
                setBackgrounds(initialBackgrounds);

            } catch (error) {
                console.error('Error fetching widget data:', error);
            }
        };
        
        // Call the fetch function
        fetchWidgetData();

        console.log('WidgetRenderComponent rendered with widgetId:', widgetId);
    }, [widgetId]); // Trigger the fetch when widgetId changes


    const handleBoxClick = (index) => {
        setBackgrounds(prevBackgrounds => ({
            ...prevBackgrounds,
            [index]: !prevBackgrounds[index] 
        }));
    };

    if (!widgetData) {
        // Loading state or handle error
        return <div>Loading...</div>;
    }

    return (
        <div className="bingocard">
            <div className = "title-container">
                <h2 id="title"
                    style={{
                        color: widgetData.titleColor,
                        visibility: widgetData.titleToggle ? 'visible' : 'hidden',
                    }} > {widgetData.title}  </h2>
            </div>
            <div className="squares">
                {widgetData.squareInputs.map((input, index) => (
                    <div
                        key={index}
                        className="square"
                        id={`square-${index}`}
                        style={{
                            backgroundColor: widgetData.backgroundColor,
                            color: widgetData.textColor,
                            border: `1px solid ${widgetData.outlineColor}`,
                        }}
                        onClick={() => handleBoxClick(index)}
                    >
                        {backgrounds[index] && (
                            <img
                                src={star}
                                alt={`Background for square ${index}`}
                                className="square-image"
                            />
                        )}
                        <div className="text">{input.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WidgetRenderComponent;
