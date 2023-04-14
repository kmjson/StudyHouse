<script>
    import SessionStore from '../../SessionStore';
    import { onMount } from 'svelte';
    import { logoutFromGoogle, auth } from "../../Firebase";
    import { writable } from 'svelte/store';
  
    const displayName = writable('');
    const email = writable('');
  
    onMount(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const name = user.displayName || '';
          const userEmail = user.email || '';
          displayName.set(name);
          email.set(userEmail);
        }
      });
    });
    const logout = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
        logoutFromGoogle();
    };
  
    export { displayName, email };
  </script>
  
  <style>
    .logout_button {
        cursor: pointer;
        width: 4rem;
        display: -webkit-box;
        margin-left: auto;
    }
  </style>
  
  <div class="modal-content">
    <h1>Welcome, {$displayName || "Guest"}!</h1>
    <p>Your email address is {$email}</p>
    <img src="logout.png" alt="logout" class="logout_button" on:click={logout} on:keydown={(e) => {if (e.key === 'Enter') logout();}}> 
  </div>
  