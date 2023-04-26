<script>

    import SessionStore from '../SessionStore';
    import InSession from './components/InSession.svelte';
    import ModalManager from './ModalManager.svelte';
    import { logoutFromGoogle } from '../Firebase';
    import UserInfoStore from '../UserInfoStore';
    import { onMount } from 'svelte';

    /**
	 * @type {string}
	 */
    let currentRoom;

    /**
	 * @type {boolean}
	 */
    let visible = true;

    onMount(() => {
        currentRoom = "Gray";    

        let newLogin = Date.now();
        let newLoginDate = new Date(newLogin).getDate();
            // newLogin = newLogin.getDate();
            // console.log($UserInfoStore.lastLogin.toString());
        let lastLoginDate = new Date ($UserInfoStore.lastLogin).getDate();

        console.log("newLogin homepage1", newLogin);
        console.log("newLogin homepage2", newLoginDate);
        console.log("lastLogin homepage1", lastLoginDate);
        console.log("lastLogin homepage2", $UserInfoStore.lastLogin);
    });

    const dailyRewardModal = () =>{
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "dailyReward",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
    }
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

    const customizationModal = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "customization",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
    };

    const storeModal = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "store",
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

    const leftButton = () => {
        if ($UserInfoStore.rooms.length > 1) {
            if (currentRoom == "Gray") {
                currentRoom = "Pink";
            }
            else if (currentRoom == "Pink") {
                currentRoom = "Gray";
            }
        }
    }

    const rightButton = () => {
        if ($UserInfoStore.rooms.length > 1) {
            if (currentRoom == "Gray") {
                currentRoom = "Pink";
            }
            else if (currentRoom == "Pink") {
                currentRoom = "Gray";
            }
        }
    }

    let newLogin = Date.now();
    let newLoginDate = new Date(newLogin).getDate();

    setInterval(() => {
        let lastLogin = $UserInfoStore.lastLogin;
        if (lastLogin != -1) {
            let lastLoginDate = new Date ($UserInfoStore.lastLogin).getDate();
            if (newLoginDate == lastLoginDate) {
                visible = false;
            }
        }
    }, 100)

    const clicked = () => {
        visible = false
    }
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
        color: white;
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
        cursor: pointer;
    }
    .top-bar {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .top-top-bar {
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
        text-align: center;
    }
    .coin-value{
        color: #DC83A4;
        padding-left: 3rem;
        font-size: 2rem;
    }

    .showButton{
        background-color: #F8DEC7;
        border: none;
    }
    .innerShowButton{
        display: block;
        margin: auto;
        background-color: #DC83A4;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 1rem;
        padding: 1rem;
        border-radius: 1.5rem;
        color: white;
        cursor: pointer;

    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="top-top-bar">
    {#if visible}
        <button on:click={clicked} class="showButton"> <button on:click={dailyRewardModal} class="innerShowButton">Daily Reward</button></button>
    {/if}
    <img src="logout.png" alt="logout" class="logout_button" on:click={logout}>
</div>

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
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img class ="left-arrow" src="left-arrow.png" alt="left-arrow" on:click={leftButton}>
                <div class="top-bar-title">{currentRoom} Bedroom</div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img class ="right-arrow" src="right-arrow.png" alt="right-arrow" on:click={rightButton}>
            </div>
            {#if currentRoom == "Pink"}
                <img src="Pink.png" alt="isometric" class="isometric"> 
            {:else if currentRoom == "Gray"}
                <img src="Gray.png" alt="isometric" class="isometric"> 
            {/if}
            <div class="coin-bar">
                <img src="coin-icon.png" alt="coin-icon" class="coin-icon"> 
                <div class="coin-value">{ $UserInfoStore.coins }</div>
            </div>
        </div>

        <div class="right-side">

            
            <button class="button" on:click={customizationModal}>Inventory</button>
            <br>
            <button class="button" on:click={storeModal}>Store</button>
        </div>
    </div>
            
    
{/if}
<ModalManager/>
