import React from 'react';
import { Navigate } from 'react-router-dom';
import Chat from '../components/Chat';
import Navbar from '../components/Navbar';
import { useTypedSelector } from '../hooks/redux';

const ChatPage = (): JSX.Element => {
    const { user } = useTypedSelector((state) => state.userReducer);
    if (!user) {
        return <Navigate to='/login' />;
    }
    console.log(1);
    return (
        <>
            <Navbar />
            <div className='app__main'>
                <Chat />
            </div>
        </>
    );
};

export default ChatPage;
