import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/WidgetRenderComponent.css";
import BingoCard from './BingoCard';

import confetti1 from "./imgs/confetti1.png";
import confetti2 from "./imgs/confetti2.png";
import confetti3 from "./imgs/confetti3.png";
import confetti4 from "./imgs/confetti4.png";
import confetti5 from "./imgs/confetti5.png";
import confetti6 from "./imgs/confetti6.png";

function WidgetRenderComponent() {
    const { widgetId } = useParams();
    const [widgetData, setWidgetData] = useState(null);


    const [raindrops, setRaindrops] = useState([]);
    const [isAnimationRunning, setIsAnimationRunning] = useState(false);
    const confettiImages = [confetti1, confetti2, confetti3, confetti4, confetti5, confetti6];
    const [bingo, setBingo] = useState(false);


    useEffect(() => {
        if (!widgetId) {
            console.error("Widget ID is missing!");
            return;
        }
        console.log("widgetId:", widgetId);

                    
        const fetchWidgetData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/saved/${widgetId}`);
                // const response = await fetch(`https://notion-bingo-widget-server.vercel.app/${widgetId}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Trouble fetching saved widget data');
                }

                console.log("squareBackgrounds:", data.squareBackgrounds);

                console.log(data);
                console.log("loaded widget");
                setWidgetData(data);

            } catch (error) {
                console.error('Error fetching widget data:', error);
            }
        };
        
        fetchWidgetData();

        console.log('WidgetRenderComponent rendered with widgetId:', widgetId);
    }, [widgetId]);

    const updateWidget = async () => {
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch('http://localhost:8080/saved/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    widgetId: widgetId, 
                    backgroundColor: widgetData.backgroundColor,
                    textColor: widgetData.textColor,
                    outlineColor: widgetData.outlineColor,
                    titleColor: widgetData.titleColor,
                    squareInputs: widgetData.squareInputs,  
                    squareBackgrounds: widgetData.squareBackgrounds, 
                    titleToggle: widgetData.titleToggle,
                    title: widgetData.title,
                    userId: userId, 
                    gridSize: widgetData.gridSize,
                    bingoToggle: widgetData.bingoToggle,
                }),
            });
    
            if (response.ok) {
                console.log('Widget updated successfully');
            } else {
                console.error('Failed to update widget');
            }
        } catch (error) {
            console.error('Error updating widget:', error);
        }
    };

    useEffect(() => {

        if (!widgetData || !widgetData.squareBackgrounds) {
            return; // Exit if widgetData is null or doesn't have squareBackgrounds
        }

        const check1LineBingo = () => {
            console.log("check 1line bingo");
            const size = widgetData.gridSize;

            // Check rows
            for (let row = 0; row < size; row++) {
                const start = row * size;
                const end = start + size;
                const rowValues = Object.values(widgetData.squareBackgrounds).slice(start, end);
                if (rowValues.every(val => val === true)) {
                    console.log("row bingo");
                    startRainfall();
                    setBingo(true);
                    return;
                }
            }

            // Check columns
            for (let col = 0; col < size; col++) {
                const columnValues = [];
                for (let row = 0; row < size; row++) {
                    columnValues.push(widgetData.squareBackgrounds[row * size + col]);
                }
                if (columnValues.every(val => val === true)) {
                    console.log("column bingo");
                    startRainfall();
                    setBingo(true);
                    return;
                }
            }

             // Check main diagonal (top-left to bottom-right)
            const diagonal1 = [];
            for (let i = 0; i < size; i++) {
                diagonal1.push(widgetData.squareBackgrounds[i * (size + 1)]);
            }

            // Check secondary diagonal (top-right to bottom-left)
            const diagonal2 = [];
            for (let i = 0; i < size; i++) {
                diagonal2.push(widgetData.squareBackgrounds[(i + 1) * (size - 1)]);
            }

            if (diagonal1.every(val => val === true) || diagonal2.every(val => val === true)) {
                console.log("diagonal bingo");
                startRainfall();
                setBingo(true);
                return;
            }

        };

        const checkBlackoutBingo = () => {
            console.log("Checking blackout bingo...");
    
            if (widgetData.squareBackgrounds.every(val => val === true)) {
                console.log("blackout bingo");
                startRainfall();
                setBingo(true);
                return;
            }
        };

        // Call the function to check for three in a row
        if(widgetData.bingoToggle === "1line") check1LineBingo();
        if(widgetData.bingoToggle == "blackout") checkBlackoutBingo();
        //does ont check for bingo if bingoToggle is 'none'

    }, [widgetData]);
    

    const handleBoxClick = (index) => {
        if (!widgetData) {
            console.error("Widget data is missing!");
            return;
        }

        const updatedSquareBackgrounds = [...widgetData.squareBackgrounds]; 
        updatedSquareBackgrounds[index] = !updatedSquareBackgrounds[index]; 

           
        setWidgetData((prevWidgetData) => ({
            ...prevWidgetData, // Keep the previous data
            squareBackgrounds: updatedSquareBackgrounds, // Update only the squareBackgrounds
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
    
    // Compare the previous and current widgetData and trigger updateWidget if needed
    useEffect(() => {
        if (widgetData) {
            updateWidget();  // Update widget whenever widgetData changes
        }
    }, [widgetData]);

    if (!widgetData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="widget-container">
            <BingoCard
                backgroundColor={widgetData.backgroundColor}
                textColor={widgetData.textColor}
                outlineColor={widgetData.outlineColor}
                titleColor={widgetData.titleColor}
                titleToggle={widgetData.titleToggle}
                title={widgetData.title}
                squares={widgetData.squareInputs} 
                squareBackgrounds={widgetData.squareBackgrounds}
                gridSize={widgetData.gridSize}     // Grid size (e.g., 3x3, 4x4)
                onBoxClick={handleBoxClick}        // Function to handle box clicks
                isEditable={false}
            />
        </div>
    );

    
}

export default WidgetRenderComponent;
