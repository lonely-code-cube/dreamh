import { PUBLIC_RTWALK_URL } from '$env/static/public'
import { error } from '@sveltejs/kit';
import { cacheExchange, createClient, fetchExchange, getContextClient, gql, queryStore } from '@urql/svelte'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const client = createClient({
        url: PUBLIC_RTWALK_URL.concat("/gql"),
        exchanges: [fetchExchange],
    });

    let res = await client.query(
        `query ($forum: [String!], $forumName: String!) {
            forums(criteria: { byNames: $forum }) {
                forum {
                    id
                    name
                    displayName
                    icon {
                        absolutePath
                    }
                    banner {
                        absolutePath
                    }
                    description
                    createdAt
                    ownerId
                }
                postCount
                commentCount
                postParticipantCount
                commentParticipantCount
            }

            forumPosts(forumName: $forumName) {
                post {
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
                    edited
                    editedAt
                    posterId
                }
            }
        }`,
        {
            forum: [params.forum],
            forumName: params.forum
        }
    );

    if (!res.data) {
        throw error(500, res.error);
    }
    if (res.data.forums.length == 0) {
        throw error(404, "Forum doesn't exist")
    }

    return {
        forum: res.data.forums[0],
        posts: res.data.forumPosts,
    }
}