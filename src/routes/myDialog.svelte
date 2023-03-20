<!--
Svelte Simple Modal - Demos
https://github.com/flekschas/svelte-simple-modal
-->

<script>
	import ContentOutside from './DialogFolder/ContentOutside.svelte';
	import Content from './DialogFolder/Content.svelte';
  import Modal from './DialogFolder/Modal.svelte';
	import Popup from './DialogFolder/Popup.svelte';
	import { modal } from './DialogFolder/stores.js';
</script>

<Modal show={$modal}>
	<Content />
</Modal>

<ContentOutside />