import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteMessage = async (messageId: string, usersId: string[]) => {
    usersId.forEach(async (userId, index) => {
        const userRef = doc(db, 'users', userId);
        const responseUser = await getDoc(userRef);
        const newMessageArr: string[] = [];
        const newFriends: string[] = [];
        responseUser.data()?.messages.forEach(async (message: string, index: number) => {
            if (message !== messageId) {
                newMessageArr.push(message);
            }
            if (index === responseUser.data()?.messages.length - 1) {
                await updateDoc(userRef, {
                    messages: newMessageArr,
                });
            }
        });
        responseUser.data()?.friends.forEach(async (friend: string, index: number) => {
            if (friend !== usersId[0] && friend !== usersId[1]) {
                newFriends.push(friend);
            }
            if (index === responseUser.data()?.friends.length - 1) {
                await updateDoc(userRef, {
                    friends: newFriends,
                });
            }
        });
        if (index === usersId.length - 1) {
            await updateDoc(userRef, {
                friends: newFriends,
            });
            await deleteDoc(doc(db, 'messages', messageId));
        }
    });
};
