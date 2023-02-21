<script>
	import P5 from 'p5-svelte';
	let width = 55;
	let height = 55;

	// @ts-ignore
	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(400, 400);
		};

		p5.draw = () => {
			p5.ellipse(p5.width / 2, p5.height / 2, width, height);
		};
	};

	import { initializeApp } from 'firebase/app';
	var firebaseConfig = {
		apiKey: 'AIzaSyByCa-MhbzY1ghAYjgcLLOHXyu2O1WP6x8',
		authDomain: 'studyhouse-74491.firebaseapp.com',
		projectId: 'studyhouse-74491',
		storageBucket: 'studyhouse-74491.appspot.com',
		messagingSenderId: '1058200447719',
		appId: '1:1058200447719:web:8923387544612014c25042',
		measurementId: 'G-KTGML69YYZ'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
</script>

<h1>StudyHouse</h1>

<label>
	Width
	<input type="range" bind:value={width} min="100" max="1000" step="0.01" />
	{width}
</label>

<label>
	Height
	<input type="range" bind:value={height} min="100" max="1000" step="0.01" />
	{height}
</label>

<P5 {sketch} />
