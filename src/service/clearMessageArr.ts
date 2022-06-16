import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const clearMessageArr = async (messageId: string) => {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, {
        messageArr: deleteField(),
        lastMessages: deleteField(),
    });
};
