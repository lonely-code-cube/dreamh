import { PUBLIC_API_URL } from "$env/static/public";
import type { Client, OperationResult } from "@urql/svelte";
import type { Post } from "api";

export function cdn(absolutePath: string) {
    return PUBLIC_API_URL.concat(absolutePath);
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
                    absolutePath
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