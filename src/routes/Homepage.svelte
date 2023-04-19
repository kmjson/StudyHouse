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

    onMount(() => {
        currentRoom = "Bedroom";
    });

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

    const inventoryModal = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "inventory",
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
            if (currentRoom == "Bedroom") {
                currentRoom = "Library";
            }
            else if (currentRoom == "Library") {
                currentRoom = "Bedroom";
            }
        }
    }

    const rightButton = () => {
        if ($UserInfoStore.rooms.length > 1) {
            if (currentRoom == "Bedroom") {
                currentRoom = "Library";
            }
            else if (currentRoom == "Library") {
                currentRoom = "Bedroom";
            }
        }
    }
</script>

<style>
    .frame {
        width: 30rem;
        margin: auto;
        margin-top: 3rem;
        -webkit-animation: mover 2s infinite  alternate;
        animation: mover 2s infinite  alternate;
        position: relative;
        top: 0;
        left: 0;
    }

    .isometric {
        display: block;
        position: relative;
        margin: auto;
        width: 30rem;
        top: 0;
        left: 0;
    }

    .left {
        position: absolute;
        z-index: 1;
        top: 12rem;
        left: 5rem;
        width: 5rem;
    }

    .right {
        position: absolute;
        z-index: 1;
        top: 12rem;
        right: 5rem;
        width: 5rem;
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
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img class ="left-arrow" src="left-arrow.png" alt="left-arrow" on:click={leftButton}>
                <div class="top-bar-title">{currentRoom}</div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img class ="right-arrow" src="right-arrow.png" alt="right-arrow" on:click={rightButton}>
            </div>
            <div class="frame">
                {#if currentRoom == "Bedroom"}
                    <img src="Gray.png" alt="isometric" class="isometric"> 

                    {#if $UserInfoStore.current.includes("Desk-1")}
                        <img src="green.png" alt="" class="left">
                    {:else if $UserInfoStore.current.includes("Desk-2")}
                        <img src="purple.png" alt="" class="left">
                    {/if}

                    {#if $UserInfoStore.current.includes("Bed-1")}
                        <img src="green.png" alt="" class="right">
                    {:else if $UserInfoStore.current.includes("Bed-2")}
                        <img src="purple.png" alt="" class="right">
                    {/if}

                {:else if currentRoom == "Library"}
                    <img src="Pink.png" alt="isometric" class="isometric"> 

                    {#if $UserInfoStore.current.includes("Bookshelf-1")}
                        <img src="green.png" alt="" class="left">
                    {:else if $UserInfoStore.current.includes("Bookshelf-2")}
                        <img src="purple.png" alt="" class="left">
                    {/if}

                    {#if $UserInfoStore.current.includes("Chair-1")}
                        <img src="green.png" alt="" class="right">
                    {:else if $UserInfoStore.current.includes("Chair-2")}
                        <img src="purple.png" alt="" class="right">
                    {/if}

                {/if}
            </div>
        </div>
        <div class="right-side">
            <button class="button" on:click={inventoryModal}>Inventory</button>
            <br>
            <button class="button" on:click={storeModal}>Store</button>
        </div>
    </div>
    <br>
    <div class="coin-bar">
        <img src="coin-icon.png" alt="coin-icon" class="coin-icon"> 
        <div class="coin-value">{ $UserInfoStore.coins }</div>
    </div>
    
{/if}
<ModalManager/>
