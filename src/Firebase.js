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
            const name = user.displayName;
            let name_str = String(name);
            const email = user.email;
            let email_str = String(email);
            const docRef = doc(db, "userInfo", uid_str);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                try {
                    const newUserRef = collection(db, "userInfo");
                    await setDoc(doc(newUserRef, uid_str), {
                        "uid": uid_str,
                        "name": name_str,
                        "email": email_str,
                        "coins": 5000,
                        "last_login": 0,
                        "rooms": ["Bedroom"],
                        "decorations": [],
                        "current": [],
                        "friends": [],
                        "requests": [],
                    });
                    const newEmailRef = collection(db, "emailInfo");
                    await setDoc(doc(newEmailRef, email_str), {
                        "uid": uid_str,
                        "name": name_str,
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
                            name: doc.data().name,
                            // @ts-ignore
                            email: doc.data().email,
                            // @ts-ignore
                            coins: doc.data().coins,
                            // @ts-ignore
                            last_login: doc.data().last_login,
                            // @ts-ignore
                            rooms: doc.data().rooms,
                            // @ts-ignore
                            decorations: doc.data().decorations,
                            // @ts-ignore
                            current: doc.data().current,
                            // @ts-ignore
                            friends: doc.data().friends,
                            // @ts-ignore
                            requests: doc.data().requests
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
            "name": get(UserInfoStore).name,
            "email": get(UserInfoStore).email,
            "activity": activity,
            "date": date,
            "length": length
        });
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "coins": get(UserInfoStore).coins + Math.round(length/1000),
        });
    }
    catch (e) {
        console.log(e);
    }
}

async function getActivities() {
    try {
        let uid_list = [get(UserInfoStore).uid];
        for (let i = 0; i < get(UserInfoStore).friends.length; i++) {
            // @ts-ignore
            uid_list.push(get(UserInfoStore).friends[i].uid);
        }
        const q = query(collection(db, "activities"), where("uid", "in", uid_list));
        const querySnapshot = await getDocs(q);
        // @ts-ignore
        let ret = [];
        querySnapshot.forEach((doc) => {
            ret.push({
                "uid": doc.data().uid,
                "name": doc.data().name,
                "email": doc.data().email,
                "activity": doc.data().activity,
                "date": doc.data().date,
                "length": doc.data().length
            });
        });
        // @ts-ignore
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
            "coins": get(UserInfoStore).coins - price,
            "rooms": rooms,
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
        let decorations = get(UserInfoStore).decorations;
        decorations.push(decoration);
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "coins": get(UserInfoStore).coins - price,
            "decorations": decorations,
        });
    }
    catch (e) {
        console.log(e);
    }
}


/**
 * @param {any} list
 */
async function setCurrent(list) {
    try {
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "current": list
        });
    }
    catch (e) {
        console.log(e);
    }
}

async function getDaily() {
    try {
        const date = new Date();
        await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
            "last_login": date.getTime(),
            "coins": get(UserInfoStore).coins + 100,
        });
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * @param {string} reciever
 */
async function sendFriendRequest(reciever) {
    try {
        const emailRef = doc(db, "emailInfo", reciever);
        const emailSnap = await getDoc(emailRef);
        if (emailSnap.exists()) {
            let emailData = emailSnap.data();
            const userRef = doc(db, "userInfo", emailData.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                let userData = userSnap.data();
                let friends = userData.friends;
                let requests = userData.requests;

                let contains = false;
                for (let i = 0; i < requests.length; i++) {
                    if (requests[i].uid == get(UserInfoStore).uid) {
                        contains = true;
                    }
                }

                for (let i = 0; i < friends.length; i++) {
                    if (friends[i].uid == get(UserInfoStore).uid) {
                        contains = true;
                    }
                }

                if (!contains && userData.uid != get(UserInfoStore).uid) {
                    requests.push(
                        {
                            "name": get(UserInfoStore).name,
                            "email": get(UserInfoStore).email,
                            "uid": get(UserInfoStore).uid,
                        }
                    )
                    await updateDoc(doc(db, "userInfo", userData.uid), {
                        "requests": requests
                    })
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * @param {string} name
 * @param {string} email
 * @param {string} uid
 */
async function acceptFriendRequest(name, email, uid) {
    try {
        const accepterRef = doc(db, "userInfo", get(UserInfoStore).uid);
        const accepterSnap = await getDoc(accepterRef);
        if (accepterSnap.exists()) {
            let friends = get(UserInfoStore).friends;
            friends.push(
                {
                    "name": name,
                    "email" : email,
                    "uid": uid
                }
            );
            let old_requests = get(UserInfoStore).requests;
            let requests = old_requests.filter((value) => {
                // @ts-ignore
                return !(value.uid == uid);
            })
            await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
                "friends": friends,
                "requests": requests
            });
        }
        const senderRef = doc(db, "userInfo", uid);
        const senderSnap = await getDoc(senderRef);
        if (senderSnap.exists()) {
            let friends = senderSnap.data().friends;
            friends.push(
                {
                    "name": get(UserInfoStore).name,
                    "email": get(UserInfoStore).email,
                    "uid": get(UserInfoStore).uid
                }
            );
            let old_requests = senderSnap.data().requests;
            // @ts-ignore
            let requests = old_requests.filter((value) => {
                // @ts-ignore
                return !(value.uid == get(UserInfoStore).uid);
            })
            await updateDoc(doc(db, "userInfo", uid), {
                "friends": friends,
                "requests": requests
            });
        }
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * @param {string} name
 * @param {string} email
 * @param {string} uid
 */
async function declineFriendRequest(name, email, uid) {
    try {
        const accepterRef = doc(db, "userInfo", get(UserInfoStore).uid);
        const accepterSnap = await getDoc(accepterRef);
        if (accepterSnap.exists()) {
            let old_requests = get(UserInfoStore).requests;
            let requests = old_requests.filter((value) => {
                // @ts-ignore
                return !(value.uid == uid);
            })
            await updateDoc(doc(db, "userInfo", get(UserInfoStore).uid), {
                "requests": requests
            });
        }
    }
    catch (e) {
        console.log(e);
    }
}

export {
    loginWithGoogle,
    logoutFromGoogle,
    addActivity,
    getActivities,
    buyRoom,
    buyDecoration,
    setCurrent,
    getDaily,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
}