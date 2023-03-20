<script>
    import SessionStore from '../../SessionStore';
    import AuthStore from '../../AuthStore';
	import { addActivity } from '../../Firebase';
	import { onMount, onDestroy } from 'svelte';

	let startTime = 0;
	let elapsedTime = '';
    let ended = false;

    onMount(() => {
		const date = new Date();
		startTime = date.getTime();
	});

	onDestroy(() => {
		endSession();
	});

	const endSession = () => {
        if (!ended) {
            const date = new Date();
            let endTime = date.getTime();
            // For later use
            let totalDuration = endTime - startTime;
            addActivity($SessionStore.sessionActivity, startTime, totalDuration);
            ended = true;
            SessionStore.set({
                inSession: false,
                modalOpen: true,
                sessionActivity: ""
            });
        }
	};

    setInterval(() => {
        const date = new Date();
        let currTime = date.getTime();
        let duration = currTime - startTime;
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        let hoursStr = hours < 10 ? '0' + hours : hours;
        let minutesStr = minutes < 10 ? '0' + minutes : minutes;
        let secondsStr = seconds < 10 ? '0' + seconds : seconds;
        elapsedTime = hoursStr + ':' + minutesStr + ':' + secondsStr;
    }, 100);
</script>

<div>{elapsedTime}</div>
<button id='studyhouseEndButton' on:click={endSession}>End Session</button>