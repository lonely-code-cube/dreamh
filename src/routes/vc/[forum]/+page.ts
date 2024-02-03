/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return { "forum_name": params.forum };
}