
<style lang="postcss">
.app {
    display: grid;
    justify-content: stretch;
    align-items: stretch;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
    min-height: 100%;
}

.header {
    grid-column-start: 1;
    grid-column-end: -1;
}

main {
    width: 100;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    gap: 1rem;
}

.footer {
    grid-column-start: 1;
    grid-column-end: -1;
}

</style>


<div class="app">
    <div class="header">
        <Header />
    </div>
	
    <main class="grid">
        <slot />
    </main>

    <div class="footer">
        <Footer />
    </div>
</div>

<script lang="ts">
	import '../styles/style.postcss'

	import Header from '../components/layout/Header.svelte'
	import Footer from '../components/layout/Footer.svelte'

</script>
