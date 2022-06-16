import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import './App.css';
import 'firebase/firestore';

function App(): JSX.Element {
    return (
        <div className='app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}
export default App;
