import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "url";

const isDevMode = process.env.NODE_ENV === 'development';

export default defineConfig({
	plugins: [sveltekit()],

    // base: isDevMode ?  '' : '/Sideline-SvelteKit/', // GH-Pages

    resolve: {
        alias: [
            { find: '~style', replacement: fileURLToPath(new URL('./src/assets/style', import.meta.url)) },
            { find: '~components', replacement: fileURLToPath(new URL('./src/lib/components', import.meta.url)) },
            { find: '~ext', replacement: fileURLToPath(new URL('./src/assets/ext', import.meta.url)) },
            
        ]
    },
});
