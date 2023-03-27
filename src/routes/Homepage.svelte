<script>
    import SessionStore from '../SessionStore';
    import InSession from './components/InSession.svelte';
    import ModalManager from './ModalManager.svelte';
    import { logoutFromGoogle } from '../Firebase';

    const startSessionModal = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "start",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
    };

    const seeActivitiesModal = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "activities",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
    };

    const logout = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
        logoutFromGoogle();
    };
</script>

<style>
    .isometric {
        display: block;
        margin: auto;
        margin-top: 6rem;
        width: 26rem;
        max-width: 80vw;
        -webkit-animation: mover 2s infinite  alternate;
        animation: mover 2s infinite  alternate;
    }

    .buffer {
        margin-top: 15vh;
    }

    .button {
        display: block;
        margin: auto;
        background-color: #F8DEC7;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 2rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        color: #DC83A4;
        cursor: pointer;
    }

    @-webkit-keyframes mover {
        0% { transform: translateY(0); }
        100% { transform: translateY(-20px); }
    }
    @keyframes mover {
        0% { transform: translateY(0); }
        100% { transform: translateY(-20px); }
    }

    .logout_button {
        cursor: pointer;
        width: 4rem;
        display: -webkit-box;
        margin-left: auto;
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img src="logout.png" alt="logout" class="logout_button" on:click={logout}>
{#if $SessionStore.inSession}
    <InSession/>
{:else}
    <div class="buffer"></div>
    <button id='studyhouseStartButton' on:click={startSessionModal} class="button" disabled>Turn On The StudyHouse Extension</button>
    <br>
    <button on:click={seeActivitiesModal} class="button">See Previous Activities</button>
    <img src="isometric.png" alt="isometric" class="isometric"> 
{/if}
<ModalManager/>
