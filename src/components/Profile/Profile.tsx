import React, { useEffect, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { IUser } from '../../type/IUser';
import { updateUser } from '../../store/action-creators/user/updateUser';
import Loader from '../Loader';
import './Profile.css';

const Profile = (): JSX.Element => {
    const { user, token, loading, errorUpdate } = useTypedSelector((state) => state.userReducer);
    const [saveUser, setSaveUser] = useState<IUser | null>(user);
    const [nikname, setNikname] = useState<string>(user ? user.nikname : '');
    const [avatar, setAvatar] = useState<string>(user?.image ? user.image : '');
    const [password, setPassword] = useState<string>('');
    const [successChange, setSuccessChange] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user !== saveUser) {
            setSuccessChange(true);
            setSaveUser(user);
        }
    }, [user]);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setSuccessChange(false);
        if (user && token && user.password) {
            const newUser: IUser = {
                nikname,
                image: avatar,
                password,
                id: token,
            };
            if (password === '') {
                newUser.password = user.password;
            }
            if (avatar === '') {
                newUser.image = undefined;
            }
            if (nikname === '' || nikname === user.nikname) {
                newUser.nikname = user.nikname;
            }
            dispatch(updateUser(newUser));
        }
    };
    const changeNikname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNikname(event.target.value.split(' ').join(''));
    };
    const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAvatar(event.target.value.split(' ').join(''));
    };
    const changePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value.split(' ').join(''));
    };
    return (
        <div className='profile'>
            {loading ? (
                <div className='profile-loader'>
                    <Loader size={50} color='#7CB8F7' />
                </div>
            ) : null}
            {errorUpdate ? <p className='profile-error'>{errorUpdate}</p> : null}
            {successChange ? <p className='profile-success'>Успешные изменения</p> : null}
            <div className='profile__container'>
                <h2>Изменить профиль</h2>
                <form onSubmit={handleSubmit}>
                    <label className='profile__element'>
                        Никнейм:
                        <input type='text' value={nikname} onChange={changeNikname} />
                    </label>
                    <label className='profile__element'>
                        Аватар (url):
                        <input type='text' value={avatar} onChange={changeAvatar} />
                    </label>
                    <label className='profile__element'>
                        Пароль:
                        <input type='text' value={password} onChange={changePassword} />
                    </label>
                    <input className='profile__submit' type='submit' value='Изменить' />
                </form>
            </div>
        </div>
    );
};

export default Profile;
