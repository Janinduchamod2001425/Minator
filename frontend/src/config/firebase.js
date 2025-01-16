// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdFqDUekBuis-EzN4DcbTmq_-BotsCyVE",
    authDomain: "gymmanagementsystem-f394d.firebaseapp.com",
    projectId: "gymmanagementsystem-f394d",
    storageBucket: "gymmanagementsystem-f394d.firebasestorage.app",
    messagingSenderId: "535199624844",
    appId: "1:535199624844:web:c7f4d714aeb43a22ab95a9",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
