import React, { useEffect } from 'react';
import { useTypedSelector, useAppDispatch } from './hooks/redux';
import LogIn from './components/Login/Login'
import Navbar from './components/Navbar';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import './App.css'
import "firebase/firestore"


function App(): JSX.Element {
  const { user } = useTypedSelector(state => state.userReducer)
  return (
    <div className="app">
      {user ?
        <>
          <Navbar />
          <div className='app__main'>
            <ChatList />
            <Chat />
          </div>
        </>
        :
        <LogIn />
      }
    </div>
  );
}
export default App;

