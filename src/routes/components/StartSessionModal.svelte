<script>
	import SessionStore from "../../SessionStore";

	let activity = "";

	const startSession = () => {
		if (activity !== "") {
			SessionStore.set({
				inSession: true,
				sessionLength: 0,
				modalType: "",
				counter: $SessionStore.counter+1,
				sessionActivity: activity
			});
		}
	};

</script>
	
<style>
	.submitButton{
		display: block;
		margin-right: 3.5rem;
		background-color: #F8DEC7;
		border: none;
		font-family: "Porpora-Regular";
		font-size: 0.8rem;
		padding: 0.8rem;
		border-radius: 0 1.5rem 1.5rem 0;
		color:#DC83A4;
		cursor: pointer;

	}
	.input{
		width: 60%;
		/* margin-left: auto; */
		/* margin-right: 0.75rem; */
		border-radius: 1.5rem;
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
</style>
<div style="background-color: #DC83A4;">
	<h1>What do you want to accomplish this session?</h1>
	<p>This session, I want to...</p>
	<form class="bar">
		<input class="input" bind:value={activity} type="text" required>
		<input class="submitButton" type="submit" value="Start Session!" on:click={startSession}>
	</form>

	
</div>