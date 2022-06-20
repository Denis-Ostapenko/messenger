import React, { useEffect, useState } from 'react';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { getMessagesId } from '../../store/action-creators/message/getMessagesId';
import { updateUserFriends, updateUserMessages } from '../../store/action-creators/user';
import { db } from '../../firebase';
import ChatItem from '../ChatItem';
import NewChat from '../NewChat';
import './ChatList.css';

const Chats = (): JSX.Element => {
    const [newChat, setNewChat] = useState<boolean>(false);
    const [buttonNewChat, setButtonNewChat] = useState<string>('Создать новый чат');
    const [searhMessage, setSearhMessage] = useState<string>('');
    const [messagesArr, setMessagesArr] = useState<string[] | undefined>(undefined);
    const { user, isMobile } = useTypedSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user) {
            setMessagesArr(user.messages);
            onSnapshot(doc(db, 'users', user.id), (doc) => {
                const userDoc = doc.data();
                if (JSON.stringify(userDoc?.messages) !== JSON.stringify(user.messages)) {
                    dispatch(updateUserMessages(userDoc?.messages));
                }
                if (JSON.stringify(userDoc?.friends) !== JSON.stringify(user.friends)) {
                    dispatch(updateUserFriends(userDoc?.friends));
                }
            });
        }
    }, [user]);
    useEffect(() => {
        if (user?.messages) {
            setMessagesArr(user.messages);
            if (!isMobile) {
                dispatch(getMessagesId(user.messages[0]));
            }
        }
    }, [user?.messages]);
    useEffect(() => {
        if (searhMessage === '' && user?.messages !== messagesArr) {
            setMessagesArr(user?.messages);
        }
        if (searhMessage !== '') {
            const newMessagesArr: string[] = [];
            user?.messages?.forEach(async (message, index) => {
                const responseMessages = await getDoc(doc(db, 'messages', message));
                const resMessages = responseMessages.data();
                const companionId = resMessages?.users.find((item: string) => {
                    if (user && item !== user.id) {
                        return item;
                    }
                    return undefined;
                });
                const responseCompanion = await getDoc(doc(db, 'users', companionId));
                const companion = responseCompanion.data();
                const companionToLower = companion?.nikname.toLowerCase();
                const searhMessageToLower = searhMessage.toLowerCase();
                if (companionToLower.startsWith(searhMessageToLower)) {
                    newMessagesArr.push(message);
                }
                if (user.messages && index === user.messages.length - 1) {
                    setMessagesArr(newMessagesArr);
                }
            });
        }
    }, [searhMessage]);
    const changeSearh = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearhMessage(event.target.value);
    };
    const clickButtonNewChat = (): void => {
        setNewChat(!newChat);
        if (buttonNewChat === 'Создать новый чат') {
            setButtonNewChat('Cкрыть список пользователей');
        } else setButtonNewChat('Создать новый чат');
    };
    return (
        <div className='chat-list'>
            <button
                className='chat-list__new-chat'
                type='button'
                onClick={clickButtonNewChat}
                style={
                    newChat
                        ? { backgroundColor: '#ff6565' }
                        : {
                              backgroundImage: `linear-gradient(92.68deg, #7CB8F7 0%, #2A8BF2 100%)`,
                          }
                }
            >
                {buttonNewChat}
            </button>
            {newChat ? <NewChat /> : null}
            <input
                className='chat-list__searh'
                type='searh'
                placeholder='Поиск чата'
                value={searhMessage}
                onChange={changeSearh}
            />
            <div className='chat-list__container'>
                {messagesArr?.map((messageId: string) => {
                    return <ChatItem key={messageId} messageId={messageId} />;
                })}
            </div>
        </div>
    );
};

export default Chats;
