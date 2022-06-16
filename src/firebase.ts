import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyB5YJDN7ktqwX58MXhf8un96McjsGCklOQ',
    authDomain: 'messenger-a4826.firebaseapp.com',
    projectId: 'messenger-a4826',
    storageBucket: 'messenger-a4826.appspot.com',
    messagingSenderId: '11064466188',
    appId: '1:11064466188:web:e7394c37ed6d26c4abc729',
    measurementId: 'G-Z4JLJ9KWQ0',
};
const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
