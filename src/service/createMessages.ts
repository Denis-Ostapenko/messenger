import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface createMessagesProps {
    userToken: string;
    companionId: string;
}

export const createMessages = async ({ userToken, companionId }: createMessagesProps) => {
    const newMessages = {
        users: [userToken, companionId],
        lastСhange: Timestamp.now().toDate().toString(),
    };
    const docRef = await addDoc(collection(db, 'messages'), newMessages);
    await updateDoc(docRef, {
        id: docRef.id,
    });
    const userRef = doc(db, 'users', userToken);
    const userResponse = (await getDoc(userRef)).data();
    const companionRef = doc(db, 'users', companionId);
    const companionResponse = (await getDoc(companionRef)).data();
    const messagesUser = userResponse?.messages ? [docRef.id, ...userResponse.messages] : [docRef.id];
    const messagesCompanion = companionResponse?.messages ? [docRef.id, ...companionResponse.messages] : [docRef.id];
    const friendsUser = userResponse?.friends ? [companionId, ...userResponse.friends] : [companionId];
    const friendsCompanion = companionResponse?.friends ? [userToken, ...companionResponse.friends] : [userToken];
    await updateDoc(userRef, {
        messages: messagesUser,
        friends: friendsUser,
    });
    await updateDoc(companionRef, {
        messages: messagesCompanion,
        friends: friendsCompanion,
    });
};
