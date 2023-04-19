import { writable } from 'svelte/store';

const UserInfoStore = writable<{
    uid: string,
    coins: number,
    rooms: [string],
    decorations: [string]
    current: [string]
}>({
    uid: "",
    coins: 0,
    rooms: [""],
    decorations: [""],
    current: [""]
});

export default {
    subscribe: UserInfoStore.subscribe,
    set: UserInfoStore.set
}