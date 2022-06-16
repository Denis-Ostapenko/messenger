import { AppDispatch } from '../..';
import { userSlice } from '../../reducers/userReducer';

export const getMessagesId = (messageId: string | null) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.messageSuccess(messageId));
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        dispatch(userSlice.actions.userError(message));
    }
};
