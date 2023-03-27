<script>
    import { loginWithGoogle } from '../Firebase';
</script>

<style>
    .studyhouse_img {
        display: block;
        margin: auto;
        margin-top: 25vh;
        max-width: 80vw;
    }

    .login_button {
        display: block;
        margin: auto;
        background-color: #F8DEC7;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 2rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        color: #DC83A4;
        cursor: pointer;
    }
</style>

<img src="studyhouse.png" alt="studyhouse" class="studyhouse_img">
<br>
<button on:click={ loginWithGoogle } class="login_button">Login With Google</button>