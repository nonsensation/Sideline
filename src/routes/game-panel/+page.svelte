<style lang="postcss">

* {
    /* outline: 1px dotted red; */

    --color-active: MediumSeaGreen;
    --color-inactive: red;
    --color-edit: slateblue;
    --color-disabled: gray;
    --color-paused: orange;
    --color-background: rgba(127, 127, 127, 0.2);

    user-select: none;
}

:global(.display),
:global(.display::after),
:global(.display::before) {
    font-family: 'DSEG7-Classic';
}

:global(.display) {
    color: var(--color-inactive);

}

:global(.display::after),
:global(.display::before) {
    color: var(--color-background);
}

:global(.display.canEdit) {
    color: var(--color-edit);
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.teams {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    width: 100%;

}
img {
    min-height: 1em;
    max-height: 1em;
    min-width: 1em;
    width: auto;
}

.team {
    display: flex;
    justify-content: center;
}

.clock {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    font-size: 10em;

    & .min {
        justify-self: end;
    }
    & .div {
        justify-self: center;
    }
    & .sec {
        justify-self: start;
    }
}

.team, 
.period,
.clock {
    margin: 0.25em;
    padding: 0.25em;
    border-radius: var(--border-radius);
    border: var(--border);
    align-self: center;
    justify-self: center;
    width: auto;
    background-color: black;
    color: gray;
    cursor: pointer;
}

.isRunning :global(.display) {
    color: var(--color-active);
}
.isPaused :global(.display) {
    color: var(--color-paused);
}

.team {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    font-size: 6em;
}

.period {
    font-size: 4em;
}
</style>

<div class="container">
        <button class="time-set"
            on:click={() => {
                canEdit = !canEdit
            }}
        >
            EDIT
        </button>
    
    <div class="teams">
        <div class="team team-home">

            <input
                type="text"
                placeholder="HOME"
                class="name name-home"
                bind:value={teamNameHome}
            >

            <div class="logo logo-home">
                <img src="" alt="">
            </div>

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="score score-home"
                on:click={onClick_ScoreHome}
            >
                <EditableDisplay
                    class="display"
                    bind:canEdit
                    bind:textContent={scoreStrings[ 0 ]}
                    on:blur={onBlur_ScoreHome}
                />
            </div>

        </div>
        
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="team team-guest"
            on:click={onClick_ScoreGuest}
        >
            <input
                type="text"
                placeholder="GUEST"
                class="name name-guest"
                bind:value={teamNameGuest}
            >
            <div class="logo logo-guest">
                <img src="" alt="">
            </div>

            <div class="score score-guest">
                <EditableDisplay
                    class="display"
                    bind:canEdit
                    bind:textContent={scoreStrings[ 1 ]}
                    on:blur={onBlur_ScoreGuest}
                />
            </div>
        </div>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="period"
        on:click={onClick_Period}
    >
            <EditableDisplay
                class="display"
                bind:canEdit
                bind:textContent={period}
            />
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="clock"
        on:click={onClick_Clock}
        class:isRunning={$timerIsRunning}
        class:isPaused={!$timerIsRunning}
    >
        <div class="min">
            <EditableDisplay
                class="display"
                bind:canEdit
                bind:textContent={timerMinStr}
                on:blur={onBlur_TimeMin}
                />
        </div>
        <div class="div display">:</div>
        <div class="sec">
            <EditableDisplay
                class="display"
                bind:canEdit
                bind:textContent={timerSecStr}
                on:blur={onBlur_TimeSec}
                />
        </div>
    </div>

</div>

<script lang="ts">

import '/node_modules/dseg/css/dseg.css'
import EditableDisplay from '$lib/EditableDisplay.svelte'
import { timerIsRunning } from '../../components/stores/Sideline-store'


let canEdit = false
let scoreStrings = [ '0' , '0' ]
let scores = [ 0 , 0 ]
let timerMinStr : string = '00'
let timerSecStr : string = '00'

let teamNameHome = 'Home-Team'
let teamNameGuest = 'Guest-Team'

$: {

}

function onBlur_ScoreHome() {
    onBlur_Score( 0 )
}
function onBlur_ScoreGuest() {
    onBlur_Score( 1 )
}
function onBlur_Score( teamIdx : number )
{
    if( !canEdit )
        return

    let score = parseInt( scoreStrings[ teamIdx ].trim() ) || 0

    scores[ teamIdx ] = score
    scoreStrings[ teamIdx ] = score.toString()
}

function onClick_ScoreHome() {
    onClick_Score( 0 )
}
function onClick_ScoreGuest() {
    onClick_Score( 1 )
}

function onClick_Score( teamIdx : number )
{
    if( canEdit )
        return

    scores[ teamIdx ] += 1
    scoreStrings[ teamIdx ] = scores[ teamIdx ].toString()
}

function onClick_Clock()
{
    if( canEdit )
        return

    $timerIsRunning = !$timerIsRunning

    if( $timerIsRunning )
    {
        startTime = Date.now() - elapsedTime

        timerId = setInterval( () =>
        {
            elapsedTime = Date.now() - startTime

            if( elapsedTime > endTime )
            {
                $timerIsRunning = false
            }
        } , 100 )
    }
    else
    {
        clearInterval( timerId )
        $timerIsRunning = false
    }
}

$: {
    if( canEdit )
    {
        elapsedTime = ( parseInt( timerMinStr ) * 60 + parseInt( timerSecStr ) ) * 1000
    }
    else if( $timerIsRunning )
    {
        timerSecStr = Math.floor( (elapsedTime / 1000) % 60 ).toString().padStart( 2 , '0' )
        timerMinStr = Math.floor( elapsedTime / (1000 * 60) ).toString().padStart( 2 , '0' )
    }
}

let startTime = 0
let elapsedTime = 0
let endTime = 20 * 60 * 1000
let timerId:NodeJS.Timer

const periods = [ '1' , '2' , '3' , '4' ]

let periodIdx = 0
let period = periods[ periodIdx ]

function onClick_Period()
{
    if( canEdit )
        return



    periodIdx = ( periodIdx + 1 ) % periods.length

    period = periods[ periodIdx ]
}

let timeMin = 0
let timeSec = 0

function onBlur_TimeMin() {
    if( !canEdit )
        return

    let min = parseInt( timerMinStr.trim() ) || 0

    if( min > 999 )
        min = 999
    else if( min < 0 )
        min = 0

    timerMinStr = min.toString()
    
    if( min < 10 )
        timerMinStr = timerMinStr.padStart( 2 , '0' )

    timeMin = min
}

function onBlur_TimeSec() {
    if( !canEdit )
        return

    let sec = parseInt( timerSecStr.trim() ) || 0

    if( sec > 59 )
        sec = 59
    else if( sec < 0 )
        sec = 0

    timerSecStr = sec.toString()
    
    if( sec < 10 )
        timerSecStr = timerSecStr.padStart( 2 , '0' )

    timeSec = sec
}
</script>
