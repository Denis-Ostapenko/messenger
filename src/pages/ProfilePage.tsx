import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import { useTypedSelector } from '../hooks/redux';

const ProfilePage = () => {
    const { user } = useTypedSelector((state) => state.userReducer);
    if (!user) {
        return <Navigate to='/login' />;
    }
    return (
        <>
            <Navbar />
            <Profile />
        </>
    );
};

export default ProfilePage;
