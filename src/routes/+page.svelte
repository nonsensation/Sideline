<style lang="postcss">

</style>

<h1>Welcome to Sideline</h1>

<div class="status" bind:this={status}>STATUS: {$obsIsConnected}</div>

<script lang="ts">
import { obsIsConnected } from "./game-setup/obs-store"

let status


</script>
