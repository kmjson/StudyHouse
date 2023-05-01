<script>
// @ts-nocheck
    import UserInfoStore from "../../UserInfoStore";
    import { getActivities } from "../../Firebase";
    import { onMount } from "svelte";

    /**
     * @type {{ activity: any; date: any; length: any; }[]}
     */
    let activities = [];
    let loaded = false;

    onMount(() => {
        const promise = getActivities();
        promise.then((data) => {
            for (let i = 0; i < data.length; i++) {
                activities.push({
                    "uid": data[i].uid,
                    "name": data[i].name,
                    "email": data[i].email,
                    "activity": data[i].activity,
                    "date": data[i].date,
                    "length": data[i].length
                });
            }
            activities.sort((a,b) => {
                return b.date - a.date;
            });
            loaded = true;
        })
    });

    const getDate = (activity) => {
        let date = new Date(activity.date);
        return date.toDateString().substring(4);
    };
</script>

<style>
    .activities {
        overflow-y: scroll;
        max-height: 70vh;
    }

    ::-webkit-scrollbar {
        width: 0.4rem;
    }

    ::-webkit-scrollbar-thumb {
        background: white;
        border-radius: 0.2rem;
    }
</style>

<h1>Activities</h1>
<div class="activities">
{#if loaded}
    {#each activities as activity}
        <h3 style="margin-bottom: 0.2rem">{activity.name} - {activity.email}</h3>
        {#if activity.uid == $UserInfoStore.uid}
            <div>On {getDate(activity)}, you accomplished the following: {activity.activity}</div>
        {:else}
            <div>On {getDate(activity)}, they accomplished the following: {activity.activity}</div>
        {/if}
    {/each}
{/if}
<br>
</div>