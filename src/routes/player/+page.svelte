<script lang="ts">
	export let data: {
		m3u8: boolean;
		json: boolean;
		src: string | null;
		config: {
			src: string;
			title: string | undefined;
			head_title: string | undefined;
			poster: string | undefined;
			playlist:
				| undefined
				| {
						src: string;
						title: string | undefined;
						active: boolean | undefined;
				  }[];
			series:
				| undefined
				| {
						title: string;
						url: string | undefined;
						current: boolean | undefined;
				  }[];
		};
	};
	let value: string | null = null;

	import 'vidstack/styles/defaults.css';
	import 'vidstack/styles/community-skin/video.css';
	import { defineCustomElements } from 'vidstack/elements';
	import type { MediaPlayerElement } from 'vidstack';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	defineCustomElements();

	let player: MediaPlayerElement;

	function clearPlaylistActives() {
		data.config.playlist?.forEach((item) => {
			item.active = false;
		});
	}

	onMount(() => {
		setInterval(() => {
			player.onAttach(() => {
				const { currentTime } = player.state;
			});
		}, 5000);
	});
</script>

<svelte:head>
	{#if data.config?.head_title}
		<title>{data.config?.head_title}</title>
	{/if}
</svelte:head>

<div>
	{#if data.m3u8}
		<media-player
			bind:this={player}
			class="bg-base-200"
			src={data.src}
			load="eager"
			aspect-ratio="16/9"
			crossorigin
		>
			<media-outlet />
			<media-community-skin />
		</media-player>
	{:else if data.json}
		<div class="flex flex-col lg:flex-row gap-3">
			<div class="lg:basis-2/3 h-min">
				<media-player
					bind:this={player}
					class="bg-base-200"
					poster={data.config.poster}
					src={data.config.src}
					title={data.config.title}
					load="eager"
					aspect-ratio="16/9"
					crossorigin
				>
					<media-outlet />
					<media-community-skin />
				</media-player>
				{#if data.config.series}
					<div class="px-5 flex flex-wrap gap-2">
						{#each data.config.series as series, i}
							<a
								href={series.url || null}
								class:active={series.current}
								class="w-max bg-base-200 px-3 py-2 rounded transition hover:bg-secondary-focus hover:text-secondary-content"
								>{series.title}</a
							>
						{/each}
					</div>
				{/if}
			</div>
			{#if data.config.playlist}
				<div
					class="lg:basis-1/3 bg-base-200 lg:flex-grow max-h-[700px] overflow-y-scroll p-5 flex flex-col gap-1"
				>
					{#each data.config.playlist as item, i}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<btn
							on:click={() => {
								data.config.src = item.src;
								data.config.title = item.title;
								clearPlaylistActives();
								item.active = true;
							}}
							class="even:bg-base-100 rounded cursor-pointer bg-base-300 px-5 py-6 flex gap-2 items-center transition hover:bg-secondary-focus hover:text-secondary-content"
							class:active={item.active}
						>
							<div class="px-2 bg-base-100 text-base-content bg-opacity-50 rounded-lg">
								#{i + 1}
							</div>
							{item.title}
							<Icon class="text-xl" icon="icon-park-solid:play" />
							<div class="flex-grow" />
							<Icon class="text-xl" icon="ph:download-duotone" />
						</btn>
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<div class="h-[500px] flex flex-col items-center justify-center">
			<div class="font-bold text-4xl">Nothing to play :(</div>
			<div>
				<input
					bind:value
					placeholder="m3u8 link or json config"
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

<style>
	.active {
		background-color: hsl(var(--s) / var(--tw-bg-opacity)) !important;
		@apply text-secondary-content;
	}
	.active:hover {
		background-color: hsl(var(--sf) / var(--tw-bg-opacity)) !important;
		@apply text-secondary-content;
	}
</style>
