import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Login';
import { useTypedSelector } from '../hooks/redux';

const LoginPage = () => {
    const { user } = useTypedSelector((state) => state.userReducer);
    if (user) {
        return <Navigate to='/' />;
    }
    return <Login />;
};

export default LoginPage;
