type Post = {
    id: number,
    tags: null | string[],
    starts: number,
    title: string,
    slug: string,
    content: null | string,
    media: null | {
        id: string,
        absolutePath: string,
    }[],
    createdAt: Date,
    forumId: number,
    posterId: number,
}