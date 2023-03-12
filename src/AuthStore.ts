import { writable } from 'svelte/store';
import type firebase from 'firebase/auth'

const AuthStore = writable<{
    isLoggedIn: boolean,
    user?: firebase.UserInfo,
    firebaseControlled: boolean
}>({
    isLoggedIn: false,
    firebaseControlled: false
});

export default {
    subscribe: AuthStore.subscribe,
    set: AuthStore.set
}