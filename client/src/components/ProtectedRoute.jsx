import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Home from '../pages/Home';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    return token ? children : <Home />;
};

export default ProtectedRoute;