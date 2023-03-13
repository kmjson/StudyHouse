<script>
	import { logoutFromGoogle } from '../Firebase';
	import { onDestroy } from 'svelte';
    import P5 from 'p5-svelte';

	let inSession = false;
	let startTime = 0;
	let elapsedTime = '';

	onDestroy(() => {
		endSession();
	});

	const startSession = () => {
		inSession = true;
		const date = new Date();
		startTime = date.getTime();
        localStorage.setItem('inSession', 'true');
	};

	const endSession = () => {
		inSession = false;
        const date = new Date();
		let endTime = date.getTime();
        // For later use
        let totalDuration = endTime - startTime;
        localStorage.setItem('inSession', 'false');
	};

    // @ts-ignore
    const sketch = (p5) => {
		p5.setup = () => {};
		p5.draw = () => {
			if (inSession) {
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
		    }
		};
	};
</script>

<h1>Homepage</h1>
{#if inSession}
	<div>{elapsedTime}</div>
	<button id='studyhouseEndButton' on:click={endSession}>End Session</button>
{:else}
    <button id='studyhouseStartButton' on:click={startSession} disabled>Turn On The StudyHouse Extension</button>
{/if}
<br />
<button on:click={logoutFromGoogle}>Logout</button>
<P5 {sketch} />