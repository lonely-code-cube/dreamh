declare module "api" {
    export type File = {
        id: string | null | undefined,
        absolutePath: string | null | undefined,
    }

    export type User = {
        id: number | undefined,
        username: string | undefined,
        displayName: string | undefined,
        bio: null | string | undefined,
        pfp: File | undefined,
        banner: File | undefined,
        createdAt: string | undefined,
        admin: boolean | undefined
    }

    export type APIUserResponse = {
        user: User | undefined,
        ownedForumCount: number | undefined,
        postCount: number | undefined,
        commentCount: number | undefined,
        stars: number | undefined,
        score: null | number | undefined,
    };

    export type Forum = {
        id: number | undefined,
        name: string | undefined,
        displayName: string | undefined,
        icon: File | undefined,
        banner: File | undefined,
        description: string | null | undefined,
        createdAt: string | undefined,
        ownerId: number | undefined,
    }

    export type APIForumResponse = {
        forum: Forum | undefined,
        postCount: number | undefined,
        commentCount: number | undefined,
        postParticipantCount: number | undefined,
        commentParticipantCount: number | undefined,
        score: number | null | undefined,
    };

    export type Post = {
        id: number | undefined,
        title: string | undefined,
        tags: string[] | null | undefined,
        stars: number | undefined,
        content: string | null | undefined,
        media: {
            files: [File] | null
        } | undefined,
        createdAt: string | undefined,
        edited: boolean | undefined,
        editedAt: string | null | undefined,
        forumId: number | undefined,
        postId: number | undefined,
    }

    export type APIPostResponse = {
        post: Post | undefined,
        score: number | null | undefined,
    };
}