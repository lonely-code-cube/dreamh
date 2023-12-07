import { PUBLIC_RTWALK_URL } from "$env/static/public";
import type { Client, OperationResult } from "@urql/svelte";
import type { Post } from "api";

export function cdn(loc: string) {
    return PUBLIC_RTWALK_URL.concat("/cdn/" + loc);
}

export async function createPost(client: Client, forum: number, title: string, tags: string[] | null = null, content: string | null = null, media: string[] | null = null) {
    const res = await client.mutation(`
    mutation($post: InputPost!) {
        createPost(inputPost: $post) {
            id
            tags
            stars
            title
            slug
            content
            media {
                files {
                    loc
                }
            }
            createdAt
            forumId
            posterId
        }
    }
    `, {
        post: {
            title, tags, content, media, forum
        }
    });
    return res;
}