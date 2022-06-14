import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface createMessagesProps {
    userToken: string;
    companionId: string;
}

export const createMessages = async ({ userToken, companionId }: createMessagesProps) => {
    const newMessages = {
        users: [userToken, companionId],
        lastСhange: Timestamp.now().toDate().toString()
    }
    const docRef = await addDoc(collection(db, "messages"), newMessages);
    await updateDoc(docRef, {
        id: docRef.id
    });
    const userRef = doc(db, "users", userToken);
    const userResponse = await getDoc(userRef);
    const companionRef = doc(db, "users", companionId);
    const companionResponse = await getDoc(companionRef);
    const messagesUser = userResponse.data()?.messages ? [docRef.id, ...userResponse.data()?.messages] : [docRef.id];
    const messagesCompanion = companionResponse.data()?.messages ? [docRef.id, ...companionResponse.data()?.messages] : [docRef.id];
    const friendsUser = userResponse.data()?.friends ? [companionId, ...userResponse.data()?.friends] : [companionId];
    const friendsCompanion = companionResponse.data()?.friends ? [userToken, ...companionResponse.data()?.friends] : [userToken];
    await updateDoc(userRef, {
        messages: messagesUser,
        friends: friendsUser
    });
    await updateDoc(companionRef, {
        messages: messagesCompanion,
        friends: friendsCompanion
    });
}