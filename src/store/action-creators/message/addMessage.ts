import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { AppDispatch } from "../..";
import { db } from "../../../firebase";
import { IMessage, IMessages } from "../../../models/IMessages";
import { allMessagesSlice } from "../../reducers/allMessagesReducer";

interface addMessageProps {
    messageId: string;
    userMessage: string;
    text: string;
}

export const addMessage = ({ messageId, userMessage, text }: addMessageProps) => async (dispatch: AppDispatch) => {
    try {
        const newMessage: IMessage = {
            userMessage,
            text,
            date: Timestamp.now().toDate().toString()
        }
        const messageRef = doc(db, "messages", messageId);
        const messageResponse = await getDoc(messageRef);
        const messageArr = messageResponse.data()?.messageArr ? [newMessage, ...messageResponse.data()?.messageArr] : [newMessage];
        await updateDoc(messageRef, {
            lastСhange: newMessage.date,
            lastMessages: newMessage.text,
            messageArr: [...messageArr]
        });
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(allMessagesSlice.actions.messagesfetchError(message))
    }
}