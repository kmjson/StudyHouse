<script>
	import { fly } from 'svelte/transition';
	
	import { bind } from './Modal.svelte';
	
  import Popup from './Popup.svelte';
	
	import { modal } from './stores.js';
	
	let opening = false;
	let opened = false;
	let closing = false;
	let closed = false;

  const showPopup = () => {
		modal.set(Popup);
	};

  const showPopupWithProps = () => {
		modal.set(bind(Popup, { message: "It's a customized popup!" }));
	};
</script>

<section>
	<hr />
	<button on:click={showPopup}>Show a popup from an outside component!</button>
	<br />
	<button on:click={showPopupWithProps}>Show a popup from an outside component with custom props!</button>
	<p style="padding: 500px 0;">
		Just some text to overflow the body
	</p>
	<button on:click={showPopup}>Show a popup from an outside component!</button>
</section>

<style>
	section {
		padding-top: 0.5em;
	}
	hr {
		border: 0;
		border-top: 1px dashed #ccc;
		padding-bottom: 1em;
	}
</style>