import { collection, getDocs } from "firebase/firestore";
import { AppDispatch } from "../..";
import { db } from "../../../firebase";
import { IUser } from "../../../models/IUser";
import { userSlice } from "../../reducers/userReducer";

class ValidationUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationUserError";
    }
}

interface userLoginProps {
    login: string;
    password: string;
}

export const userLogin = ({ login, password }: userLoginProps) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userLogin())
        const response = await getDocs(collection(db, "users"))
        let errorMessage = ''
        let newUser: IUser | null = null;
        response.forEach((element) => {
            const user = element.data();
            if (user.login === login && user.password === password) {
                newUser = {
                    nikname: user.nikname,
                    image: user.image,
                    messages: user.messages,
                    friends: user.friends,
                    id: user.id
                }
                errorMessage = ''
                dispatch(userSlice.actions.userLoginSuccess(newUser))
                localStorage.setItem('token', element.id);
                dispatch(userSlice.actions.userLoginToken(element.id))
            }
            if (user.login === login && user.password !== password) {
                throw new ValidationUserError('Некорректный пароль')
            }
            if (user.login !== login) {
                errorMessage = 'Некорректный логин'
            }

        })
        if (!newUser && errorMessage !== '') {
            throw new ValidationUserError(errorMessage)
        }
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(userSlice.actions.userLoginError(message))
    }
}