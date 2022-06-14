import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { formatISO9075 } from "date-fns";
import { db } from "../../firebase";
import { addMessage } from "../../service/addMessage";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { IMessages } from "../../models/IMessages";
import { IUser } from "../../models/IUser";
import mySvg from './send-ico.svg'
import "./Chat.css"


const Chat = (): JSX.Element => {
    const { user, messageActiveId } = useTypedSelector(state => state.userReducer);
    const [message, setMessage] = useState<IMessages | null>(null);
    const [textareaText, setTextareaText] = useState<string>('');
    const [companion, setCompanion] = useState<IUser | null>(null)
    const LastMessagesElement = useRef<null | HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (message) {
            getCompanion();
        }
    }, [message]);
    useEffect(() => {
        if (messageActiveId) {
            onSnapshot(doc(db, "messages", messageActiveId), (doc) => {
                const messageDoc = doc.data();
                setMessage({
                    users: messageDoc?.users,
                    id: messageDoc?.id,
                    lastСhange: messageDoc?.lastСhange,
                    lastMessages: messageDoc?.lastMessages,
                    messageArr: messageDoc?.messageArr
                })
            });
        }
        LastMessagesElement.current?.scrollIntoView();
    }, [messageActiveId]);
    const getCompanion = async () => {
        const companionId: string | undefined = message?.users.find((item) => {
            if (user && item !== user.id) {
                return item
            }
            return undefined
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
    const textareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTextareaText(event.target.value);
    }
    const sendChange = (): void => {
        if (messageActiveId && user && isNaN(Number(textareaText))) {
            addMessage({ messageId: messageActiveId, userMessage: user?.id, text: textareaText })
            setTextareaText('')
        }
    }
    return (
        <>
            {messageActiveId ?
                < div className="chat" >
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
                            <textarea placeholder="Введите сообщение здесь" value={textareaText} onChange={textareaChange} />
                            <button onClick={sendChange}>
                                <img src={mySvg} alt="send" />
                            </button>
                        </div>
                    </div>
                </div > : null
            }
        </>
    )
}

export default Chat 