<style lang="postcss">

input,
button,
textarea,
a.help-ext {
    padding: 1em;
    font-weight: 500;
    font-size: 1em;
}

textarea {
    resize: none;
    height: 10em;
    width: 100%;
    font-size: 80%;
}

button {
    min-width: 20em;
    font-weight: 500;
    background-image: linear-gradient(135deg, #febe0d88, #63fb8488);

    &:hover {
        background-image: linear-gradient(135deg, #febe0d, #63fb84);
    }
}

input,
button {
    &:hover,
    &:focus {
        outline: 2px solid var(--default-browser-focus-color);
    }
}

legend {
    font-weight: 500;
}

fieldset {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;

    & > * {
        flex-grow: 1;
    }
}

.connected {
    background-image: linear-gradient(135deg, #0d25fe, #ae00ff) !important;
    color: white;
}

a.help-ext {
    border-radius: var(--border-radius);
    border: var(--border);
    text-align: center;
    text-decoration: none;
    min-width: 4em;
    max-width: 4em;

    &:hover,
    &:focus {
        outline: 2px solid var(--default-browser-focus-color);

    }
}
</style>

<fieldset class="grid-item obs">
    <legend>OBS Settings</legend>

    <button
        on:click={onClick}
        class:connected={$obsIsConnected}
        class="btn btn-connect"
        >
        {$obsIsConnected ? 'Disconnect' : 'Connect'}
    </button>

    <input
        type="text"
        placeholder="IP"
        bind:value={obsIp}
        title="Websocket Server IP (for OBS it is usually 192.168.X.X)"
    />
    <input
        type="text"
        placeholder="Port"
        bind:value={obsPort}
        title="Port (for OBS it is usually 4455)"
    />
    <input
        type="password"
        placeholder="Password"
        bind:value={obsPassword}
        title="If required by the OBS Websocket Server (can also be ampty)"
    />

    <a
        class="help-ext"
        href=""
        rel="noreferrer"
        target="_blank"
        title="Go to the OBS-Documentation"
    >
        ?
    </a>

    <textarea
        bind:this={obsStatusNode}
        class="no-resize"
        spellcheck="false"
        disabled
    />
</fieldset>


<script lang="ts">
import { onMount } from "svelte"
import { obs , obsIsConnected } from "./obs-store"


onMount( () =>{
    obsIp       = localStorage.getItem( 'obs-ip'    ) || ''
    obsPort     = localStorage.getItem( 'obs-port'  ) || ''
    obsPassword = localStorage.getItem( 'obs-pw'    ) || ''

    obsStatusNode.value = sessionStorage.getItem( 'obs-status' ) || ''
    obsStatusNode.scrollTop = obsStatusNode.scrollHeight
} )

let obsPort: string = ''
let obsIp: string = ''
let obsPassword: string = ''


export function obsSend(
    eventName: string,
    data: any | undefined = undefined
): void {}


let obsStatusNode: HTMLTextAreaElement


$obs.addListener("ConnectionClosed", (error:any) => {
    $obsIsConnected = false
    obsLog(`ConnectionClosed ${error.code} , ${error.message}`)
    obsOnDisconnect()
})

$obs.addListener("ConnectionError", (error:any) => {
    $obsIsConnected = false
    obsLog(`ConnectionError ${error.code} , ${error.message}`)
    obsOnDisconnect()
})

async function onClick()
{
    await toggleObs()

    if( $obsIsConnected )
    {
        obsOnConnect()
    }
    else
    {
        obsOnDisconnect()
    }
}

function obsLog(msg: string) {
    const time = new Date().toLocaleTimeString("de-de", {
        timeStyle: "medium",
    })

    obsStatusNode.value += `${time} | ${msg}\n`
    obsStatusNode.scrollTop = obsStatusNode.scrollHeight

    sessionStorage.setItem( 'obs-status' , obsStatusNode.value )
}

function obsOnDisconnect() {

}

function obsOnConnect() {
    localStorage.setItem( 'obs-ip'   , obsIp       )
    localStorage.setItem( 'obs-port' , obsPort     )
    localStorage.setItem( 'obs-pw'   , obsPassword )
}

async function toggleObs() {
    if ($obsIsConnected) {
        try {
            await $obs.disconnect()

            $obsIsConnected = false

            obsLog(`Disconnected.`)
        } catch (error: any) {
            obsLog(`Failed to disconnect ${error.code} , ${error.message}`)
        }
    } else {
        try {
            const { obsWebSocketVersion, negotiatedRpcVersion } =
                await $obs.connect(`ws://${obsIp}:${obsPort}`, obsPassword, {
                    rpcVersion: 1,
                })

                $obsIsConnected = true

            obsLog(
                `Connected to the OBS-WebSocket-Server (Version: ${obsWebSocketVersion} RPC: ${negotiatedRpcVersion})`
            )
        } catch (error: any) {
            $obsIsConnected = false

            obsLog(`Failed to connect ${error.code} , ${error.message}`)
        }
    }
}

export async function obsSendData(eventName: string, data: any) : Promise<any | undefined>
{
    if (!$obsIsConnected)
    {
        obsLog(`Cannot send data ${eventName} - not connected!`)

        return
    }

    var response = await $obs.call("CallVendorRequest", {
        vendorName: "obs-browser",
        requestType: "emit_event",
        requestData: {
            event_name: eventName,
            event_data: data,
        },
    })

    obsLog(`Request: ${eventName}: ${JSON.stringify(data)}`)
    obsLog(`Response: ${JSON.stringify(response)}`)

    return response
}
</script>
