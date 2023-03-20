import { writable } from 'svelte/store';

const SessionStore = writable<{
    inSession: boolean,
    modalOpen: boolean,
    sessionActivity: string
}>({
    inSession: false,
    modalOpen: false,
    sessionActivity: ""
});

export default {
    subscribe: SessionStore.subscribe,
    set: SessionStore.set
}