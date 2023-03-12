// root layout

// see: https://kit.svelte.dev/docs/page-options

export const prerender = true

// Disable this, so the page gets reloaded on every url change instead of javascript doing this.
// This breaks HMR in dev mode though..
// seems to get rid of every JS, also simple things like buttons don't work..
// export const csr = false 

// if both ssr & csr are disabled, the page is blank..
// export const ssr = false

export const trailingSlash = 'never'
