<style lang="postcss">
</style>

<SettingsObs bind:this={settingsObs} />
<SettingsWebSockets bind:this={settingsWebSockets} />

<script lang="ts">
import { onMount } from "svelte"
import SettingsObs from "./settings-obs.svelte";
import SettingsWebSockets from "./settings-websockets.svelte";
import { obsIsConnected } from "./obs-store"

let settingsObs : SettingsObs
let settingsWebSockets : SettingsWebSockets


</script>
