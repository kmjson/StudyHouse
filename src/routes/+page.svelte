<script>
    import AuthStore from '../AuthStore';
    import Login from './Login.svelte';
    import Homepage from './Homepage.svelte';
    import MyDialog from './myDialog.svelte';
</script>

<h1>StudyHouse</h1>

{#if $AuthStore.isLoggedIn}
    <Homepage/>
    <!-- <MyDialog/> -->
{:else}
    <Login/>
{/if}
