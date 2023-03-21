
<style lang="postcss">

footer {
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 1em;
    border-top: 1px solid grey;
    background: linear-gradient(135deg, #9a0dfe, #637dfb);
    color: white;
}

.status {
    padding: 0.1em 0.25em;
    border-radius: 0.25em;
    outline: 3px solid crimson;
}

.connected,
.running {
    outline: 3px solid limegreen;
}
.paused {
    outline: 3px solid gold;
}
</style>


<footer class="{$$props.class ?? ''}">
    Status:
    <div class="status" class:connected={$obsIsConnected}>OBS</div>
    <div class="status">Time</div>
</footer>

<script>
    import { base } from '$app/paths'
    import { obsIsConnected } from '../stores/obs-store';

</script>
