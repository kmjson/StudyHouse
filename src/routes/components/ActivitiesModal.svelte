<script>
// @ts-nocheck

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

<h1>Previous Activities</h1>
<div class="activities">
{#if loaded}
    {#each activities as activity}
        <h3>On {getDate(activity)}, you achieved: {activity.activity}.</h3>
    {/each}
{/if}
</div>