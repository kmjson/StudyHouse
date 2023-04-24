<script>
    import UserInfoStore from "../../UserInfoStore";
    import { addLastLogin } from "../../Firebase";



    let newLogin = Date.now();
    let newLoginDate = new Date(newLogin).getDate();
        // newLogin = newLogin.getDate();
        // console.log($UserInfoStore.lastLogin.toString());
    let lastLoginDate = new Date ($UserInfoStore.lastLogin).getDate();

    console.log("newLogin", newLoginDate);
    console.log("lastLogin", lastLoginDate);

    addLastLogin(newLogin);
</script>

<h1>Daily Reward!</h1>
<h3>Welcome back!</h3>
<h3>You earned 100 coins!</h3>