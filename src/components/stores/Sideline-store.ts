import { writable , readable } from 'svelte/store'
import { persisted } from './PersistantStore'

type Timer = {
    min : number,
    sec : number,
}

export let timer = persisted( 'sl_timer' , { min: 0 , sec: 0 } as Timer )


export const timerIsRunning = writable( false ) 
export const timerIsDisabled = writable( false ) 
