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

<h1>What do you want to accomplish this session?</h1>
<p>This session, I want to...</p>
<form>
	<input bind:value={activity} type="text" required>
	<input type="submit" value="Start Session!" on:click={startSession}>
</form>