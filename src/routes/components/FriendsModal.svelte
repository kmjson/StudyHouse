<script>
// @ts-nocheck

    import UserInfoStore from "../../UserInfoStore";
    import { sendFriendRequest, acceptFriendRequest, declineFriendRequest } from "../../Firebase";

	let email = "";

    const sendRequest = () => {
		if (email !== "") {
            sendFriendRequest(email);
			email = "";
		}
	};

    console.log($UserInfoStore.requests);
</script>

<style>
    h3 {
        padding-bottom: 0.25rem;
        border-bottom: solid 1px white;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
    }
	.submitButton{
		display: block;
		margin-right: 3.5rem;
		background-color: #F8DEC7;
		border: none;
		font-family: "Porpora-Regular";
		font-size: 1.6rem;
		padding: 0.4rem;
		padding-left: 0.4rem;
		padding-right: 1rem;
		border-radius: 0 1.5rem 1.5rem 0;
		color:#DC83A4;
		cursor: pointer;
	}
	.input{
		width: 60%;
		/* margin-left: auto; */
		/* margin-right: 0.75rem; */
		border-radius: 1.5rem;
		font-family: 'Porpora-Regular';
		font-size: 1rem;
		/* height: 1.8rem; */
		padding: 0.7rem;
		padding-left: 1rem;
		border-radius: 1.5rem 0 0 1.5rem;
		border: 0.15rem solid #F8DEC7;
	}
	.bar {
        display: flex;
    }
    .actions {
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

<h1>Friends</h1>

<div class="actions">
    <h3>Friends</h3>
    {#each $UserInfoStore.friends as friend}
        <div style="display:flex">
            <div>{friend.name} - {friend.email}</div>
            <!-- <div style="display:flex; margin-left: auto">
                <button on:click={() => acceptFriendRequest(request.name, request.email, request.uid)}>Accept</button>
                <button on:click={() => declineFriendRequest(request.name, request.email, request.uid)}>Decline</button>
            </div> -->
        </div>
    {/each}

    <h3>Friend Requests</h3>
    {#each $UserInfoStore.requests as request}
        <div style="display:flex">
            <div>{request.name} - {request.email}</div>
            <div style="display:flex; margin-left: auto">
                <button on:click={() => acceptFriendRequest(request.name, request.email, request.uid)}>Accept</button>
                <button on:click={() => declineFriendRequest(request.name, request.email, request.uid)}>Decline</button>
            </div>
        </div>
    {/each}

    <h3>Send A Friend Request. Enter Their Email!</h3>
    <form class="bar">
        <input class="input" bind:value={email} type="text">
        <input class="submitButton" type="submit" value="Send Request!" on:click={sendRequest}>
    </form>
</div>