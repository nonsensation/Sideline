
<style lang="postcss">

footer {
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 1em;
    border-top: 1px solid grey;
    background: linear-gradient(90deg, #9a0dfe, #637dfb);
    color: white;

    & div {
        padding: 0.15em 0.3em;
        border-radius: 0.25em;
        outline: 3px solid white;

        &.started, 
        &.connected,
        &.running {
            outline-color: lime;
        }
        &.starting,
        &.stopping,
        &.paused,
        &.connecting,
        &.disconnecting {
            outline-color: orange;
        }
        &.stopped,
        &.disconnected {
            outline-color: red;
        }
        &.disabled {
            outline-color: gray;
        }
    }
}
</style>


<footer class="{$$props.class ?? ''}">
    <div
        class:connected={$obsConnectionState     === ObsConnectionState.Connected     }
        class:connecting={$obsConnectionState    === ObsConnectionState.Connecting    }
        class:disconnected={$obsConnectionState  === ObsConnectionState.Disconnected  }
        class:disconnecting={$obsConnectionState === ObsConnectionState.Disconnecting }
    >{$obsIsConnected ? $obsCurrentScene : 'OBS'}</div>

    <div
        class:started={$obsRecordingState  === ObsOutputState.Started  }
        class:starting={$obsRecordingState === ObsOutputState.Starting }
        class:stopping={$obsRecordingState === ObsOutputState.Stopping }
        class:stopped={$obsRecordingState  === ObsOutputState.Stopped  }
    >REC</div>

    <div
        class:started={$obsStreamingState  === ObsOutputState.Started  }
        class:starting={$obsStreamingState === ObsOutputState.Starting }
        class:stopping={$obsStreamingState === ObsOutputState.Stopping }
        class:stopped={$obsStreamingState  === ObsOutputState.Stopped  }
    >LIVE</div>

    <div
        class:running={$timerIsRunning}
        class:paused={!$timerIsRunning}
        class:disabled={$timerIsDisabled}
    >Time</div>
</footer>

<script>
    import { 
        obsIsConnected ,
        obsCurrentScene ,
        obsConnectionState ,
        obsRecordingState ,
        obsStreamingState, 
        ObsOutputState ,
        ObsConnectionState } from '../stores/obs-store'
    import { timerIsRunning , timerIsDisabled } from '../../components/stores/Sideline-store'

</script>
