<script>
    import UserInfoStore from "../../UserInfoStore";
    import { buyDecoration, buyRoom } from "../../Firebase";

    const bedroom_inventory = [
        {
            item_name: "Lights",
            price: 200
        },
        {
            item_name: "Rug",
            price: 300
        },
        {
            item_name: "Bed",
            price: 500
        },
        {
            item_name: "Window",
            price: 1000
        }
    ]
    const library_inventory = [
        {
            item_name: "Rug",
            price: 400
        },
        {
            item_name: "Bookshelf",
            price: 800
        },
        {
            item_name: "Desk + Chair",
            price: 1000
        },
        {
            item_name: "Window",
            price: 1500
        }
    ]

    const getClass = (/** @type {number} */ userCoins, /** @type {number} */ price) => {
        if (userCoins >= price) {
            return "valid"
        }
        return "invalid"
    }

    // @ts-ignore
    const purchaseDecoration = (decoration, price) => {
        if ($UserInfoStore.coins >= price) {
            buyDecoration(decoration, price);
        }
    }

    // @ts-ignore
    const purchaseRoom = (room, price) => {
        if ($UserInfoStore.coins >= price) {
            buyRoom(room, price);
        }
    }
    var currentRoom = "Bedroom";

    // @ts-ignore
    const count = (list, type) => {
        let count = 0;
        // @ts-ignore
        list.forEach((decoration) => {
            if (decoration.includes(type)) {
                count++;
            }
        });
        return count;
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
            <button on:click={() => {currentRoom = "Bedroom"}} class="button valid"> Bedroom</button>
        </div>
        <div class="room-options" id="library">
            <button on:click={() => {currentRoom = "Library"}} class="button valid"> Library </button>
        </div>
    </div>
    <div class="store">
        {#if currentRoom=="Bedroom"}
            <div class="underlined">Decorations</div>
            {#if count($UserInfoStore.decorations, "Bedroom") >= 4}
                <div>All Bedroom Decorations Have Been Purchased!</div>
                <br>
            {:else}
                {#each bedroom_inventory as decoration}
                    {#if !$UserInfoStore.decorations.includes("Bedroom-" + decoration.item_name)}
                        <button on:click={() => purchaseDecoration("Bedroom-" + decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
                    {/if}
                {/each}
            {/if}
        {:else}
            {#if $UserInfoStore.rooms.includes("Library")}
                <div class="underlined">Decorations</div>
                {#if count($UserInfoStore.decorations, "Library") >= 4}
                    <div>All Library Decorations Have Been Purchased!</div>
                    <br>
                {:else}
                    {#each library_inventory as decoration}
                        {#if !$UserInfoStore.decorations.includes("Library-" + decoration.item_name)}
                            <button on:click={() => purchaseDecoration("Library-" + decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
                        {/if}
                    {/each}
                {/if}
            {:else}
                <div class="underlined">Buy The Room!</div>
                <button on:click={() => purchaseRoom("Library", 2000)} class="button {getClass($UserInfoStore.coins, 2000)}">Library - 2000</button>
            {/if}
        {/if}
    </div>
</div>