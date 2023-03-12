
import { base } from '$app/paths'
import { marked } from 'marked'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) =>
{
    const res = await fetch(`${base}/Pages/About.md`)
    const post = await res.text()

    return {
        post: marked.parse(post),
    }
}
