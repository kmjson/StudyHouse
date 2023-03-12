<script>
    import AuthStore from '../AuthStore';
    import Login from './Login.svelte';
    import Homepage from './Homepage.svelte';
</script>

<h1>StudyHouse</h1>

{#if $AuthStore.isLoggedIn}
    <Homepage/>
{:else}
    <Login/>
{/if}
