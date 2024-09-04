import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('userId'); // Check if userId exists in localStorage

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/home" />;
};

export default PrivateRoute;
