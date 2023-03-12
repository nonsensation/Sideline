<style lang="postcss">

fieldset {
    & > legend {
        font-weight: 500;
        max-width: 100%;
    }
}

input {
    padding: 1em;
    font-weight: 500;
    font-size: 1em;

    &:hover,
    &:focus {
        outline: 2px solid var(--default-browser-focus-color);
    }
}

summary {
    cursor: pointer;
    padding: 1em;
    font-weight: bold;

    border-radius: var(--border-radius);
    border: var(--border);

    &:hover,
    &:focus {
        outline: 2px solid var(--default-browser-focus-color);
    }
}

details[open] summary {
    border-bottom: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    padding-bottom: 0;

    &:hover,
    &:focus {
        outline: none;
    }
}

.flex {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    gap: 1rem;
    
    & > * {
        flex-grow: 1;
    }

    & > .divider {
        width: 100%;
        border-bottom: 1px solid gainsboro;
    }

    border-radius: var(--border-radius);
    border: var(--border);
    padding: 1em;
    padding-top: 0;
    border-top: none;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}

details {



}
</style>

<fieldset class="grid-item obs">
    <legend>Websocket Settings</legend>

    <details open>
        <summary>Event-Names</summary>

        <div class="flex">

        <h5 class="divider">Time</h5>

        <input
            bind:value={$wsEvents.min}
            type="text"
        />

        <input
            bind:value={$wsEvents.sec}
            type="text"
        />

        <input
            bind:value={$wsEvents.period}
            type="text"
        />

        <h5 class="divider">Team</h5>

        <input
            bind:value={$wsEvents.name_home}
            type="text"
        />

        <input
            bind:value={$wsEvents.name_away}
            type="text"
        />

        <input
            bind:value={$wsEvents.score_home}
            type="text"
        />

        <input
            bind:value={$wsEvents.score_away}
            type="text"
        />

        <h5 class="divider">Colors & Images</h5>

        <input
            bind:value={$wsEvents.logo_home}
            type="text"
        />

        <input
        type="text"
            bind:value={$wsEvents.score_away}
        />

        <input
            bind:value={$wsEvents.logo_home}
            type="text"
        />

        <input
        type="text"
            bind:value={$wsEvents.score_away}
        />

        <input
            bind:value={$wsEvents.logo_home}
            type="text"
        />

        <input
        type="text"
            bind:value={$wsEvents.score_away}
        />

    </div>
    </details>

</fieldset>

<script lang="ts">
import { onMount } from "svelte"
import { each } from "svelte/internal"
import { wsEvents } from "./obs-websockets"



onMount( () =>{

} )

let obsPort: string = ''
let obsIp: string = ''
let obsPassword: string = ''

</script>
