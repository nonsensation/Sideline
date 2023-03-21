import { writable , readable } from 'svelte/store'
import { persisted } from './PersistantStore'
import OBSWebSocket from "obs-websocket-js"

export let obsIsConnected = writable( false )
export let obs = persisted( 'sl_obs' , new OBSWebSocket() )

