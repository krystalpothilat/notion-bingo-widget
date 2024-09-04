import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import "./styles/Dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import WidgetCard from './WidgetCard.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { googleLogout } from '@react-oauth/google';

import userimg from "./userimg.png";
import plusicon from "./plus.png";

function Dashboard() {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const [widgets, setWidgets] = useState([]);
    const [noWidgets, setNoWidgets] = useState(false);

    useEffect(() => {
        const fetchUserWidgets = async () => {
            if (userId) {
                try {
                    const response = await fetch('http://localhost:8080/saved/get-user-widgets', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId }),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setWidgets(data.widgets); // Set the widgets data
                    setNoWidgets(data.noWidgets); // Set noWidgets flag
                } catch (error) {
                    console.error('Error fetching widgets:', error);
                }
            }
        };

        fetchUserWidgets();
    }, [userId]);


    function signOut() {
        // clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');

        //sign user out of Google
        googleLogout();

        window.location.href = '/';
    }


    return (
    <div className="App" id = "dashboard">
        <div className="header" id = "creater-page-header">
            <h1 id="creater-page-web-title">Bingo Widget Creator for Notion</h1>
            <div className = "usercontainer">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <p> {userName} </p>
                        <img src = {userimg} alt = "Current User Image" id = "user-icon"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/create"> Create New Widget </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/home" onClick = {signOut}> Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>

        <div className = "all-widgets-container">
            {noWidgets ? ( //no previously saved widgets
                <div className= "no-widgets">
                    <p>No saved widgets 😕</p>
                    <Button variant="info"> Create one now!</Button>
                </div>
            ) : (
                <div className = "saved-widgets">
                    {widgets.map((widget, index) => (
                        <Link to={`/create/${widget.id}`} key={widget.id} style={{ textDecoration: 'none' }}>
                            <WidgetCard title={widget.title ? widget.title : `Widget #${index + 1}`} />
                        </Link>
                    ))}
                    <Link to={`/create`} style={{ textDecoration: 'none' }}>
                        <WidgetCard title={<span> Create new widget <img src = {plusicon} alt="plus icon" style={{ width: '20px', height: '20px', marginBottom: '3px'}}/> </span>}/>
                    </Link>
                    
                </div>
            )}
        </div>

        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Bingo Widget Creator for Notion. All rights reserved.</p>
            <p> Created by <a href="https://www.linkedin.com/in/krystalpothilat" target="_blank" rel="noopener noreferrer" id="linked-in-tag" >Krystal Pothilat</a> </p>
        </footer>

    </div>


    );
}

export default Dashboard;
