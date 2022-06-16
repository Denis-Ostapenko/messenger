import { collection, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { userSlice } from '../../reducers/userReducer';
import { AppDispatch } from '../..';
import { IUser } from '../../../models/IUser';

class ValidationUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationUserError';
    }
}

interface userRegistrationProps {
    nikname: string;
    login: string;
    password: string;
}

export const userRegistration =
    ({ nikname, login, password }: userRegistrationProps) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.userLogin());
            const response = await getDocs(collection(db, 'users'));
            if (login !== undefined && login?.length < 5) {
                throw new ValidationUserError('Ваш логин должен содержать более 5 символов');
            }
            if (nikname !== undefined && nikname?.length < 3) {
                throw new ValidationUserError('Ваш никнейм должен содержать более 3 символов');
            }
            if (password !== undefined && password?.length < 5) {
                throw new ValidationUserError('Ваш пароль должен содержать более 5 символов');
            }
            response.forEach((element) => {
                const user = element.data();
                if (user.nikname === nikname) {
                    throw new ValidationUserError('Никнейм занят');
                }
                if (user.login === login) {
                    throw new ValidationUserError('Логин занят');
                }
            });
            const docRef = await addDoc(collection(db, 'users'), {
                nikname,
                login,
                password,
                friends: [],
                messages: [],
            });
            await updateDoc(docRef, {
                id: docRef.id,
            });
            const newUser: IUser = {
                nikname,
                login,
                password,
                id: docRef.id,
                friends: [],
                messages: [],
            };
            dispatch(userSlice.actions.userLoginSuccess(newUser));
            localStorage.setItem('token', docRef.id);
            dispatch(userSlice.actions.userLoginToken(docRef.id));
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            dispatch(userSlice.actions.userError(message));
        }
    };
