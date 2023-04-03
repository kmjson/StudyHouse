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

    window.addEventListener('beforeunload', function (e) {
        if ($SessionStore.inSession) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

	const endSession = () => {
        if (!ended) {
            const date = new Date();
            let endTime = date.getTime();
            let totalDuration = endTime - startTime;
            addActivity($SessionStore.sessionActivity, startTime, totalDuration);
            ended = true;
            SessionStore.set({
                inSession: false,
                sessionLength: totalDuration,
                modalType: "finished",
                counter: $SessionStore.counter+1,
                sessionActivity: $SessionStore.sessionActivity
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

<style>
    .button {
        display: block;
        margin: auto;
        background-color: #DC83A4;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 2rem;
        padding: 1rem;
        border-radius: 1.5rem;
        color: #F8DEC7;
        cursor: pointer;
    }

    .buffer {
        margin-top: 15vh;
    }

    .stopwatch {
        text-align: center;
        margin-top: 10rem;
        font-size: 8rem;
        color: #DC83A4;
    }
</style>

<div class="buffer"></div>
<button id='studyhouseEndButton' on:click={endSession} class="button">End Session</button>
<h1 class="stopwatch">{elapsedTime}</h1>