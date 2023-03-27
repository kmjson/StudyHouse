<script>
	import SessionStore from "../../SessionStore";
</script>

<h1>Congratulations On Completing A Session!</h1>
<h3>In this session, you accomplished the following: { $SessionStore.sessionActivity }!</h3>
<h3>You earned { Math.round($SessionStore.sessionLength / 10) } coins!</h3>