<script>
    import AuthStore from '../AuthStore';
    import Login from './Login.svelte';
    import Homepage from './Homepage.svelte';
    import ModalManager from './ModalManager.svelte';
</script>

{#if $AuthStore.isLoggedIn}
    <Homepage/>
{:else}
    <Login/>
{/if}
<ModalManager/>