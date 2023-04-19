<script>
    import UserInfoStore from "../../UserInfoStore";
    import { setCurrent } from "../../Firebase";

    const bedroom_inventory = [
        {
            item_name: "Bed-1",
            item_type: "Bed",
            price: 200
        },
        {
            item_name: "Bed-2",
            item_type: "Bed",
            price: 500
        },
        {
            item_name: "Desk-1",
            item_type: "Desk",
            price: 200
        },
        {
            item_name: "Desk-2",
            item_type: "Desk",
            price: 500
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

    // @ts-ignore
    const getClass = (decoration, current) => {
        if (current.includes(decoration)) {
            return "invalid"
        }
        return "valid"
    }

    // @ts-ignore
    const equipDecoration = (decoration, type) => {
        let newList = [];
        for (let i = 0; i < $UserInfoStore.current.length; i++) {
            if (!$UserInfoStore.current[i].includes(type)) {
                newList.push($UserInfoStore.current[i])
            }
        }
        if (!$UserInfoStore.current.includes(decoration)) {
            newList.push(decoration);
        }
        setCurrent(newList);
    }

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

    let currentRoom = "Bedroom";

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
        cursor: pointer;
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
    <h1>Inventory</h1>
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
            <div class="underlined">Desk</div>
            {#if count($UserInfoStore.decorations, "Desk") == 0}
                <div>Currently, You Have No Desks!</div>
                <br>
            {:else}
                {#each bedroom_inventory as decoration}
                    {#if $UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Desk"}
                        <button on:click={() => equipDecoration(decoration.item_name, decoration.item_type)} class="button {getClass(decoration.item_name, $UserInfoStore.current)}">{decoration.item_name}</button>
                    {/if}
                {/each}
            {/if}
            <div class="underlined">Bed</div>
            {#if count($UserInfoStore.decorations, "Bed") == 0}
                <div>Currently, You Have No Beds!</div>
                <br>
            {:else}
                {#each bedroom_inventory as decoration}
                    {#if $UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Bed"}
                        <button on:click={() => equipDecoration(decoration.item_name, decoration.item_type)} class="button {getClass(decoration.item_name, $UserInfoStore.current)}">{decoration.item_name}</button>
                    {/if}
                {/each}
            {/if}
        {:else}
            {#if $UserInfoStore.rooms.includes("Library")}
                <div class="underlined">Bookshelf</div>
                {#if count($UserInfoStore.decorations, "Bookshelf") == 0}
                    <div>Currently, You Have No Bookshelves!</div>
                    <br>
                {:else}
                    {#each library_inventory as decoration}
                        {#if $UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Bookshelf"}
                            <button on:click={() => equipDecoration(decoration.item_name, decoration.item_type)} class="button {getClass(decoration.item_name, $UserInfoStore.current)}">{decoration.item_name}</button>
                        {/if}
                    {/each}
                {/if}
                <div class="underlined">Chair</div>
                {#if count($UserInfoStore.decorations, "Chair") == 0}
                    <div>Currently, You Have No Chairs!</div>
                    <br>
                {:else}
                    {#each library_inventory as decoration}
                        {#if $UserInfoStore.decorations.includes(decoration.item_name) && decoration.item_type == "Chair"}
                            <button on:click={() => equipDecoration(decoration.item_name, decoration.item_type)} class="button {getClass(decoration.item_name, $UserInfoStore.current)}">{decoration.item_name}</button>
                        {/if}
                    {/each}
                {/if}
            {:else}
                <div>Currently, You Don't Have A Library!</div>
            {/if}
        {/if}
    </div>
</div>