import React from 'react';
import { Navigate } from 'react-router-dom';
import Chat from '../components/Chat';
import ChatList from '../components/ChatList';
import Navbar from '../components/Navbar';
import { useTypedSelector } from '../hooks/redux';

const Home = (): JSX.Element => {
    const { user, isMobile } = useTypedSelector((state) => state.userReducer);
    if (!user) {
        return <Navigate to='/login' />;
    }
    return (
        <>
            <Navbar />
            <div className='app__main'>
                {isMobile ? (
                    <ChatList />
                ) : (
                    <>
                        <ChatList />
                        <Chat />
                    </>
                )}
            </div>
        </>
    );
};

export default Home;
