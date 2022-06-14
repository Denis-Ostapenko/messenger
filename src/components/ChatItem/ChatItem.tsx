import React, { useState, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { IMessages } from "../../models/IMessages";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { getMessagesId } from "../../store/action-creators/message/getMessagesId";
import { formatTime } from "../genericFunction";
import { db } from "../../firebase";
import { IUser } from "../../models/IUser";
import Loader from "../Loader";
import "./ChatItem.css"

interface IChatItemProps {
    messageId: string
}

const ChatItem = ({ messageId }: IChatItemProps): JSX.Element => {
    const { user, messageActiveId } = useTypedSelector(state => state.userReducer);
    const [message, setMessage] = useState<IMessages | null>(null)
    const [timeAgo, setTimeAgo] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [companion, setCompanion] = useState<IUser | null>(null)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (messageId) {
            onSnapshot(doc(db, "messages", messageId), (doc) => {
                const messageDoc = doc.data();
                setMessage({
                    users: messageDoc?.users,
                    id: messageDoc?.id,
                    lastСhange: messageDoc?.lastСhange,
                    lastMessages: messageDoc?.lastMessages,
                    messageArr: messageDoc?.messageArr
                })
            });
        };
    }, [messageId]);
    useEffect(() => {
        if (message) {
            getCompanion()
            setTimeAgo(formatTime(new Date(message?.lastСhange)))
            const interval = setInterval(() => {
                setTimeAgo(formatTime(new Date(message?.lastСhange)))
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [message])
    const getCompanion = async () => {
        const companionId: string | undefined = message?.users.find((item:string) => {
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
            setLoading(false)
        }
    }
    let body: string | undefined = !message?.lastMessages ? '' : message?.lastMessages;
    if (body!.length > 70) {
        body = `${body?.slice(0, 70)} ...`;
    }
    return (
        <>
            {!loading ?
                <div className={messageActiveId !== messageId ? "chat-item" : "chat-item chat-item--active"}
                    onClick={() => dispatch(getMessagesId(messageId))}>
                    <div className="chat-item__header">
                        <div className="chat-item__user"><img src={companion?.image ? companion?.image :
                            "https://windows10free.ru/uploads/posts/2017-02/thumbs/1487679899_icon-user-640x640.png"} alt="avatar" />
                            <h4>{companion?.nikname}</h4></div>
                        <p>{timeAgo}</p>
                    </div>
                    <p className="chat-item__last-messages">{body}</p>
                </div>
                : <div className="chat-item__loader"><Loader size={40} /></div>}
        </>
    )
}


export default ChatItem;