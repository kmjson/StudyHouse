import { writable } from 'svelte/store';

const UserInfoStore = writable<{
    uid: string,
    coins: number,
    rooms: [string],
    decorations: [string],
    lastLogin: number,
    // friends: [string],
    // requests: [string],
    // email: string
}>({
    uid: "",
    coins: 0,
    rooms: [""],
    decorations: [""],
    lastLogin: -1
    // Date.now()
    // friends: [""],
    // requests: [""],
    // email: ""
});

export default {
    subscribe: UserInfoStore.subscribe,
    set: UserInfoStore.set
}