export const prerender = true


import { base } from '$app/paths'
import { marked } from 'marked'
import type { PageLoad } from './$types'

// import mdAbout from '$lib/Pages/About.md?raw'

export const load: PageLoad = async ({ fetch }) =>
{
    const res = await fetch(`${base}/Pages/About.md`)
    const post = await res.text()

    return {
        post: marked.parse(post),
    }
}
