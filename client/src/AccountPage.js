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
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { GoogleLogin } from '@react-oauth/google';


import googleicon from "./google.png";

function AccountPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    const registerUser = async () => {
        try {
                const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password }),
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    console.log('User registered successfully');
                    //store token + user name
                    localStorage.setItem('token', data.token); // Save token
                    localStorage.setItem('userName', data.name); // Save user name

                    window.location.href = '/create'; //go to widget creation page
                } else {
                    console.error('Error registering user: ', data);
                }

            } catch (error) {
                console.error('Error registering user:', error);
            }
    };

    const signIn = async () => {
        try {
                const response = await fetch('http://localhost:8080/user/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password }),
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    console.log('User registered successfully');
                    //store token + user name
                    localStorage.setItem('token', data.token); // Save token
                    localStorage.setItem('userName', data.name); // Save user name

                    window.location.href = '/create'; //go to widget creation page
                } else {
                    console.error('Error signing in');
                }

            } catch (error) {
                console.error('Error signing in:', error);
            }
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
                        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                            {/* <div className="text-center mb-3">
                                <img src = {googleicon} alt = "Google Icon" className = "google-icon"/> 
                                <p className = "with-google">Sign in with Google</p>
                            </div> */}
                            <p className="text-center mt-3">or:</p>
                            <MDBInput wrapperClass='mb-4' label='Email address' id='login-email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='login-password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='rememberMe' id='rememberMe' label='Remember me' />
                                <a href="#!">Forgot password?</a>
                            </div>
                            <MDBBtn className="mb-4 w-100" onClick={signIn}>Sign in</MDBBtn>
                            <p className="text-center">Not a member? <a href="#!">Register</a></p>
                        </MDBTabsPane>

                        <MDBTabsPane open={justifyActive === 'tab2'}>
                            <div className="text-center mb-3">
                                <img src = {googleicon} alt = "Google Icon" className = "google-icon"/> 
                                <p className = "with-google">Sign Up with Google</p>
                            </div>
                            <p className="text-center mt-3">or:</p>
                            <MDBInput wrapperClass='mb-4' label='Name' id='login-name' type='name' value={name} onChange={(e) => setName(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Email' id='register-email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='register-password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            {/* <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='terms' id='terms' label='I have read and agree to the terms' />
                            </div> */}
                            <MDBBtn className="mb-4 w-100" onClick={registerUser}>Sign up</MDBBtn>
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
