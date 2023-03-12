import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import AuthStore from "./AuthStore";

var firebaseConfig = {
    apiKey: 'AIzaSyByCa-MhbzY1ghAYjgcLLOHXyu2O1WP6x8',
    authDomain: 'studyhouse-74491.firebaseapp.com',
    projectId: 'studyhouse-74491',
    storageBucket: 'studyhouse-74491.appspot.com',
    messagingSenderId: '1058200447719',
    appId: '1:1058200447719:web:8923387544612014c25042',
    measurementId: 'G-KTGML69YYZ'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        const user = result.user;
        AuthStore.set({
            isLoggedIn: user !== undefined && user !== null,
            user: user,
            firebaseControlled: true
        });
    }
    catch (e) {
        console.log(e);
    }
}

async function logoutFromGoogle() {
    try {
        await signOut(auth);
        AuthStore.set({
            isLoggedIn: false,
            user: undefined,
            firebaseControlled: true
        });
    }
    catch (e) {
        console.log(e);
    }
}

export {
    loginWithGoogle,
    logoutFromGoogle
}