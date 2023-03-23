<style lang="postcss">

* {
    border: 1px dotted red;
}

:global(.display),
:global(.display::after),
:global(.display::before) {
    font-family: 'DSEG7-Classic';
}

:global(.display) {
    color: black;

}

:global(.display::after),
:global(.display::before) {
    color: lightgray;
}

:global(.display.canEdit) {
    color: slateblue;
}

.container {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-items: center; */
    /* align-content: center; */
    justify-content: space-between;
    font-size: 5em;
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

</style>

<div class="container">
        <button class="time-set"
            on:click={() => {
                canEdit = !canEdit
            }}
        >
            EDIT
        </button>
    <div class="clock">
        <div class="min">
            <EditableDisplay
                class="display"
                bind:canEdit
                bind:textContent={timerMinStr}
            />
        </div>
        <div class="div display">:</div>
        <div class="sec">
            <EditableDisplay
                class="display"
                bind:canEdit
                bind:textContent={timerSecStr}
            />
        </div>
    </div>
    
    <div class="teams">
        <div class="team team-home">
            <div class="name name-home">
                [HOME]
            </div>
            <div class="logo logo-home">
                <img src="" alt="">
            </div>
            <div class="score score-home">
                <EditableDisplay
                    class="display"
                    bind:canEdit
                    bind:textContent={scoreStrings[ 0 ]}
                />
            </div>
        </div>
        
        <div class="team team-guest">
            <div class="name name-guest">
                [GUEST]
            </div>
            <div class="logo logo-guest">
                <img src="" alt="">
            </div>

            <div class="score score-guest">
                <EditableDisplay
                    class="display"
                    bind:canEdit
                    bind:textContent={scoreStrings[ 1 ]}
                />
            </div>
        </div>
    </div>
</div>

<script lang="ts">

import '/node_modules/dseg/css/dseg.css'

import EditableDisplay from '$lib/EditableDisplay.svelte';

let canEdit = false
let scoreStrings = [ '0' , '0' ]
let scores = [ 0 , 0 ]
let timerMinStr : string = '13'
let timerSecStr : string = '37'

$: {

}

</script>
