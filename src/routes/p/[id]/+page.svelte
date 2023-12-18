<script lang="ts">
	export let data: {
		id: string;
	};

	import { queryStore, gql, getContextClient } from '@urql/svelte';
	import Icon from '@iconify/svelte';
	import Mention from '$lib/components/ui/Mention.svelte';
	import type { Forum, User } from 'api';
	import { formatDate, timeAgo } from '$lib/utils';
	import Comment from '$lib/components/Comment.svelte';
	import LinoBlock from '$lib/components/LinoBlock.svelte';

	let client = getContextClient();
	let postRes = queryStore({
		client,
		query: gql`
			query ($id: String!) {
				getPost(id: $id) {
					id
					title
					content
					tags
					commentCount
					upvotes
					downvotes
					forumId
					posterId
					createdAt
					modifiedAt
				}
				getComments(postId: $id, parent: true) {
					total
					items {
						id
						content
						upvotes
						downvotes
						modifiedAt
                        replyCount
					}
				}
			}
		`,
		variables: { id: data.id }
	});

	let poster: undefined | User;
	let forum: undefined | Forum;
	postRes.subscribe((v) => {
		if (v.data) {
			let metares = queryStore({
				client,
				query: gql`
					query ($fid: String!, $uid: String) {
						getForum(id: $fid) {
							id
							name
							displayName
						}
						getUser(id: $uid) {
							id
							username
							displayName
						}
					}
				`,
				variables: { fid: v.data.getPost.forumId, uid: v.data.getPost.posterId }
			});
			metares.subscribe((r) => {
				if (r.data) {
					poster = r.data.getUser;
					forum = r.data.getForum;
				}
			});
		}
	});
</script>

<div class="p-3 md:p-5">
	{#if $postRes.fetching}
		<div class="loading" />
	{:else}
		<div>
			{#if forum}
				<Mention
					bg="primary"
					img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP._Ofglmom5AAEbeLHWkgfZwAAAA%26pid%3DApi&f=1&ipt=20418ae2d4cc0daf8171bba360a25d542051f74881377a197a2284cef252d036&ipo=images"
				>
					#{forum.name}
				</Mention>
			{/if}
			{#if poster}
				<Mention
					bg="primary"
					img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.dayoftheshirt.com%2Fimages%2Fshirts%2FVWapE%2Fteepublic_shiro-shinchan-pet-dog-crayon-shin-chan-teepublic_1611038324.large.png&f=1&nofb=1&ipt=0a9c0118b7c3b76e8021a3e4dd0434d11553e476bc9cb088b39bbf193180367a&ipo=images"
				>
					@{poster.username}
				</Mention>
			{/if}
		</div>
		<div class="mt-2">
			{#if poster}
				<div class="flex items-center gap-1">
					<div class="avatar">
						<div class="w-14 rounded-full">
							<img
								src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7a%2F29%2F10%2F7a2910fdef7975291965106eaebc0f47.jpg&f=1&nofb=1&ipt=b0ae7e5336ad232e95ad28db02114bdc6f49313133e6c8a8b3e1b5f927865b8b&ipo=images"
							/>
						</div>
					</div>
					<div>
						<div class="text-xl font-semibold">{poster.displayName}</div>
						<div class="text-sm">
							On <span class="font-bold">{forum?.displayName}</span> • {timeAgo(
								$postRes.data.getPost.createdAt
							)}
						</div>
					</div>
				</div>
			{/if}
			<div class="flex gap-1 my-2">
				{#each $postRes.data.getPost.tags as tag}
					<Mention bg={tag === 'announcement' ? 'secondary' : 'base-300'}>{tag}</Mention>
				{/each}
			</div>
			<div class="text-xl md:text-3xl font-semibold">{$postRes.data.getPost.title}</div>
			<div class="my-5 text-sm">
				<LinoBlock text={$postRes.data.getPost.content} />
			</div>
			<div class="flex flex-wrap gap-4">
				<div class="flex items-center">
					<Icon class="text-2xl" icon="tabler:arrow-big-up" />
					<span>{$postRes.data.getPost.upvotes}</span>
				</div>

				<div class="flex items-center">
					<Icon class="text-2xl" icon="tabler:arrow-big-down" />
					<span>{$postRes.data.getPost.downvotes}</span>
				</div>

				<div class="flex items-center gap-1">
					<Icon class="text-xl" icon="material-symbols:comment" />
					<span>{$postRes.data.getPost.commentCount}</span>
				</div>

				<div class="flex items-center">
					<Icon class="text-xl" icon="material-symbols:share" />
				</div>
				<!-- <Mention copy={$postRes.data.getPost.id} bg="base-300">
					p:<span class="text-sm font-normal">{$postRes.data.getPost.id}</span>
				</Mention> -->
                <button class="flex items-center">
                    <Icon class="text-2xl" icon="pepicons-pencil:dots-x" />
                </button>
			</div>
		</div>
		<div class="mt-5 -translate-x-4">
			{#each $postRes.data.getComments.items as comment}
				<div class="mb-3">
					<Comment {comment} />
				</div>
			{/each}
		</div>
	{/if}
</div>
