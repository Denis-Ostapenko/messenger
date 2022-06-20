import React, { useEffect, useState } from 'react';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { IUser } from '../../type/IUser';
import { createMessages } from '../../service/createMessages';
import { fetchUsers } from '../../store/action-creators/allUsers';
import Loader from '../Loader';
import { CreateIcon } from '../CreateIcon';
import './NewChat.css';

const NewChat = () => {
    const { users, error, loading } = useTypedSelector((state) => state.allUsersReducer);
    const { user, token } = useTypedSelector((state) => state.userReducer);
    const [userArr, setUserArr] = useState<IUser[] | undefined>(undefined);
    const [searhUser, setSearhUser] = useState<string>('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
        setUserArr(users);
    }, [users]);
    useEffect(() => {
        const newUserArr = users?.filter((user) => {
            return user.nikname.startsWith(searhUser);
        });
        setUserArr(newUserArr);
    }, [searhUser]);
    const changeSearhUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearhUser(event.target.value);
    };
    const createNewChat = (companionId: string): void => {
        if (token) {
            createMessages({ userToken: token, companionId });
        }
    };

    return (
        <div className='new-chat'>
            <input
                className='new-chat__searh'
                type='searh'
                placeholder='Поиск пользователя'
                value={searhUser}
                onChange={changeSearhUser}
            />
            <div className='new-chat__list'>
                {error}
                {!loading ? (
                    userArr?.map((companion) => {
                        if (user?.nikname === companion.nikname || user?.friends?.includes(companion.id)) {
                            return null;
                        }
                        return (
                            <div key={companion.id} className='new-chat__item'>
                                <div className='new-chat__user'>
                                    <img
                                        className='new-chat__image'
                                        src={
                                            companion.image
                                                ? companion.image
                                                : 'https://windows10free.ru/uploads/posts/2017-02/thumbs/1487679899_icon-user-640x640.png'
                                        }
                                        alt=''
                                    />
                                    <p className='new-chat__nickname'>{companion.nikname}</p>
                                </div>
                                <button className='new-chat__button' onClick={() => createNewChat(companion.id)}>
                                    <CreateIcon
                                        component={<ForumOutlinedIcon />}
                                        sx={{ fontSize: 30 }}
                                        color='inherit'
                                    />
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className='new-chat__loader'>
                        <Loader size={40} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewChat;
