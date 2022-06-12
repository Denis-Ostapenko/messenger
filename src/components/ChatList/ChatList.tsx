import React, { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { getMessage } from "../../store/action-creators/message/getMessage";
import { getMessages } from "../../store/action-creators/allMessages";
import ChatItem from "../ChatItem";
import "./ChatList.css"
import NewChat from "../NewChat";


const Chats = (): JSX.Element => {
    const [newChat, setNewChat] = useState<boolean>(false)
    const [buttonNewChat, setButtonNewChat] = useState<string>('Создать новый чат')
    const { user } = useTypedSelector(state => state.userReducer)
    const { messages } = useTypedSelector(state => state.allMessagesReducer)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user!.messages) {
            dispatch(getMessages(user?.messages!))
        }
    }, [])
    useEffect(() => {
        if (messages.length !== 0) {
            dispatch(getMessage(messages[0]))
        }
    }, [messages])
    const clickButtonNewChat = (): void => {
        setNewChat(!newChat)
        if (buttonNewChat === 'Создать новый чат') {
            setButtonNewChat("Cкрыть список пользователей")
        }
        else setButtonNewChat('Создать новый чат')
    }
    return (
        <div className="chat-list">
            <button className="chat-list__new-chat" type="button" onClick={clickButtonNewChat} style={newChat ? { backgroundColor: "#ff6565" } : { backgroundImage: `linear-gradient(92.68deg, #7CB8F7 0%, #2A8BF2 100%)` }}>{buttonNewChat}</button>
            {newChat ? <NewChat /> : null}
            <input className="chat-list__searh" type="searh" placeholder="Поиск чата" />
            <div className="chat-list__container">
                {messages?.map((messageId: string) => {
                    return <ChatItem key={messageId} messageId={messageId} />
                })}
            </div>
        </div>
    )
}

export default Chats 