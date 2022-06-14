import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IMessage } from "../models/IMessages";

interface addMessageProps {
    messageId: string;
    userMessage: string;
    text: string;
}

export const addMessage = async ({ messageId, userMessage, text }: addMessageProps) => {
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

}