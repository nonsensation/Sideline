
<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

    main {
        filter: url( #NoiseStyle );
        /* background: #4605ff; */
        background-image: repeating-linear-gradient(-45deg, rgba(255,255,255, 0.25), rgba(255,255,255, 0.25) 1px, transparent 1px, transparent 6px);
    background-size: 4px 4px;
    }
</style>


<div class="app">
	<NoiseStyle />
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<script>
	import Header from '../components/Header.svelte'
	import NoiseStyle from '../components/NoiseStyle.svelte'
	import '../styles/style.postcss'

</script>
