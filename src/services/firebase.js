import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA1cBw9ng5YlalBulydw4EtekBTWBsey8Q",
    authDomain: "finalproject-be8d0.firebaseapp.com",
    projectId: "finalproject-be8d0",
    storageBucket: "finalproject-be8d0.firebasestorage.app",
    messagingSenderId: "1025273934891",
    appId: "1:1025273934891:web:be92b7ac6b9b8c4404666e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
