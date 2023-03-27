<script>
    import AuthStore from '../AuthStore';
    import Login from './Login.svelte';
    import Homepage from './Homepage.svelte';
</script>

{#if $AuthStore.isLoggedIn}
    <Homepage/>
{:else}
    <Login/>
{/if}
