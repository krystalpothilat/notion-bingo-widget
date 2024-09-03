import React, { useState } from "react";
import "./styles/AccountPage.css";
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

import googleicon from "./google.png";

function AccountPage() {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
        console.log("handling");
        console.log({justifyActive});
    };

    return (
        <div>
            <div id="header">
                <h1 id="web-title">Bingo Widget Creator for Notion</h1>
            </div>
            
            <div id="account-div">
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                    <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                                Login
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                                Register
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent>
                        <MDBTabsPane open={justifyActive === 'tab1'}>
                            <div className="text-center mb-3">
                                <img src = {googleicon} alt = "Google Icon" className = "google-icon"/> 
                                <p className = "with-google">Sign in with Google</p>
                            </div>
                            <p className="text-center mt-3">or:</p>
                            <MDBInput wrapperClass='mb-4' label='Email address' id='login-email' type='email'/>
                            <MDBInput wrapperClass='mb-4' label='Password' id='login-password' type='password'/>
                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='rememberMe' id='rememberMe' label='Remember me' />
                                <a href="#!">Forgot password?</a>
                            </div>
                            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                            <p className="text-center">Not a member? <a href="#!">Register</a></p>
                        </MDBTabsPane>

                        <MDBTabsPane open={justifyActive === 'tab2'}>
                            <div className="text-center mb-3">
                                <img src = {googleicon} alt = "Google Icon" className = "google-icon"/> 
                                <p className = "with-google">Sign Up with Google</p>
                            </div>
                            <p className="text-center mt-3">or:</p>
                            <MDBInput wrapperClass='mb-4' label='Name' id='register-name' type='text'/>
                            <MDBInput wrapperClass='mb-4' label='Username' id='register-username' type='text'/>
                            <MDBInput wrapperClass='mb-4' label='Email' id='register-email' type='email'/>
                            <MDBInput wrapperClass='mb-4' label='Password' id='register-password' type='password'/>
                            {/* <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='terms' id='terms' label='I have read and agree to the terms' />
                            </div> */}
                            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                        </MDBTabsPane>
                    </MDBTabsContent>
                </MDBContainer>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Bingo Widget Creator for Notion. All rights reserved.</p>
                <p> Created by <a href="https://www.linkedin.com/in/krystalpothilat" target="_blank" rel="noopener noreferrer">Krystal Pothilat</a> </p>
            </footer>
        </div>
    );
}

export default AccountPage;
