import { writable, readable, get } from 'svelte/store'
import { persisted } from './PersistantStore'
import OBSWebSocket from "obs-websocket-js"
import { isIPAddress, isIPV6Address, isIPV4Address, ipVersion } from 'ip-address-validator'

export enum ObsOutputState
{
    Stopped = 'OBS_WEBSOCKET_OUTPUT_STOPPED' ,
    Starting = 'OBS_WEBSOCKET_OUTPUT_STARTING' ,
    Started = 'OBS_WEBSOCKET_OUTPUT_STARTED' ,
    Stopping = 'OBS_WEBSOCKET_OUTPUT_STOPPING' ,
}

export enum ObsConnectionState
{
    Disconnected = 'DISCONNECTED' ,
    Connecting = 'CONNECTING' ,
    Connected = 'CONNECTED' ,
    Disconnecting = 'DISCONNECTING' ,
}

enum ObsWebSocketCloseCode
{
    UnknownReason = 4000,
    MessageDecodeError = 4002,
    MissingDataField = 4003,
    InvalidDataFieldType = 4004,
    InvalidDataFieldValue = 4005,
    UnknownOpCode = 4006,
    NotIdentified = 4007,
    AlreadyIdentified = 4008,
    AuthenticationFailed = 4009,
    UnsupportedRpcVersion = 4010,
    SessionInvalidated = 4011,
    UnsupportedFeature = 4012,
}

enum WebSocketStatusCode
{
    CloseNormal = 1000, // normal closure
    CloseGoingAway = 1001, // server shut down or browser navigated away
}

export const obsStatusLog = persisted( 'obsStatusLog', '', { storage: 'session' } )
export const obs = persisted( 'sl_obs', new OBSWebSocket(), { storage: 'local' } )

export const obsIp = writable( '' )
export const obsPort = writable( '' )
export const obsPassword = writable( '' )
export const obsIsConnected = writable( false )
export const obsConnectionState = writable<ObsConnectionState>( ObsConnectionState.Disconnected )
export const obsRecordingState = writable<ObsOutputState>( ObsOutputState.Stopped )
export const obsStreamingState = writable<ObsOutputState>( ObsOutputState.Stopped )
export const obsCurrentScene = writable( '?' )

get( obs ).addListener( 'Identified', async () =>
{
    obsIsConnected.set( true )
    obsConnectionState.set( ObsConnectionState.Connected )

    const { outputActive: recordingActive } = await get( obs ).call( 'GetRecordStatus' )
    const { outputActive: streamingActive } = await get( obs ).call( 'GetStreamStatus' )
    const { currentProgramSceneName } = await get( obs ).call( 'GetCurrentProgramScene' )

    obsCurrentScene.set( currentProgramSceneName )
    obsRecordingState.set( recordingActive ? ObsOutputState.Started : ObsOutputState.Stopped )
    obsStreamingState.set( streamingActive ? ObsOutputState.Started : ObsOutputState.Stopped )
} )

get( obs ).addListener( 'ConnectionClosed', ( error: any ) =>
{
    obsIsConnected.set( false )
    obsConnectionState.set( ObsConnectionState.Disconnected )

    switch( error.code )
    {
        case WebSocketStatusCode.CloseNormal:
            obsLog( `Closing connection successful` )
            break

        case WebSocketStatusCode.CloseGoingAway:
            obsLog( `Closing connection due to websocket server is going down or browsewr navigated away from page.` )
            break

        default:
            obsLog( `Connection-Closed:` )
            obsLog( `Error-Code: ${ error.code }` )
            if( error.message ) obsLog( `Error-Message: ${ error.message }` )
            break
    }
} )

get( obs ).addListener( 'ConnectionError', ( error: any ) =>
{
    obsIsConnected.set( false )
    obsConnectionState.set( ObsConnectionState.Disconnected )

    if( error.code == -1 )
    {
        obsLog( `No compatible server was found!` )
    }
    else
    {
        obsLog( `Connection-Error:` )
        obsLog( `Error-Code: ${ error.code }` )
        if( error.message ) obsLog( `Error-Message: ${ error.message }` )
    }
} )

get( obs ).addListener( 'CurrentProgramSceneChanged', ( { sceneName } ) =>
{
    obsCurrentScene.set( sceneName )
} )

get( obs ).addListener( 'StreamStateChanged', ( { outputActive, outputState } ) =>
{
    obsStreamingState.set( outputState as ObsOutputState )
} )

get( obs ).addListener( 'RecordStateChanged', ( { outputActive, outputState } ) =>
{
    obsRecordingState.set( outputState as ObsOutputState )
} )

export async function obsSendData( eventName: string, data: any ): Promise<any | undefined>
{
    if( !get( obsIsConnected ) )
    {
        obsLog( `Cannot send data ${ eventName } - not connected!` )

        return
    }

    var response = await get( obs ).call( 'CallVendorRequest', {
        vendorName: 'obs-browser',
        requestType: 'emit_event',
        requestData: {
            event_name: eventName,
            event_data: data,
        },
    } )

    obsLog( `Request: ${ eventName }: ${ JSON.stringify( data ) }` )
    obsLog( `Response: ${ JSON.stringify( response ) }` )

    return response
}

export async function Connect()
{
    // TODO:
    // - validate input
    // - handle reconnect with different credentials?

    let ip = get( obsIp )
    let port = get( obsPort )
    let pw = get( obsPassword )

    try
    {
        if( isIPV6Address( ip ) )
            ip = `[${ ip }]`

        const address = `ws://${ ip }:${ port }`

        obsLog( `Try connect to server: ${address}` )

        obsConnectionState.set( ObsConnectionState.Connecting )

        const { obsWebSocketVersion, negotiatedRpcVersion } =
            await get( obs ).connect( address , pw , { rpcVersion: 1 } )

        obsLog( `Connected to the OBS-WebSocket-Server` )
        obsLog( `Version: ${ obsWebSocketVersion }` )
        obsLog( `RPC: ${ negotiatedRpcVersion }` )
    }
    catch( error: any )
    {
        obsLog( `Failed to connect` )
        obsLog( `Error-Code: ${ error.code }` )
        if( error.message ) obsLog( `Error-Message: ${ error.message }` )
    }
}

export async function Disconnect()
{
    // TODO: handle failed disconnect?
    try
    {
        obsConnectionState.set( ObsConnectionState.Disconnecting )

        await get( obs ).disconnect()

        obsLog( `Disconnected.` )
    }
    catch( error: any )
    {
        obsConnectionState.set( ObsConnectionState.Connected ) // is this correct?

        obsLog( `Failed to disconnect` )
        obsLog( `Error-Code: ${ error.code }` )
        obsLog( `Error-Message: ${ error.message }` )
    }
}

function obsLog( msg: string )
{
    const time = new Date()
        .toLocaleTimeString( "de-de", {
            timeStyle: "medium",
        } )

    obsStatusLog.set( get( obsStatusLog ) + `${ time } | ${ msg }\n` )
}
