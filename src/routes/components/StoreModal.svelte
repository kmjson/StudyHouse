<script>

    import UserInfoStore from "../../UserInfoStore";
    import { buyRoom } from "../../Firebase";

    const bed_room_inventory = [
        {
            item_name: "Bedroom-Bed-1",
            price: 100
        },
        {
            item_name: "Bedroom-BBed-2",
            price: 500
        },
        {
            item_name: "Bedroom-BBed-3",
            price: 999999
        }
    ]
    const living_room_inventory = [
        {
            item_name: "Living-Bed-1",
            price: 100
        },
        {
            item_name: "Living-BBed-2",
            price: 500
        },
        {
            item_name: "Living-BBed-3",
            price: 999999
        }
    ]
    const library_inventory = [
        {
            item_name: "library-Bed-1",
            price: 100
        },
        {
            item_name: "library-BBed-2",
            price: 500
        },
        {
            item_name: "library-BBed-3",
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
    var currentRoom = "Bed_Room";

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
    .room-nav{
        display: flex;
    }
    .room-options{
        width: 33%;
    }
</style>

<div class="test">
    <h1>Store</h1>
    <div class="room-nav">
        <div class="room-options" id="bed-room">
            <button on:click={() => {currentRoom = "Bed_Room"}}> Bed Room</button>
        </div>
        <div class="room-options" id="living-room">
            <button on:click={() => {currentRoom = "Living_Room"}}> Living Room</button>
        </div>
        
        <div class="room-options" id="library">
            <button on:click={() => {currentRoom = "Library"}}> Library </button>
        </div>
    </div>
    {#if currentRoom=="Bed_Room"}
        {#each bed_room_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name)}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
    {:else if currentRoom=="Living_Room"}
        {#each living_room_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name)}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
    {:else}
        {#each library_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name)}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
    {/if}
    
    

    

</div>
