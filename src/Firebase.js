import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection,  query, where, doc, setDoc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { get } from 'svelte/store';
import AuthStore from "./AuthStore";
import UserInfoStore from "./UserInfoStore";

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
const db = getFirestore(app);

/**
 * @type {import("@firebase/firestore").Unsubscribe}
 */
let unsubscribe;

async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        const user = result.user;
        try {
            const uid = user.uid;
            let uid_str = String(uid);
            console.log(uid_str);
            const docRef = doc(db, "userInfo", uid_str);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                try {
                    const newUserRef = collection(db, "userInfo");
                    await setDoc(doc(newUserRef, uid_str), {
                        "uid": uid_str,
                        "coins": 0,
                        "rooms": ["Gray"],
                        "decorations": [],
                        "lastLogin": Date.now()
                    });
                }
                catch (e) {
                    console.log(e)
                }
            } 
            unsubscribe = onSnapshot(doc(db, "userInfo", uid_str), (doc) => {
                try {
                    // @ts-ignore
                    if (doc.data() != undefined && doc.data().uid == uid_str) {
                        UserInfoStore.set({
                            // @ts-ignore
                            uid: doc.data().uid,
                            // @ts-ignore
                            coins: doc.data().coins,
                            // @ts-ignore
                            rooms: doc.data().rooms,
                            // @ts-ignore
                            decorations: doc.data().decorations,
                            // @ts-ignore
                            lastLogin: doc.data().lastLogin
                        });
                    }
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
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
        unsubscribe();
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

/**
 * @param {any} activity
 * @param {any} date
 * @param {any} length
 */
async function addActivity(activity, date, length) {
    try {
        const uid = get(AuthStore).user?.uid;
        const newActivityRef = doc(collection(db, "activities"));
        await setDoc(newActivityRef, {
            "uid": uid,
            "activity": activity,
            "date": date,
            "length": length
        });
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "uid": get(UserInfoStore).uid,
            "coins": get(UserInfoStore).coins + Math.round(length/1000),
            "rooms":  get(UserInfoStore).rooms,
            "decorations": get(UserInfoStore).decorations,
            "lastLogin": get(UserInfoStore).lastLogin
        });
    }
    catch (e) {
        console.log(e);
    }
}

async function getActivities() {
    try {
        const uid = get(AuthStore).user?.uid;
        const q = query(collection(db, "activities"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        /**
         * @type {{ activity: any; date: any; length: any; }[]}
         */
        let ret = [];
        querySnapshot.forEach((doc) => {
            ret.push({
                "activity": doc.data().activity,
                "date": doc.data().date,
                "length": doc.data().length
            });
        });
        return ret;
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * @param {string} room
 * @param {number} price
 */
async function buyRoom(room, price) {
    try {
        let rooms = get(UserInfoStore).rooms;
        rooms.push(room);
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "uid": get(UserInfoStore).uid,
            "coins": get(UserInfoStore).coins - price,
            "rooms": rooms,
            "decorations": get(UserInfoStore).decorations,
            "lastLogin": get(UserInfoStore).lastLogin
            
        });
    }
    catch (e) {
        console.log(e);
    }
}
/**
 * @param {string} decoration
 * @param {number} price
 */
async function buyDecoration(decoration, price) {
    try {
        let decorations = get(UserInfoStore).rooms;
        decorations.push(decoration);
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "uid": get(UserInfoStore).uid,
            "coins": get(UserInfoStore).coins - price,
            "rooms": get(UserInfoStore).rooms,
            "decorations": decorations,
            "lastLogin": get(UserInfoStore).lastLogin
        });
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * 
 * @param {number} newTime 
 */
async function addLastLogin(newTime){
    try{
        let currentime = Date.now();
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "uid": get(UserInfoStore).uid,
            "coins": get(UserInfoStore).coins  + 100,
            "rooms":  get(UserInfoStore).rooms,
            "decorations": get(UserInfoStore).decorations,
            "lastLogin": newTime
        });
    }
    catch (e){
        console.log(e);
    }
}
/*

Adding daily reward function

    ->at the mount portion

Friend list func

Add
Delete
Reject

*/

export {
    loginWithGoogle,
    logoutFromGoogle,
    addActivity,
    getActivities,
    buyRoom,
    buyDecoration,
    addLastLogin
}