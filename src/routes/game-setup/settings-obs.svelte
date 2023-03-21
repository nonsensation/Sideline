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

button.btn-connect {
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
    padding-left: 0.25em;
    padding-right: 0.25em;
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
details {
    &[open] {
        width: 100%;
    }
}

input {
    text-align: center;
}
.input-port {
    width: 4em;
    text-align: center;
}
.input-ip {
    width: 20em;
}
.input-password {
    width: 10em;
}

.top {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

button.btn-help {
    background-color: transparent;
    width: 4em;
    font-weight: bold;
    color: #0d25fe
}
</style>

<fieldset class="grid-item">
    <legend>OBS Settings</legend>

    <div class="top">
        <button
            on:click={onClick}
            class:connected={$obsIsConnected}
            class="btn btn-connect"
            >
            {$obsIsConnected ? 'Disconnect' : 'Connect'}
        </button>

        <button
            class="btn btn-help"
            title="Show Help"
            on:click={() => (showModal = true)}
        >
            ?
        </button>
    </div>
        
    <Modal bind:showModal>
        <h2 slot="header">
            Help
        </h2>
        <ul>
            <li>Check your connection in OBS > Tab Tools > WebSocket Server Settings</li>
            <li>The default OBS-WebSocket port is 4455</li>
            <li>IPv4 and IPv6 addresses are supported</li>
            <li>Password can be blank (if there is no password set in the WebSocket-Server)</li>
            <li>Sideline will automatically reconnect on refresh</li>
            <li>Settings will be saved in the browser (local storage)</li>
            <li>Make sure you are on the same (lokal) network as your OBS WebSocket-Server</li>
            <li>Or enable port forwarding in your router</li>
        </ul>
    </Modal>

    <input
        type="text"
        placeholder="IP"
        bind:value={obsIp}
        class:invalid={!isIPAddress( obsIp )}
        class="input-ip"
        title="Websocket Server IP (for OBS it is usually 192.168.X.X)"
    />
    <input
        type="text"
        placeholder="Port"
        bind:value={obsPort}
        class:invalid={!isValidPort( obsPort )}
        class="input-port"
        title="Port (for OBS it is usually 4455)"
    />
    <input
        type="password"
        placeholder="Password"
        bind:value={obsPassword}
        class="input-password"
        title="If required by the OBS Websocket Server (can also be ampty)"
    />
    <textarea
        bind:this={obsStatusNode}
        class="no-resize"
        spellcheck="false"
        disabled
    />
</fieldset>


<script lang="ts">
import { onMount } from "svelte"
import { obs , obsIsConnected } from "../../components/stores/obs-store"
import { isIPAddress , isIPV6Address , isIPV4Address , ipVersion } from 'ip-address-validator'
import Modal from '../../components/util/Modal.svelte'

onMount( () =>{
    obsIp          = localStorage.getItem( 'obs-ip'    ) || ''
    obsPort        = localStorage.getItem( 'obs-port'  ) || ''
    obsPassword    = localStorage.getItem( 'obs-pw'    ) || ''

    obsStatusNode.value = sessionStorage.getItem( 'obs-status' ) || ''

    if( !$obsIsConnected )
        toggleObs()
} )

let obsPort: string = ''
let obsIp: string = ''
let obsPassword: string = ''
let obsStatusNode: HTMLTextAreaElement
let showModal = false

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

function isValidPort( portStr : string ) : boolean
{
    const port = Number( portStr )

    return !isNaN( port ) && port > 0 && port < 9999
}

async function onClick()
{
    if( !$obsIsConnected )
    {
        if( !isIPAddress( obsIp ) || !isValidPort( obsPort ) )
            return
    }

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

function obsLog( msg: string )
{
    const time = new Date()
        .toLocaleTimeString( "de-de" , {
            timeStyle: "medium" ,
        } )

    obsStatusNode.value = `${time} | ${msg}\n` + obsStatusNode.value
    
    sessionStorage.setItem( 'obs-status' , obsStatusNode.value )
}

function obsOnDisconnect()
{

}

function obsOnConnect()
{
    localStorage.setItem( 'obs-ip'   , obsIp       )
    localStorage.setItem( 'obs-port' , obsPort     )
    localStorage.setItem( 'obs-pw'   , obsPassword )
}

async function toggleObs()
{
    if( $obsIsConnected )
    {
        try
        {
            await $obs.disconnect()

            $obsIsConnected = false

            obsLog(`Disconnected.`)
        }
        catch( error: any )
        {
            obsLog(`Failed to disconnect ${error.code} , ${error.message}`)
        }
    }
    else
    {
        try
        {
            let ip = obsIp.trim()
            let port = obsPort.trim()
            let pw = obsPassword

            if( isIPV6Address( ip ) )
            ip = `[${ip}]`

            const { obsWebSocketVersion, negotiatedRpcVersion } =
                await $obs.connect(`ws://${ip}:${port}` , pw , {
                    rpcVersion: 1,
                })

                $obsIsConnected = true

            obsLog(
                `Connected to the OBS-WebSocket-Server (Version: ${obsWebSocketVersion} RPC: ${negotiatedRpcVersion})`
            )
        }
        catch( error: any )
        {
            $obsIsConnected = false

            obsLog(`Failed to connect ${error.code} , ${error.message}`)
        }
    }
}

export async function obsSendData(eventName: string, data: any) : Promise<any | undefined>
{
    if( !$obsIsConnected )
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
