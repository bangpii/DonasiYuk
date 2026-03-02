// src/firebase/firebaseConfig.js
import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2ZMUcuNKKACe5Fcoh5tX4l79hYITxg74",
    authDomain: "donasiyuk-cd662.firebaseapp.com",
    projectId: "donasiyuk-cd662",
    storageBucket: "donasiyuk-cd662.firebasestorage.app",
    messagingSenderId: "1095651245763",
    appId: "1:1095651245763:web:340b9a7e671de2208c2c76",
};

const app = initializeApp(firebaseConfig);

// 🔑 AUTH dipakai oleh FE
export const auth = getAuth(app);