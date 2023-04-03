<script>

    import UserInfoStore from "../../UserInfoStore";
    import { buyRoom } from "../../Firebase";

    const allRooms = [
        {
            room: "Gray",
            price: 0
        },
        {
            room: "Pink",
            price: 500
        },
        {
            room: "Luxury",
            price: 999999
        }
    ]

    const getClass = (/** @type {number} */ userCoins, /** @type {number} */ price) => {
        if (userCoins >= price) {
            return "valid"
        }
        return "invalid"
    }

    // @ts-ignore
    const purchase = (room, price) => {
        if ($UserInfoStore.coins >= price) {
            console.log("dfshsfjk");
            buyRoom(room, price);
        }
    }

</script>

<style>
    .button {
        display: block;
        /* margin: auto; */
        margin-bottom: 1rem;
        background-color: #F8DEC7;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 2rem;
        padding: 1rem;
        border-radius: 1.5rem;
        color: #DC83A4;
    }

    .valid {
        cursor: pointer;
    }

    .invalid {
        opacity: 0.5;
    }
</style>

<h1>Buy A New Room!</h1>
{#each allRooms as room}
    {#if !$UserInfoStore.rooms.includes(room.room)}
        <button on:click={() => purchase(room.room, room.price)} class="button {getClass($UserInfoStore.coins, room.price)}">{room.room} - {room.price}</button>
    {/if}
{/each}