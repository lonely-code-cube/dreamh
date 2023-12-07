<script lang="ts">
	import type { Post } from "api";

	export let post: Post;
</script>

<div class="card card-bordered max-w-[48rem] bg-base-100 shadow-xl mx-auto">
	<div class="card-body bg-base-200">
		<h2 class="card-title">{post.title}</h2>
		{#if post.tags}
			<div>
				{#each post.tags as tag}
					<span class="badge badge-primary mx-1">#{tag}</span>
				{/each}
			</div>
		{/if}
		{#if post.content}
			<div class="">
				{post.content}
			</div>
		{/if}
	</div>
	{#if post.media}
		<figure>
			<a href="/">
				<img width="768" src="http://localhost:8000{post.media[0].loc}" alt="Shoes" />
			</a>
		</figure>
	{/if}
</div>
