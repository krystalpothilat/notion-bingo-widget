import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLogIn = ({text}) => {
    const handleSuccess = async (credentialResponse) => {
        try {
            // received JWT response
            const { credential } = credentialResponse;

            // send JWT to server
            const response = await fetch('http://localhost:8080/user/googleSignIn', {
            // const response = await fetch('https://notion-bingo-widget-server.vercel.app/user/googleSignIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credential }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Server response:', result);
            localStorage.setItem('token', result.token); 
            localStorage.setItem('userName', result.name); 
            localStorage.setItem('userId', result.userId);
            window.location.href = '/create';
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            shape="rectangular"
            text = {text}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
};

export default GoogleLogIn;
