import React, { useEffect, useState } from "react";
import './Login.css'
import "firebase/firestore"
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { userLogin, userRegistration, userSavedLogin } from "../../store/action-creators/user";
import Loader from "../Loader/Loader";

const Login = (): JSX.Element => {
    const [register, setRegister] = useState<boolean>(false);
    const [nikname, setNikname] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { token, error, loading } = useTypedSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (token) {
            dispatch(userSavedLogin(token))
        }
    }, [])
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (register) {
            dispatch(userRegistration({ nikname, login, password }))
        }
        else { dispatch(userLogin({ login, password })) }
    }
    const changeNikname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNikname(event.target.value)
    }
    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLogin(event.target.value)
    }
    const changePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }
    const clickAnother = (): void => {
        setNikname('');
        setPassword('');
        setLogin('');
        setRegister(!register);
    }

    const content = !token ?
        <div className="login">
            {loading ? <div className="login-loader"><Loader size={50} color='#7CB8F7' /></div> : null}
            {error ? <p className="login-error">{error}</p> : null}
            <div className="login__container">
                {register ?
                    <>
                        <h2>Регистрация</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="login__element">
                                Никнейм:
                                <input type="text" value={nikname} onChange={changeNikname} />
                            </label>
                            <label className="login__element">
                                Логин:
                                <input type="text" value={login} onChange={changeLogin} />
                            </label>
                            <label className="login__element">
                                Пароль:
                                <input type="password" value={password} onChange={changePassword} />
                            </label>
                            <input className="login__submit" type="submit" value="Зарегистрироваться" />
                        </form >
                        <button type="button" className="login__another-button" onClick={clickAnother}>Войти</button>
                    </>
                    : <>
                        <h2>Вход</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="login__element">
                                Логин:
                                <input type="text" value={login} onChange={changeLogin} />
                            </label>
                            <label className="login__element">
                                Пароль:
                                <input type="password" value={password} onChange={changePassword} />
                            </label>
                            <input className="login__submit" type="submit" value="Войти" />
                        </form>
                        <button type="button" className="login__another-button" onClick={clickAnother}>Зарегистрироваться</button>
                    </>}
            </div>
        </div > : <div className="login"><div className="login-loader">< Loader size={100} color='#7CB8F7' /></div></div>

    return content
}


export default Login 