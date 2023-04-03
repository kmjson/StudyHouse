import { writable } from 'svelte/store';

const UserInfoStore = writable<{
    uid: string,
    coins: number,
    rooms: [string],
    decorations: [string]
}>({
    uid: "",
    coins: 0,
    rooms: [""],
    decorations: [""]
});

export default {
    subscribe: UserInfoStore.subscribe,
    set: UserInfoStore.set
}