import React from "react";
import { useGoogleLogin } from '@react-oauth/google';

import googleicon from "./google.png";
const CustomGoogleLogin = ({ text, onSuccess, onError }) => {
    const login = useGoogleLogin({
        onSuccess,
        onError,
    });

    return (
        <div className="google-login-container">
            <button className="google-login" onClick={login}>
                <img src = {googleicon} alt = "Google Icon" className = "google-icon"/>
                {text}
            </button>
        </div>
    );
};

export default CustomGoogleLogin;
