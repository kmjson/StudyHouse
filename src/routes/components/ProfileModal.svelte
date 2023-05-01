<script>
    import SessionStore from "../../SessionStore";
    import UserInfoStore from "../../UserInfoStore";
    import { logoutFromGoogle } from "../../Firebase";

    const logout = () => {
        SessionStore.set({
            inSession: false,
            sessionLength: 0,
            modalType: "",
            counter: $SessionStore.counter+1,
            sessionActivity: ""
        });
        UserInfoStore.set({
            uid: "",
            name: "",
            email: "",
            coins: 0,
            last_login: -1,
            rooms: [""],
            decorations: [""],
            current: [""],
            friends: [""],
            requests: [""]
        });
        logoutFromGoogle();
    };
</script>

<style>
    .button {
        display: block;
        /* margin: auto; */
        margin-bottom: 1rem;
        background-color: #F8DEC7;
        border: none;
        font-family: "Porpora-Regular";
        font-size: 2rem;
        padding: 1rem;
        border-radius: 1.5rem;
        color: #DC83A4;
        cursor: pointer;
    }
</style>

<h1>Your Profile</h1>
<h3>Name: {$UserInfoStore.name}</h3>
<h3>Email: {$UserInfoStore.email}</h3>
<button on:click={logout} class="button">Log Out</button>