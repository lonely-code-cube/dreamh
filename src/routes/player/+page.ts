import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
    let src = url.searchParams.get('src');
    let poster = url.searchParams.get('poster');

    return {
        src,
        poster
    }
}