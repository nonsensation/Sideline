
import adapter from '@sveltejs/adapter-static'; // https://kit.svelte.dev/docs/adapter-static
import preprocess from 'svelte-preprocess'; //https://kit.svelte.dev/docs/integrations
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // ssr: false,
    prefetch: false,
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
        preprocess( { postcss: true } ) , // https://joyofcode.xyz/using-future-css-in-svelte
        vitePreprocess() ,
     ] ,

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false
        }),
        // prerender: true,
        // trailingSlash: 'always',
        // HACK to display routes in GH-pages
        paths: {
            // base: dev ? '' : '/Sideline-SvelteKit',
        }, 
	},

    browser : {
        // hydrate: false ,
        // router: false ,
    },
};

export default config;
