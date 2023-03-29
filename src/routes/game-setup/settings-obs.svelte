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

    &.connected {
        background-image: linear-gradient(135deg, #00ad00, #005f3b) !important;
        color: white;
    }
    &.connecting,
    &.disconnecting {
        background-image: linear-gradient(135deg, #fff345, #fc002a) !important;
        color: white;
    }
    &.disconnected {
        background-image: linear-gradient(135deg, #0d31fe88, #00c5cc88);
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
            bind:this={btnConnectNode}
            class:connected={$obsConnectionState     === ObsConnectionState.Connected     }
            class:connecting={$obsConnectionState    === ObsConnectionState.Connecting    }
            class:disconnected={$obsConnectionState  === ObsConnectionState.Disconnected  }
            class:disconnecting={$obsConnectionState === ObsConnectionState.Disconnecting }
            class="btn btn-connect"
            >
            Connect
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
        bind:value={$obsIp}
        class:invalid={!isIPAddress( $obsIp )}
        class="input-ip"
        title="Websocket Server IP (for OBS it is usually 192.168.X.X)"
    />
    <input
        type="text"
        placeholder="Port"
        bind:value={$obsPort}
        class:invalid={!isValidPort( $obsPort )}
        class="input-port"
        title="Port (for OBS it is usually 4455)"
    />
    <input
        type="password"
        placeholder="Password"
        bind:value={$obsPassword}
        class="input-password"
        title="If required by the OBS Websocket Server (can also be ampty)"
    />
    <textarea
        bind:this={obsStatusNode}
        bind:value={$obsStatusLog}
        class="no-resize"
        spellcheck="false"
        disabled
    />
</fieldset>


<script lang="ts">
import { onMount } from "svelte"
import { isIPAddress } from 'ip-address-validator'
import Modal from '../../components/util/Modal.svelte'
import {
    obsIp ,
    obsPassword ,
    obsPort ,
    obsIsConnected ,
    obsConnectionState ,
    obsStatusLog ,
    Connect ,
    Disconnect, 
    ObsConnectionState} from "../../components/stores/obs-store"
    
    
let btnConnectNode : HTMLButtonElement
let obsStatusNode: HTMLTextAreaElement
let showModal = false


onMount( () =>{
    $obsIp       = localStorage.getItem( 'obs-ip'   ) || ''
    $obsPort     = localStorage.getItem( 'obs-port' ) || ''
    $obsPassword = localStorage.getItem( 'obs-pw'   ) || ''

    if( !$obsIsConnected )
    {
        Connect()
    }
} )


$: {
    scrollToBottom( $obsStatusLog )

    if( btnConnectNode )
    switch( $obsConnectionState )
    {
        case ObsConnectionState.Connected :
            btnConnectNode.innerText = 'Disconnect'
            break
        case ObsConnectionState.Connecting :
            btnConnectNode.innerText = 'Cancel Connect'
            break
        case ObsConnectionState.Disconnected :
            btnConnectNode.innerText = 'Connect'
            break
        case ObsConnectionState.Disconnecting :
            btnConnectNode.innerText = 'Cancel Disconnect'
            break
    }
}

function scrollToBottom( reactiveValue : any )
{
    setTimeout( () => {
        if( obsStatusNode )
        {
            obsStatusNode.scrollTop = obsStatusNode.scrollHeight
        }
    } , 0 )  
}

function isValidPort( portStr : string ) : boolean
{
    const port = Number( portStr )

    return !isNaN( port ) && port > 0 && port < 9999
}

async function onClick()
{
    if( !$obsIsConnected )
    {
        if( !isIPAddress( $obsIp ) || !isValidPort( $obsPort ) )
        {
            console.log('DF');
            
            return
        }
console.log('Connect');
        Connect()
        
    }
    else
    {
        console.log('Disconnect');
        
        Disconnect()
    }

    if( $obsIsConnected )
    {
        // store on successful connect, so we know the ip:port/pw are valid
        localStorage.setItem( 'obs-ip'   , $obsIp   )
        localStorage.setItem( 'obs-port' , $obsPort )
        localStorage.setItem( 'obs-pw'   , $obsPassword   )
    }
}





</script>
