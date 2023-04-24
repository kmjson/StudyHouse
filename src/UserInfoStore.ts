import { writable } from 'svelte/store';

const UserInfoStore = writable<{
    uid: string,
    coins: number,
    rooms: [string],
    decorations: [string]
    lastLogin: number
}>({
    uid: "",
    coins: 0,
    rooms: [""],
    decorations: [""],
    lastLogin: 0
    // Date.now()
});

export default {
    subscribe: UserInfoStore.subscribe,
    set: UserInfoStore.set
}