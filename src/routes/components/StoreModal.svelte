<script>
    import UserInfoStore from "../../UserInfoStore";
    import { buyDecoration, buyRoom } from "../../Firebase";

    const bedroom_inventory = [
        {
            item_name: "Lights",
            price: 200
        },
        {
            item_name: "Posters",
            price: 300
        },
        {
            item_name: "Bed",
            price: 500
        },
        {
            item_name: "Windows",
            price: 1000
        }
    ]
    const library_inventory = [
        {
            item_name: "Bookshelf-1",
            item_type: "Bookshelf",
            price: 200
        },
        {
            item_name: "Bookshelf-2",
            item_type: "Bookshelf",
            price: 500
        },
        {
            item_name: "Chair-1",
            item_type: "Chair",
            price: 200
        },
        {
            item_name: "Chair-2",
            item_type: "Chair",
            price: 500
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
            <!-- <div class="underlined">Desk</div>
            {#if count($UserInfoStore.decorations, "Desk") >= 2}
                <div>All Desks Have Been Purchased!</div>
                <br>
            {:else}
                {#each bedroom_inventory as decoration}
                    {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Desk"}
                        <button on:click={() => purchaseDecoration(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
                    {/if}
                {/each}
            {/if}
            <div class="underlined">Bed</div>
            {#if count($UserInfoStore.decorations, "Bed") >= 2}
                <div>All Beds Have Been Purchased!</div>
                <br>
            {:else}
                {#each bedroom_inventory as decoration}
                    {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Bed"}
                        <button on:click={() => purchaseDecoration(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
                    {/if}
                {/each}
            {/if} -->
        {:else}
            {#if $UserInfoStore.rooms.includes("Library")}
                <div class="underlined">Bookshelf</div>
                {#if count($UserInfoStore.decorations, "Bookshelf") >= 2}
                    <div>All Bookshelves Have Been Purchased!</div>
                    <br>
                {:else}
                    {#each library_inventory as decoration}
                        {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Bookshelf"}
                            <button on:click={() => purchaseDecoration(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
                        {/if}
                    {/each}
                {/if}
                <div class="underlined">Chair</div>
                {#if count($UserInfoStore.decorations, "Chair") >= 2}
                    <div>All Chairs Have Been Purchased!</div>
                    <br>
                {:else}
                    {#each library_inventory as decoration}
                        {#if !$UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Chair"}
                            <button on:click={() => purchaseDecoration(decoration.item_name, decoration.price)} class="button {getClass($UserInfoStore.coins, decoration.price)}">{decoration.item_name} - {decoration.price}</button>
                        {/if}
                    {/each}
                {/if}
            {:else}
                <div class="underlined">Buy The Room!</div>
                <button on:click={() => purchaseRoom("Library", 1000)} class="button {getClass($UserInfoStore.coins, 1000)}">Library - 1000</button>
            {/if}
        {/if}
    </div>
</div>