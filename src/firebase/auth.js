// src/firebase/auth.js
import {
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import {
    auth
} from "./firebaseConfig";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // FE ONLY (belum DB)
    return {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
    };
};