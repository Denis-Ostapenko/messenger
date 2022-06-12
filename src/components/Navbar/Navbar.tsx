import React from "react";
import "./Navbar.css"
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { userСlear } from "../../store/action-creators/user";
import { messageСlear } from "../../store/action-creators/message";
import { messagesСlear } from "../../store/action-creators/allMessages";

const Navbar = (): JSX.Element => {
    const { user } = useTypedSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const onClickExit: React.MouseEventHandler<HTMLButtonElement> = () => {
        localStorage.removeItem('token')
        dispatch(userСlear());
        dispatch(messageСlear());
        dispatch(messagesСlear())
    }

    return (
        <nav className="navbar">
            <h2>Chats</h2>
            <div className="navbar__element">
                <div className="navbar__user"><img src={user?.image ? user?.image : "https://windows10free.ru/uploads/posts/2017-02/thumbs/1487679899_icon-user-640x640.png"} alt="avatar" /><p>{user?.nikname}</p></div>
                <button onClick={onClickExit} className="navbar__exit">Выйти</button>
            </div>
        </nav>
    )
}

export default Navbar 