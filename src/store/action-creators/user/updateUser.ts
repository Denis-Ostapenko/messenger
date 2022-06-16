import { AppDispatch } from '../..';
import { userSlice } from '../../reducers/userReducer';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { IUser } from '../../../models/IUser';

class ValidationUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationUserError';
    }
}

interface userRegistrationProps {
    nikname: string;
    image?: string | undefined;
    password?: string;
    id: string;
}

export const updateUser =
    ({ nikname, image, password, id }: userRegistrationProps) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.userLogin());
            const responseUser = await getDoc(doc(db, 'users', id));
            const user: IUser = {
                nikname: responseUser.data()?.nikname,
                password: responseUser.data()?.password,
                image: responseUser.data()?.image,
                messages: responseUser.data()?.messages,
                friends: responseUser.data()?.friends,
                id: responseUser.data()?.id,
            };
            if (image) {
                try {
                    new URL(image);
                } catch (error) {
                    throw new ValidationUserError('Невалидный url');
                }
            }
            const responseUsers = await getDocs(collection(db, 'users'));
            if (nikname !== undefined && nikname?.length < 3 && nikname !== user.nikname) {
                throw new ValidationUserError('Ваш никнейм должен содержать более 3 символов');
            }
            if (password !== undefined && password?.length < 5 && password !== user.password) {
                throw new ValidationUserError('Ваш пароль должен содержать более 5 символов');
            }
            responseUsers.forEach((element) => {
                const userfeth = element.data();
                if (userfeth.nikname === nikname && user.nikname !== nikname) {
                    throw new ValidationUserError('Никнейм занят');
                }
            });
            const userRef = doc(db, 'users', id);
            let updateUser = {};
            if (image && image !== user.image) {
                updateUser = {
                    ...updateUser,
                    image,
                };
            }
            if (password !== user.password) {
                updateUser = {
                    ...updateUser,
                    password,
                };
            }
            if (nikname !== user.nikname) {
                updateUser = {
                    ...updateUser,
                    nikname,
                };
            }
            if (Object.keys(updateUser).length !== 0) {
                await updateDoc(userRef, updateUser);
                const responseNewUser = await getDoc(doc(db, 'users', id));
                const newUser: IUser = {
                    nikname: responseNewUser.data()?.nikname,
                    password: responseNewUser.data()?.password,
                    image: responseNewUser.data()?.image,
                    messages: responseNewUser.data()?.messages,
                    friends: responseNewUser.data()?.friends,
                    id: responseNewUser.data()?.id,
                };
                dispatch(userSlice.actions.userLoginSuccess(newUser));
            }
            if (Object.keys(updateUser).length === 0) {
                dispatch(userSlice.actions.updateFinished());
            }
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            dispatch(userSlice.actions.updateError(message));
        }
    };

export const updateUserFriends = (friends: string[]) => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.updateUserFriends(friends));
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        dispatch(userSlice.actions.userError(message));
    }
};

export const updateUserMessages = (message: string[]) => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.updateUserMessages(message));
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        dispatch(userSlice.actions.userError(message));
    }
};
