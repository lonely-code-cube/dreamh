<script lang="ts">
	import { createPost } from '$lib/api';
	import TextBlock from '$lib/components/TextBlock.svelte';
	import Medias from '$lib/components/ui/Medias.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import { formatDate, timeAgo } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { getContextClient } from '@urql/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import type { APIForumResponse, APIPostResponse, Post } from 'api';
	export let data: {
		forum: APIForumResponse;
		posts: APIPostResponse[];
	};

	const client = getContextClient();
	let createdPostList: Post[] = [];
	let title: string;
	async function newPost() {
		toast.push('Creating new post...', { classes: ['warning-toast'] });
		if (data.forum.forum?.id) {
			const res = await createPost(client, data.forum.forum.id, title);
			if (res.error) {
				toast.push(`Failed to create post: ${res.error.message}`, { classes: ['error-toast'] });
			} else if (res.data) {
				toast.push(`New post created (ID: ${res.data.createPost.id})`, {
					classes: ['success-toast']
				});
				createdPostList.push(res.data.createPost);
				if (data.forum.postCount) {
					data.forum.postCount += 1;
				}
				createdPostList = createdPostList;
			}
		}
	}
</script>

<div>
	<div>
		{#if data.forum.forum?.banner?.loc}
			<div class="relative">
				<div
					class="h-52 bg-center bg-cover bg-no-repeat"
					style="background-image: url('{data.forum.forum?.banner?.loc}');"
				/>
				{#if data.forum.forum.icon?.loc}
					<div class="absolute -bottom-20 left-5 md:left-10 avatar">
						<div
							class="w-24 rounded-full ring-8 ring-base-100 bg-base-100 ring-offset-base-content ring-offset-2"
						>
							<img alt="Forum Icon" src={data.forum.forum.icon.loc} />
						</div>
					</div>
				{:else}
					<div class="absolute -bottom-20 left-5 md:left-10 avatar placeholder">
						<div
							class="w-24 rounded-full ring-8 ring-base-100 bg-base-100 ring-offset-base-content ring-offset-2"
						>
							{data.forum.forum.name?.split('')[0]}
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="relative">
				<div
					class="h-52 bg-center bg-cover bg-no-repeat bg-gradient-to-tr from-primary to-secondary"
				/>
				{#if data.forum.forum?.icon?.loc}
					<div class="absolute -bottom-20 left-5 md:left-10 avatar">
						<div
							class="w-24 rounded-full ring-8 ring-base-100 bg-base-100 ring-offset-base-content ring-offset-2"
						>
							<img alt="Forum Icon" src={data.forum.forum.icon.loc} />
						</div>
					</div>
				{:else}
					<div class="absolute -bottom-20 left-5 md:left-10 avatar placeholder">
						<div
							class="w-24 rounded-full ring-8 ring-base-100 bg-base-100 ring-offset-base-content ring-offset-2 text-5xl"
						>
							{data.forum.forum?.displayName?.split('')[0]}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div class="pt-2 mb-10">
		<div class="text-3xl font-bold ml-32 md:ml-40">{data.forum.forum?.displayName}</div>
		<span class="ml-32 md:ml-40">#{data.forum.forum?.name}</span>
	</div>
	<div class="flex flex-col-reverse md:flex-row md:flex-nowrap gap-5 mx-3 md:mx-10">
		<div class="flex-1 md:basis-2/3">
			<div class="px-5 py-3 bg-base-200 flex gap-2 shadow-lg">
				<button class="btn btn-circle btn-neutral">
					<Icon class="text-2xl" icon="mi:attachment" />
				</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="flex-grow">
					<TextInput bind:value={title} placeholder="Make a post">
						<button on:click={newPost} slot="icon" class="btn btn-circle btn-ghost translate-y-2">
							<Icon class="text-xl" icon="ion:send" />
						</button>
					</TextInput>
				</div>
			</div>
			{#each createdPostList as post}
				<div class="mt-3 shadow-lg">
					<div class="bg-base-200 px-5 py-3">
						<h2 class="text-2xl font-bold">
							{post.title}
						</h2>
						<div class="flex flex-wrap gap-1 items-center">
							{#if post.tags}
								{#each post.tags as tag}
									<Tag name={tag} />
								{/each}
							{/if}
							<div class="flex-grow" />
							{#if post.createdAt}
								<div>{timeAgo(post.createdAt)}</div>
							{/if}
						</div>
						{#if post.content}
							<div class="my-4 shadow-inner">
								<TextBlock content={post.content} />
							</div>
						{/if}
						<div class="border-t border-neutral mt-2 flex gap-3">
							<a class="inline-flex items-center gap-1" href="/"
								><Icon class="text-2xl" icon="material-symbols:comment" /> ??
								<span class="hidden md:block">comments</span></a
							>
							<a class="inline-flex items-center gap-1" href="/"
								><Icon class="text-2xl" icon="clarity:share-solid" />
								<span class="hidden md:block">share</span></a
							>
							<div class="flex-grow" />
							<button class="btn btn-circle"
								><Icon class="text-2xl" icon="pepicons-print:dots-y" /></button
							>
						</div>
					</div>
				</div>
			{/each}
			{#each data.posts as post}
				<div class="mt-3 shadow-lg">
					<div class="bg-base-200 px-5 py-3">
						<h2 class="text-2xl font-bold">
							{post.post?.title}
						</h2>
						<div class="flex flex-wrap gap-1 items-center">
							{#if post.post?.tags}
								{#each post.post.tags as tag}
									<Tag name={tag} />
								{/each}
							{/if}
							<div class="flex-grow" />
							{#if post.post?.createdAt}
								<div>{timeAgo(post.post.createdAt)}</div>
							{/if}
						</div>
						{#if post.post?.content}
							<div class="my-4 shadow-inner">
								<TextBlock content={post.post.content} />
							</div>
						{/if}
						<div class="border-t border-neutral mt-2 flex gap-3">
							<a class="inline-flex items-center gap-1" href="/"
								><Icon class="text-2xl" icon="material-symbols:comment" /> ??
								<span class="hidden md:block">comments</span></a
							>
							<a class="inline-flex items-center gap-1" href="/"
								><Icon class="text-2xl" icon="clarity:share-solid" />
								<span class="hidden md:block">share</span></a
							>
							<div class="flex-grow" />
							<button class="btn btn-circle"
								><Icon class="text-2xl" icon="pepicons-print:dots-y" /></button
							>
						</div>
					</div>
				</div>
			{/each}
			<div class="h-10" />
		</div>
		<div class="flex-1 md:basis-1/3 h-min">
			<div class="stats stats-vertical w-full rounded-none bg-base-200 shadow-lg">
				<div class="stat">
					<div class="stat-title">Page Visits</div>
					<div class="stat-value">??</div>
					<div class="stat-figure">
						<Icon class="text-5xl" icon="tabler:map-2" />
					</div>
					<div class="stat-desc">Since {formatDate(data.forum.forum?.createdAt || '')}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Posts</div>
					<div class="stat-value">{data.forum.postCount}</div>
					<div class="stat-figure text-warning">
						<Icon class="text-5xl" icon="ic:baseline-star" />
					</div>
					<div class="stat-desc">
						And <span class="font-bold text-base-content">{data.forum.commentCount}</span> comments
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Contributors</div>
					<div class="stat-value">{data.forum.postParticipantCount}</div>
					<div class="stat-desc">
						And <span class="font-bold text-base-content">{data.forum.commentParticipantCount}</span
						> commenters
					</div>
				</div>
			</div>
			<div class="bg-base-200 mt-3 px-5 py-3 shadow-lg">
				<div class="font-bold text-lg underline mb-2">Description</div>
				<div>
					{data.forum.forum?.description}
				</div>
			</div>
		</div>
	</div>
</div>
