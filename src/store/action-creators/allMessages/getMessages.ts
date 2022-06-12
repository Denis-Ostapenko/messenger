import { doc, getDoc } from "firebase/firestore";
import { AppDispatch } from "../..";
import { db } from "../../../firebase";
import { IMessages } from "../../../models/IMessages";
import { allMessagesSlice } from "../../reducers/allMessagesReducer";

export const getMessages = (ArrIdMessages: string[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(allMessagesSlice.actions.messagesfetch())
        const newArrMessages: string[] = [];
        ArrIdMessages.forEach(async (messageId, index) => {
            const docRefMessage = await getDoc(doc(db, "messages", messageId));
            const messageDoc = docRefMessage.data();
            const message = messageDoc?.id;
            newArrMessages.push(message)
            if (index === ArrIdMessages.length - 1) {
                dispatch(allMessagesSlice.actions.messagesfetchSuccess(newArrMessages))
            }
        });
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(allMessagesSlice.actions.messagesfetchError(message))
    }
}