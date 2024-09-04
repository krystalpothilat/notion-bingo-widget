import React  from "react";
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./styles/HomePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import widgetexample from "./widgetexample.png";
import loginimg from "./login.png";
import account from "./account.png";

function HomePage() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/'); // Replace '/signin' with the correct path for your sign-in page
    };
    

  return (
    <div >
        <div className = "header">
            <h1 id="web-title"> Bingo Widget Creator for Notion</h1>
            <div id = "account-buttons">
                {/* <Button variant="outline-secondary"> Sign Up <img src={account} alt="Sign Up Icon" className="btn-icon" /> </Button>{' '} */}
                <Button variant="outline-secondary" as={Link} to={'/'}> Log In <img src={loginimg} alt="Log In Icon" className="btn-icon" /> </Button>{' '}
            </div>
            
        </div>
        
        <div id = "mainpage-example">
            <img src = {widgetexample} alt = "Widget Example"></img>
            <div id = "create-button-container">
                <button type="button" className="btn btn-info" id="create-button" onClick={handleSignIn}> Create your own Bingo Card Widget!</button>
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
