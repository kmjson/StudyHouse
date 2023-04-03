<script>
    import { loginWithGoogle } from '../Firebase';
</script>

<style>
    .studyhouse_img {
        display: block;
        margin: auto;
        margin-top: 25vh;
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
</style>

<img src="studyhouse.png" alt="studyhouse" class="studyhouse_img">
<!-- <img src="studyhousebranding.svg" alt="studyhouse"> -->
<br>
<button on:click={ loginWithGoogle } class="login_button">Login With Google</button>