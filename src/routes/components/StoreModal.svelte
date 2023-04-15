<script>

    import UserInfoStore from "../../UserInfoStore";
    import { buyRoom } from "../../Firebase";

    const bed_room_inventory = [
        {
            item_name: "Bed-1",
            item_type: "Bed",
            price: 100
        },
        {
            item_name: "Bed-2",
            item_type: "Bed",
            price: 500
        },
        {
            item_name: "Desk-1",
            item_type: "Desk",
            price: 100
        },
        {
            item_name: "Desk-2",
            item_type: "Desk",
            price: 300
        }
        ,
        {
            item_name: "wallpaper-blue",
            item_type: "Wallpaper",
            price: 200
        }
        ,
        {
            item_name: "wallpaper-pink",
            item_type: "Wallpaper",
            price: 500
        }
    ]
    const library_inventory = [
        {
            item_name: "Bookshelf-1",
            item_type: "Bookshelf",
            price: 100
        },
        {
            item_name: "Bookshelf-2",
            item_type: "Bookshelf",
            price: 200
        },
        {
            item_name: "Chair-1",
            item_type: "Chair",
            price: 100
        },
        {
            item_name: "Chair-2",
            item_type: "Chair",
            price: 200
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
        width: 50%;
    }

    .underlined {
        padding-bottom: 0.25rem;
        border-bottom: solid 1px white;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
    }
    .store {
        overflow-y: scroll;
        max-height: 60vh;
    }

    ::-webkit-scrollbar {
        width: 0.4rem;
    }

    ::-webkit-scrollbar-thumb {
        background: white;
        border-radius: 0.2rem;
    }
</style>

<div class="test">
    <h1>Store</h1>
    <div class="room-nav">
        <div class="room-options" id="bed-room">
            <button on:click={() => {currentRoom = "Bed_Room"}} class="button"> Bed Room</button>
        </div>
        <div class="room-options" id="library">
            <button on:click={() => {currentRoom = "Library"}} class="button"> Library </button>
        </div>
    </div>
    <div class="store">
    {#if currentRoom=="Bed_Room"}
        <div class="underlined">Desk</div>
        {#each bed_room_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Desk"}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
        <div class="underlined">Bed</div>
        {#each bed_room_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Bed"}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
        <div class="underlined">Wallpaper</div>
        {#each bed_room_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Wallpaper"}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
    {:else}
        <div class="underlined">Bookshelf</div>
        {#each library_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Bookshelf"}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
        <div class="underlined">Chair</div>
        {#each library_inventory as decoration}
            {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Chair"}
                <button on:click={() => purchase(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
            {/if}
        {/each}
    {/if}
</div>
    
    

    

</div>
