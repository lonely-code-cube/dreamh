<script>
	import Icon from '@iconify/svelte';
	import HomePost from '$lib/components/HomePost.svelte';
	import { queryStore, gql, getContextClient } from '@urql/svelte';
	import { slide } from 'svelte/transition';

	const posts = queryStore({
		client: getContextClient(),
		query: gql`
			query {
				posts(criteria: { search: "*" }) {
					post {
						id
						title
						tags
						content
						media {
							absolutePath
						}
					}
				}
			}
		`
	});
</script>

<svelte:head>
	<title>DreamH Community</title>
</svelte:head>

<!-- <div class="mx-5">
	<div class="flex justify-center gap-5">
		<div class="posts h-screen overflow-y-auto scrollbar-hide">
			{#if $posts.fetching}
				<progress class="progress w-max max-w-[48rem]" />
			{:else if $posts.error}
				<div transition:slide={{ axis: 'x' }}>Err {$posts.error.message}</div>
			{:else}
				{#each $posts.data.posts as post}
					<HomePost post={post.post} />
					<div class="h-5" />
				{/each}
			{/if}
		</div>
	</div>
</div> -->

<div class="h-screen flex justify-center items-center text-8xl">WIP</div>
