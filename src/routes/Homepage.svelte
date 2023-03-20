<script>
    import SessionStore from '../SessionStore';
    import InSession from './components/InSession.svelte';
    import StartSession from './components/StartSession.svelte';
    import ActivitiesModal from './components/ActivitiesModal.svelte';
    import { logoutFromGoogle } from '../Firebase';
    import { writable } from 'svelte/store';
    import Modal from 'svelte-simple-modal';

    const modal = writable(null);

    const startSessionModal = () => {
        SessionStore.set({
            inSession: false,
            modalOpen: true,
            sessionActivity: ""
        });
        // @ts-ignore
        modal.set(StartSession);
    };

    const seeActivitiesModal = () => {
        SessionStore.set({
            inSession: false,
            modalOpen: true,
            sessionActivity: ""
        });
        // @ts-ignore
        modal.set(ActivitiesModal);
    };

    setInterval(() => {
        if (!$SessionStore.modalOpen) {
                modal.set(null);
            }
    }, 100);
</script>

<h1>Homepage</h1>
{#if $SessionStore.inSession}
    <InSession/>
{:else}
    <button id='studyhouseStartButton' on:click={startSessionModal} disabled>Turn On The StudyHouse Extension</button>
    <button on:click={seeActivitiesModal}>See Previous Activities</button>
{/if}
<br />
<button on:click={logoutFromGoogle}>Logout</button>

<Modal show={$modal}></Modal>