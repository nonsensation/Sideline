<style lang="postcss">
div {
    display: flex;
    justify-content: center;
    user-select: none;
    position: relative;
    min-width: 1em;
    min-height: 1em;
    z-index: 0;
    border: 2px dashed transparent;

    &::before {
        z-index: -1;
        position: absolute;
        content: attr(data-content);
    }
 }

 .canEdit {
    color: slateblue;
    border-color: slateblue;

    &[contenteditable="true"]:hover
    {
        border-color: lightseagreen;
    }

    &[contenteditable="true"]:focus
    {
        outline: none;
        border-style: solid;
        border-color: lightseagreen;
        color: lightseagreen;
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
    on:blur={onBlur}
    on:paste|preventDefault
>
<slot></slot>
</div>

<script lang="ts">
    import { attr } from 'svelte/internal'
    import '/node_modules/dseg/css/dseg.css'
	import { createEventDispatcher } from 'svelte';

    
    export let textContent : string
    export let canEdit : boolean
    
    let bgContent : string
    let node : HTMLDivElement

	const dispatch = createEventDispatcher();
    
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

    function onBlur() {
		dispatch( 'blur' )
    }

</script>
    