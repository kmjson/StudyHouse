import { writable } from 'svelte/store';

const UserInfoStore = writable<{
    uid: string,
    name: string,
    email: string,
    coins: number,
    last_login: number,
    rooms: [string],
    decorations: [string],
    current: [string],
    friends: [{}],
    requests: [{}]
}>({
    uid: "",
    name: "",
    email: "",
    coins: 0,
    last_login: -1,
    rooms: [""],
    decorations: [""],
    current: [""],
    friends: [{}],
    requests: [{}]
});

export default {
    subscribe: UserInfoStore.subscribe,
    set: UserInfoStore.set
}