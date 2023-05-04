<script>
    import UserInfoStore from "../../UserInfoStore";
    import { setCurrent } from "../../Firebase";

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

    // @ts-ignore
    const getClass = (decoration, current) => {
        if (current.includes(decoration)) {
            return "invalid"
        }
        return "valid"
    }

    // @ts-ignore
    const equip = (decoration) => {
        let list = $UserInfoStore.current;
        let new_list;
        if (list.includes(decoration)) {
            new_list = list.filter((value) => {
                return !(value == decoration);
            });
        }
        else {
            list.push(decoration);
            new_list = list;
        }
        setCurrent(new_list);
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
            <div class="underlined">Decorations</div>
            {#if count($UserInfoStore.decorations, "Bedroom") == 0}
                <div>Currently, You Have No Decorations!</div>
                <br>
            {:else}
                {#each bedroom_inventory as decoration}
                    {#if $UserInfoStore.decorations.includes("Bedroom-" + decoration.item_name)}
                        <button on:click={() => equip("Bedroom-" + decoration.item_name)} class="button {getClass("Bedroom-" + decoration.item_name, $UserInfoStore.current)}">{decoration.item_name}</button>
                    {/if}
                {/each}
            {/if}
        {:else}
            {#if $UserInfoStore.rooms.includes("Library")}
                <div class="underlined">Decorations</div>
                {#if count($UserInfoStore.decorations, "Library") == 0}
                    <div>Currently, You Have No Decorations!</div>
                    <br>
                {:else}
                    {#each library_inventory as decoration}
                        {#if $UserInfoStore.decorations.includes("Library-" + decoration.item_name)}
                            <button on:click={() => equip("Library-" + decoration.item_name)} class="button {getClass("Library-" + decoration.item_name, $UserInfoStore.current)}">{decoration.item_name}</button>
                        {/if}
                    {/each}
                {/if}
            {:else}
                <div>Currently, You Don't Have A Library!</div>
                <br>
            {/if}
        {/if}
    </div>
</div>