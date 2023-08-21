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
						current: boolean | undefined;
				  }[];
			series:
				| undefined
				| {
						title: string;
						url: string | undefined;
						current: boolean | undefined;
				  }[];
			info: undefined | string;
		};
	};
	let value: string | null = null;
	let isJson = false;
	let infoOpen = false;

	import 'vidstack/styles/defaults.css';
	import 'vidstack/styles/community-skin/video.css';
	import { defineCustomElements } from 'vidstack/elements';
	import type { MediaPlayerElement } from 'vidstack';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/ui/Modal.svelte';

	defineCustomElements();

	let player: MediaPlayerElement;

	function clearPlaylistcurrents() {
		data.config.playlist?.forEach((item) => {
			item.current = false;
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
	{#if data.config?.title}
		<title>{data.config?.title}</title>
	{:else if data.config?.head_title}
		<title>{data.config?.head_title}</title>
	{:else}
		<title>D2O5 Player</title>
	{/if}
	{#if data.config?.head_title}
		<meta property="og:title" content={data.config?.head_title} />
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
					<details class="ml-5 dropdown">
						<summary class="m-1 btn">Series <Icon icon="ooui:expand" /></summary>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
							{#each data.config.series as series, i}
								<li>
									<a
										href={series.url || null}
										class:current={series.current}
										class="w-full bg-base-200 px-3 py-2 rounded transition hover:bg-secondary-focus hover:text-secondary-content"
										>{series.title}</a
									>
								</li>
							{/each}
						</ul>
					</details>
				{/if}
				{#if data.config.info}
					<Modal bind:open={infoOpen}>
						<div class="w-[300px] md:w-[600px]">
							<div>{data.config.info}</div>
						</div>
					</Modal>
					<button
						on:click={() => {
							infoOpen = true;
						}}
						class="btn">Info <Icon class="text-xl" icon="material-symbols:info-outline" /></button
					>
				{/if}
			</div>
			{#if data.config.playlist}
				<div
					class="lg:basis-1/3 bg-base-200 lg:flex-grow max-h-[700px] overflow-y-scroll p-5 flex flex-col gap-2 rounded"
				>
					{#each data.config.playlist as item, i}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<btn
							on:click={() => {
								data.config.src = item.src;
								data.config.title = item.title;
								clearPlaylistcurrents();
								item.current = true;
							}}
							class="even:bg-base-100 rounded cursor-pointer bg-base-300 px-5 py-2 flex gap-2 items-center transition hover:bg-secondary-focus hover:text-secondary-content"
							class:current={item.current}
						>
							<div class="px-2 bg-base-100 text-base-content bg-opacity-50 rounded-lg">
								#{i + 1}
							</div>
							{item.title}
							<Icon class="text-xl" icon="icon-park-solid:play" />
							<div class="flex-grow" />
							<button class="btn btn-circle bg-neutral text-neutral-content rounded-full"
								><Icon class="text-xl" icon="ph:download-duotone" /></button
							>
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
					placeholder="Video link or json config (check)"
					type="text"
					class="input input-bordered bg-base-200 mt-5 md:w-[400px]"
				/>
				<a
					class="btn"
					href={`/player?src=${value}${isJson ? '&json=true' : ''}`}
					class:btn-disabled={value === null || value === ''}
					>Play <Icon class="text-xl" icon="solar:play-circle-bold" /></a
				>
				<div class="form-control w-fit">
					<label class="label cursor-pointer">
						<span class="label-text mr-2">Json Config</span>
						<input type="checkbox" bind:checked={isJson} class="checkbox checkbox-secondary" />
					</label>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.current {
		background-color: hsl(var(--s) / var(--tw-bg-opacity)) !important;
		@apply text-secondary-content;
	}
	.current:hover {
		background-color: hsl(var(--sf) / var(--tw-bg-opacity)) !important;
		@apply text-secondary-content;
	}
</style>
