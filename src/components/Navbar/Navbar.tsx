import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { getMessagesId } from '../../store/action-creators/message/getMessagesId';
import { userСlear } from '../../store/action-creators/user';
import './Navbar.css';

const Navbar = (): JSX.Element => {
    const { user, isMobile } = useTypedSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const onClickExit: React.MouseEventHandler<HTMLButtonElement> = () => {
        localStorage.removeItem('token');
        dispatch(userСlear());
    };

    return (
        <nav className='navbar'>
            <Link to='/'>
                <h2
                    onClick={() => {
                        if (isMobile) {
                            dispatch(getMessagesId(null));
                        }
                    }}
                >
                    Chats
                </h2>
            </Link>
            <div className='navbar__element'>
                <Link to='/profile'>
                    <div className='navbar__user'>
                        <img
                            src={
                                user?.image
                                    ? user?.image
                                    : 'https://windows10free.ru/uploads/posts/2017-02/thumbs/1487679899_icon-user-640x640.png'
                            }
                            alt='avatar'
                        />
                        <p>{user?.nikname}</p>
                    </div>
                </Link>
                <button onClick={onClickExit} className='navbar__exit'>
                    Выйти
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
