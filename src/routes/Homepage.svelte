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
        background-color: #DC83A4;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 2rem;
        padding: 1rem;
        border-radius: 1.5rem;
        color: #F8DEC7;
        cursor: pointer;
    }
    .big{
        display: flex;
    }

    .left-side{
        width: 25vw;

    }
    .middle-side{
        width: 50vw;

    }
    .right-side{
        width: 25vw;

    }
    .left-arrow, .right-arrow, .coin-icon{
        width: 4rem;
    }
    .top-bar {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .coin-bar{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 2rem;
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
    .top-bar-title{
        color: #DC83A4;
        padding-left: 4rem;
        padding-right: 4rem;
        font-size: 2.5rem;
    }
    .coin-value{
        color: #DC83A4;
        padding-left: 3rem;
        font-size: 2rem;
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img src="logout.png" alt="logout" class="logout_button" on:click={logout}>
{#if $SessionStore.inSession}
    <InSession/>
{:else}
    <div class="buffer"></div>
    <div class="big">
        <div class="left-side">
            <button id='studyhouseStartButton' on:click={startSessionModal} class="button" disabled>Turn On The StudyHouse Extension</button>
            <br>
            <button id='seePreviousActivities' on:click={seeActivitiesModal} class="button">See Previous Activities</button>
        </div>
        <div class="middle-side">
            <div class="top-bar">
                <img class ="left-arrow" src="left-arrow.png" alt="left-arrow" >
                <div class="top-bar-title"> Bedroom</div>
                <img class ="right-arrow" src="right-arrow.png" alt="right-arrow" >
            </div>
            
            <img src="isometric.png" alt="isometric" class="isometric"> 
        </div>
        <div class="right-side">
            <div class="coin-bar">
                <img src="coin-icon.png" alt="coin-icon" class="coin-icon"> 
                <div class="coin-value">000</div>
            </div>
            
            <button  class="button">Customize Study House</button>
        </div>
    </div>
    
    
{/if}
<ModalManager/>
