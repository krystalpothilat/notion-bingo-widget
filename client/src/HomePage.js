import React, { useState, useEffect } from "react";
import "./styles/HomePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import widgetexample from "./widgetexample.png";
import loginimg from "./login.png";
import account from "./account.png";

function HomePage() {


  return (
    <div >
        <div id = "header">
            <h1 id="web-title"> Bingo Widget Creator for Notion</h1>
            <div id = "account-buttons">
                <button type="button" class="btn btn-outline-secondary">
                        Sign Up
                    <img src={account} alt="Sign Up Icon" class="btn-icon" />
                </button>
                <button type="button" class="btn btn-outline-secondary">
                    Log In
                    <img src={loginimg} alt="Log In Icon" class="btn-icon" />
                </button>
            </div>
            
        </div>
        
        <div id = "mainpage-example">
            <img src = {widgetexample} alt = ""></img>
            <div id = "create-button-container">
                <button type="button" class="btn btn-info" id="create-button"> Create your own Bingo Card Widget!</button>
            </div>
    
        </div>

        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Bingo Widget Creator for Notion. All rights reserved.</p>
            <p> Created by <a href="https://www.linkedin.com/in/krystalpothilat" target="_blank" rel="noopener noreferrer" id="linked-in-tag" >Krystal Pothilat</a> </p>
        </footer>

    </div>

    
  );
}

export default HomePage;
