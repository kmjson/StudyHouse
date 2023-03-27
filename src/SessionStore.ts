import { writable } from 'svelte/store';

const SessionStore = writable<{
    inSession: boolean,
    sessionLength: number,
    modalType: string,
    counter: number,
    sessionActivity: string
}>({
    inSession: false,
    sessionLength: 0,
    modalType: "",
    counter: 0,
    sessionActivity: ""
});

export default {
    subscribe: SessionStore.subscribe,
    set: SessionStore.set
}