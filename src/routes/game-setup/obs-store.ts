import { writable } from 'svelte/store'
import OBSWebSocket from "obs-websocket-js"

export let obsIsConnected = writable( false )
export let obs = writable( new OBSWebSocket() )

