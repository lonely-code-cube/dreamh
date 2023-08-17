<script lang="ts">
	export let data: {
		src: string | null;
		poster: string | null;
	};
	let value: string | null = null;

	import 'vidstack/styles/defaults.css';
	import 'vidstack/styles/community-skin/video.css';
	import { defineCustomElements } from 'vidstack/elements';
	import Icon from '@iconify/svelte';

	defineCustomElements();
</script>

<div>
	{#if data.src}
		<media-player class="aspect-video" src={data.src} poster={data.poster} aspect-ratio="16/9" crossorigin>
			<media-outlet />
			<media-community-skin />
		</media-player>
	{:else}
		<div class="h-[500px] flex flex-col items-center justify-center">
			<div class="font-bold text-4xl">Nothing to play :(</div>
			<div>
				<input
					bind:value
					placeholder="m3u8 link"
					type="text"
					class="input input-bordered bg-base-200 mt-5 md:w-[400px]"
				/>
				<a class="btn" href={'/player?src=' + value} class:btn-disabled={value === null}
					>Play <Icon class="text-xl" icon="solar:play-circle-bold" /></a
				>
			</div>
		</div>
	{/if}
</div>
