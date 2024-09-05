import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/WidgetRenderComponent.css";
import star from "./imgs/star.png";

import confetti1 from "./imgs/confetti1.png";
import confetti2 from "./imgs/confetti2.png";
import confetti3 from "./imgs/confetti3.png";
import confetti4 from "./imgs/confetti4.png";
import confetti5 from "./imgs/confetti5.png";
import confetti6 from "./imgs/confetti6.png";

function WidgetRenderComponent() {
    const { widgetId } = useParams();
    const [widgetData, setWidgetData] = useState(null);
    const [backgrounds, setBackgrounds] = useState(Array(9).fill(false) );
    const [raindrops, setRaindrops] = useState([]);
    const [isAnimationRunning, setIsAnimationRunning] = useState(false);
    const confettiImages = [confetti1, confetti2, confetti3, confetti4, confetti5, confetti6];
    const [bingo, setBingo] = useState(false);

    useEffect(() => {
        const fetchWidgetData = async () => {
            try {

                const response = await fetch(`https://notion-bingo-widget-server.vercel.app/${widgetId}`);
                const data = await response.json();

                setWidgetData(data);

            } catch (error) {
                console.error('Error fetching widget data:', error);
            }
        };
        
        fetchWidgetData();

        console.log('WidgetRenderComponent rendered with widgetId:', widgetId);
    }, [widgetId]);

    useEffect(() => {
        const checkBingo = () => {
            console.log("check bingo");
            const size = 3; // Assuming a 3x3 grid

            // Check rows
            for (let row = 0; row < size; row++) {
                const start = row * size;
                const end = start + size;
                const rowValues = Object.values(backgrounds).slice(start, end);
                if (rowValues.every(val => val === true)) {
                    startRainfall();
                    setBingo(true);
                    return;
                }
            }

            // Check columns
            for (let col = 0; col < size; col++) {
                const columnValues = [];
                for (let row = 0; row < size; row++) {
                    columnValues.push(backgrounds[row * size + col]);
                }
                if (columnValues.every(val => val === true)) {
                    startRainfall();
                    setBingo(true);
                    return;
                }
            }

            // Check diagonals
            const diagonal1 = [0, 4, 8].map(i => backgrounds[i]);
            const diagonal2 = [2, 4, 6].map(i => backgrounds[i]);

            if (diagonal1.every(val => val === true) || diagonal2.every(val => val === true)) {
                startRainfall();
                setBingo(true);
                return;
            }
        };

        // Call the function to check for three in a row
        if(!bingo) checkBingo();
        console.log(backgrounds);
        console.log(bingo);
    }, [backgrounds]);
    

    const handleBoxClick = (index) => {
        setBackgrounds(prevBackgrounds => ({
            ...prevBackgrounds,
            [index]: !prevBackgrounds[index] 
        }));
    };

    const startRainfall = () => {
        console.log("rainfall");
        if (isAnimationRunning) {
            return;
        }
    
        setIsAnimationRunning(true);
    
        const newRaindrops = [];
    
        for (let i = 0; i < 150; i++) {
            const startTime = Math.random() * 1; // Random start times between 0 and 1 seconds
            const speed = Math.random() * 3 + 1; // Speed between 1 and 4 seconds
            const leftPosition = Math.random() * 100; // Random horizontal position between 0 and 100vw
            const horizontalMovement = Math.random() * 20 - 10; // Random movement between -10vw and 10vw
            const rotation = Math.random() * 360; 
            const image = confettiImages[Math.floor(Math.random() * confettiImages.length)]; // Random image selection

            newRaindrops.push({
                id: i,
                left: `${leftPosition}vw`,
                startTime: `${startTime}s`,
                speed: `${speed}s`,
                horizontalMovement: `${horizontalMovement}vw`,
                rotation: `${rotation}deg`,
                image,
            });
        }
    
        setRaindrops(newRaindrops);
    
        setTimeout(() => {
            setIsAnimationRunning(false);
            setRaindrops([]);
        }, 5000);
    };
    

    if (!widgetData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="raindrops-container">
                {raindrops.length > 0 &&
                raindrops.map((raindrop) => (
                    <div
                    key={raindrop.id}
                    className="raindrop"
                    style={{
                        left: raindrop.left,
                        top: "-30px",
                        backgroundImage: `url(${raindrop.image})`,
                        animation: `fly ${raindrop.speed} ease-out ${raindrop.startTime}`,
                        '--horizontalMovement': raindrop.horizontalMovement,
                        '--rotation': raindrop.rotation,
                    }}
                    />
                ))}
            </div>

        <div className="bingo-card">
                
            <div className = "title-container">
                <h2 id="bingo-title"
                    style={{
                        color: widgetData.titleColor,
                        visibility: widgetData.titleToggle ? 'visible' : 'hidden',
                    }} > {widgetData.title}  </h2>
            </div>
            <div className="bingo-squares">
                {widgetData.squareInputs.map((input, index) => (
                    <div
                        key={index}
                        className="bingo-square"
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
        </>
    );
}

export default WidgetRenderComponent;
