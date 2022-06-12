import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import mySvg from './send-ico.svg'
import "./Chat.css"
import { IMessages } from "../../models/IMessages";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { IUser } from "../../models/IUser";
import { addMessage } from "../../store/action-creators/message";
import { formatISO9075 } from "date-fns";


const Chat = (): JSX.Element => {
    const { messageActiveId } = useTypedSelector(state => state.messageReducer);
    const { user } = useTypedSelector(state => state.userReducer);
    const [message, setMessage] = useState<IMessages | null>(null);
    const [inputText, setInputText] = useState<string>('');
    const [companion, setCompanion] = useState<IUser | null>(null)
    const LastMessagesElement = useRef<null | HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        getCompanion()
    }, [message]);
    useEffect(() => {
        if (messageActiveId) {
            const fetchData = async () => {
                const docRefMessage = await getDoc(doc(db, "messages", messageActiveId));
                const messageDoc = docRefMessage.data();
                setMessage({
                    users: messageDoc?.users,
                    id: messageDoc?.id,
                    lastСhange: messageDoc?.lastСhange,
                    lastMessages: messageDoc?.lastMessages,
                    messageArr: messageDoc?.messageArr
                })
            }
            fetchData();
        }
        LastMessagesElement.current?.scrollIntoView();
    }, [messageActiveId]);
    const getCompanion = async () => {
        const companionId: string | undefined = message?.users.find((item) => {
            if (user && item !== user.id) {
                return item
            }
        });
        if (companionId) {
            const response = await getDoc(doc(db, "users", companionId));
            const user = response.data();
            setCompanion({
                nikname: user?.nikname,
                image: user?.image,
                id: user?.id
            })
        }
    }
    const inputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputText(event.target.value);
    }
    const sendChange = (): void => {
        if (messageActiveId && user) {
            dispatch(addMessage({ messageId: messageActiveId, userMessage: user?.id, text: inputText }))
            setInputText('')
        }
    }
    return (
        <div className="chat">
            <header className="chat__header">
                <img className="chat__header-img" src={companion?.image ? companion?.image :
                    "https://windows10free.ru/uploads/posts/2017-02/thumbs/1487679899_icon-user-640x640.png"} alt="avatar" />
                <h4>{companion?.nikname}</h4>
            </header>
            <div className="chat__messages">
                {message?.messageArr?.map((massage, index) => {
                    const { userMessage, text, date } = massage;
                    const dataTime = formatISO9075(new Date(date), { representation: 'time' })
                    const avatar = user?.id !== userMessage ? <img className="chat__messages-img"
                        src={companion?.image ? companion?.image : "https://windows10free.ru/uploads/posts/2017-02/thumbs/1487679899_icon-user-640x640.png"}
                        alt="avatar" /> : null;
                    return (<div key={index} ref={index === message?.messageArr!.length - 1 ? LastMessagesElement : null}
                        className={user?.id !== userMessage ? "chat__messages-companion" : "chat__messages-user"}>
                        {avatar}
                        <div className={user?.id !== userMessage ? "chat__messages-element-companion" : "chat__messages-element-user"}>
                            <p className={user?.id !== userMessage ? "chat__message-companion" : "chat__message-user"}>{text}</p>
                            <div className="chat__messages-date">{dataTime}</div>
                        </div>
                    </div>)
                })}
            </div>
            <div className="chat__new-messages">
                <div className="chat__new-messages-container">
                    <input type="text" placeholder="Введите сообщение здесь" value={inputText} onChange={inputChange} />
                    <button onClick={sendChange}>
                        <img src={mySvg} alt="send" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat 