<style lang="postcss">
div {
    display: flex;
    justify-content: center;
    user-select: none;
    position: relative;
    min-width: 1em;
    z-index: 0;

    &::before {
        z-index: -1;
        position: absolute;
        content: attr(data-content);
    }
 }

 .canEdit {
    color: slateblue;
    outline: 2px dashed slateblue;
    border-color: slateblue;

    &[contenteditable="true"]:focus
    {
        color: lightseagreen;
        outline: 2px solid lightseagreen;
        cursor: text;
    }
}
</style>

<div
    class="{$$restProps.class || ''}"
    class:canEdit
    data-content={bgContent}
    spellcheck="false"
    contenteditable="true"
    bind:this={node}
    bind:textContent
    on:keypress={onKeypress}
    on:paste|preventDefault
>
<slot></slot>
</div>

<script lang="ts">
import { attr } from 'svelte/internal'
    import '/node_modules/dseg/css/dseg.css'

    export let textContent : string
    export let canEdit : boolean
    // export let fgColor : string = 'black'
    // export let bgColor : string = 'lightgray'
    
    let bgContent : string
    let node : HTMLDivElement
    
    $: {
        if( node )
        {
            node.contentEditable = canEdit ? 'true' : 'false'
        }
    }

    $: {
        bgContent = '8'.repeat( textContent.length );
    }
    
    function onKeypress( event : KeyboardEvent ) {
        if( event.key === 'Enter' )
            event.preventDefault();
    }

</script>
    