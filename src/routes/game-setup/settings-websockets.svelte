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

fieldset {
    & label {
        display: block;
    }
    & input[type="text"] {
        border: none;
        width: 100%;
        &:hover,
        &:focus {
            outline: none;
        }
    }
    &:hover,
    &:focus {
        border: 1px solid var(--default-browser-focus-color);
    }
}
</style>

<fieldset class="grid-item obs">
    <legend>Websocket Settings</legend>

    <details open>
        <summary>Event-Names</summary>

        <div class="content">

        {#each wsEvents as data }
                <fieldset class="">
                <legend>
                    <label for={data.name}>{data.displayName}</label>
                </legend>
                <input
                    type="text"
                    bind:value={data.name}
                    name={data.name}
                    placeholder={data.name}
                    title={data.description}
                />
            </fieldset>
        {/each}

    </div>
    </details>

</fieldset>

<script lang="ts">
import { onMount } from "svelte"
import { each } from "svelte/internal"
// import { wsEvents } from "../../components/stores/obs-websockets"

import { wsEvents } from "./ws-events";


onMount( () =>{

} )

let obsPort: string = ''
let obsIp: string = ''
let obsPassword: string = ''

</script>
