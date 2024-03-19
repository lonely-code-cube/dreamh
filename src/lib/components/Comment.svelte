<script lang="ts">
	import { timeAgo } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import Mention from './ui/Mention.svelte';
	import { queryStore, gql, getContextClient } from '@urql/svelte';
	import LinoBlock from './LinoBlock.svelte';
	import { slide } from 'svelte/transition';

	export let comment: any;

	let client = getContextClient();

	let openReply = false;
	let replies: any[] = [];
	let replyLoading = false;
	let replyFetched = false;

	function onReplyOpen() {
		openReply = !openReply;
		if (!replyFetched) {
			let commentRes = queryStore({
				client,
				query: gql`
					query ($id: String!) {
						getComments(replyTo: $id) {
							total
							items {
								id
								commenterId
								commenter {
									displayName
								}
								content
								upvotes
								downvotes
								modifiedAt
								replyCount
							}
						}
					}
				`,
				variables: { id: comment.id }
			});

			replyFetched = true;
			commentRes.subscribe((v) => {
				if (v.fetching) {
					replyLoading = true;
				} else if (v.data) {
					replies = v.data.getComments.items;
					replyLoading = false;
				} else {
					replyLoading = false;
				}
			});
		}
	}
</script>

<div class="flex gap-2">
	<div class="border-l translate-x-6 border-base-content/30" />
	<div class="avatar h-min">
		<div class="w-9 rounded-full ring-4 ring-base-100">
			<img
				src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7a%2F29%2F10%2F7a2910fdef7975291965106eaebc0f47.jpg&f=1&nofb=1&ipt=b0ae7e5336ad232e95ad28db02114bdc6f49313133e6c8a8b3e1b5f927865b8b&ipo=images"
			/>
		</div>
	</div>
	<div>
		<!-- <div class="text-xs">
			<Mention copy={comment.id} bg="base-300"
				>c:<span class="font-normal">{comment.id}</span></Mention
			>
		</div> -->
		<div class="font-semibold text-sm">
			{comment.commenter.displayName}
			<span class="font-normal text-xs">• {timeAgo(comment.modifiedAt)}</span>
		</div>
		<button on:click={onReplyOpen} class="pt-1 pb-2.5 rounded text-sm">
			<LinoBlock text={comment.content} />
		</button>
		<div class="flex gap-3">
			<div class="flex items-center">
				<Icon class="text-xl" icon="tabler:arrow-big-up" />
				<span>{comment.upvotes}</span>
			</div>

			<div class="flex items-center">
				<Icon class="text-xl" icon="tabler:arrow-big-down" />
				<span>{comment.downvotes}</span>
			</div>

			<div class="flex items-center">
				<Icon class="text-2xl" icon="solar:reply-outline" />
			</div>

			<div class="flex items-center">
				<Icon class="text-xl" icon="material-symbols:share" />
			</div>
			{#if comment.replyCount > 0}
				<button on:click={onReplyOpen} class="flex items-center gap-1">
					<span class="text-sm"
						>{comment.replyCount} {comment.replyCount == 1 ? 'reply' : 'replies'}</span
					>
					{#if openReply}
						<Icon class="text-xl" icon="icon-park-outline:up" />
					{:else}
						<Icon class="text-xl" icon="icon-park-outline:down" />
					{/if}
				</button>
			{/if}
			<button class="flex items-center">
				<Icon class="text-2xl" icon="pepicons-pencil:dots-x" />
			</button>
		</div>
		{#if openReply}
			<div transition:slide class="mt-4 -translate-x-10">
				{#each replies as comment}
					<div class="mb-2">
						<svelte:self {comment} />
					</div>
				{/each}
				{#if replies.length === 0}
					{#if replyLoading}
						<div class="ml-10 loading" />
					{:else}
						<div class="ml-5 mt-2 p-1 rounded bg-base-200 text-base-content/70 italic">
							This comment has no replies
						</div>
					{/if}
				{/if}
			</div>
		{/if}
	</div>
</div>
