<script>
    import SessionStore from '../SessionStore';
    import { loginWithGoogle } from '../Firebase';

    const about = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "about",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
    };
</script>

<style>
    .studyhouse_img {
        display: block;
        margin: auto;
        margin-top: 20vh;
        width: 34rem;
        max-width: 80vw;
    }

    .login_button {
        display: block;
        margin: auto;
        background-color: #DC83A4;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 2rem;
        padding: 1rem;
        border-radius: 1.5rem;
        color: white;
        cursor: pointer;
    }

    .icon_button {
        cursor: pointer;
        width: 4rem;
        display: -webkit-box;
        /* margin-left: auto; */
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img src="about.png" alt="about" class="icon_button" on:click={about}>
<img src="studyhouse.png" alt="studyhouse" class="studyhouse_img">
<!-- <img src="studyhousebranding.svg" alt="studyhouse"> -->
<br>
<button on:click={ loginWithGoogle } class="login_button">Login With Google</button>