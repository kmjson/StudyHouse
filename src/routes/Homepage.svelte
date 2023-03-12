<script>
    import { logoutFromGoogle } from '../Firebase';
    import { onDestroy } from 'svelte';

    onDestroy(() => {
        console.log("BYE");
    })
</script>

<h1>Homepage</h1>
<button on:click={ logoutFromGoogle }>Logout</button>