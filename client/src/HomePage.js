import React, { useState, useEffect } from "react";
import "./styles/HomePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import widgetexample from "./widgetexample.png";

function HomePage() {


  return (
    <div >
        <div id = "header">
            <h1 id="web-title"> Bingo Widget for Notion</h1>
            <div id = "account-buttons">
                <button type="button" class="btn btn-outline-primary"> Sign Up</button>
                <button type="button" class="btn btn-outline-primary"> Log In</button>
            </div>
            
        </div>
        
        <div id = "mainpage-example">
            <img src = {widgetexample} alt = ""></img>
            <div id = "create-button-container">
                <button type="button" class="btn btn-outline-primary" id="create-button"> Create your own Bingo Card Widget!</button>
            </div>
            
        </div>

    </div>


  );
}

export default HomePage;
