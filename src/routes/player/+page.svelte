<script lang="ts">
	export let data: {
		m3u8: boolean;
		json: boolean;
		src: string | undefined;
		config:
			| {
					title: string;
					current_video: number;
					current_series: number | undefined;
					thumbnail: string | undefined;
					width: string | undefined;
					height: string | undefined;
					playlist: {
						src: string;
						title: string;
						thumbnail: string | undefined;
					}[];
					series:
						| undefined
						| {
								title: string;
								url: string | undefined;
								thumbnail: string | undefined;
						  }[];
					info: undefined | string;
			  }
			| undefined;
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

	function verify_config(config: {
		title: string;
		current_video: number;
		current_series: number | undefined;
		playlist: {
			src: string;
			title: string | undefined;
			thumbnail: string | undefined;
		}[];
		series:
			| undefined
			| {
					title: string;
					url: string | undefined;
					thumbnail: string | undefined;
			  }[];
		info: undefined | string;
	}) {
		if (
			config.current_video != undefined &&
			config.playlist &&
			config.playlist.length > config.current_video
		) {
			return true;
		}
		return false;
	}
</script>

<svelte:head>
	{#if data.config?.playlist}
		<title>{data.config.title}</title>

		<meta name="title" content={`${data.config.title} - Watch on DreamH player`} />
		<meta
			name="description"
			content={data.config.info ||
				'Stream videos online, customize playlists, series, themes and more in the DreamH player'}
		/>

		<!-- Open Graph / Facebook -->
		<meta property="og:type" content="website" />
		<meta property="og:title" content={`${data.config.title} - Watch on DreamH player`} />
		<meta
			property="og:description"
			content={data.config.info ||
				'Stream videos online, customize playlists, series, themes and more in the DreamH player'}
		/>
		<meta property="og:image" content={data.config.thumbnail || '/embed_img.png'} />
		<meta property="og:image:width" content={data.config.width || '700'} />
		<meta property="og:image:height" content={data.config.width || '1000'} />

		<!-- Twitter -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta property="twitter:title" content={`${data.config.title} - Watch on DreamH player`} />
		<meta
			property="twitter:description"
			content={data.config.info ||
				'Stream videos online, customize playlists, series, themes and more in the DreamH player'}
		/>
		<meta property={data.config.thumbnail || '/embed_img.png'} />
	{/if}
</svelte:head>

<div>
	{#if data.m3u8}
		<media-player
			bind:this={player}
			class="bg-base-200"
			src={data.src}
			type="video/hls"
			load="eager"
			aspect-ratio="16/9"
			crossorigin
		>
			<media-outlet />
			<media-community-skin />
		</media-player>
	{:else if data.json}
		{#if data.config && verify_config(data.config)}
			<div class="flex flex-col lg:flex-row">
				<div class="lg:basis-2/3 h-min">
					<media-player
						bind:this={player}
						class="bg-base-200"
						poster={data.config.playlist[data.config.current_video]?.thumbnail}
						src={data.config.playlist[data.config.current_video].src}
						title={data.config.playlist[data.config.current_video]?.title}
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
											class:current={i == data.config.current_series}
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
						class="lg:basis-1/3 bg-base-200 lg:flex-grow max-h-[700px] overflow-y-scroll p-2 flex flex-col gap-2 rounded"
					>
						{#each data.config.playlist as item, i}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<btn
								on:click={() => {
									if (data.config) {
										data.config.title = item.title;
										data.config.current_video = i;
									}
								}}
								class="even:bg-base-100 rounded cursor-pointer bg-base-300 pl-2 pr-5 py-2 flex gap-2 items-center transition hover:bg-primary-focus hover:text-primary-content text-sm md:text-base"
								class:current={i == data.config.current_video}
							>
								<div class="px-2 font-bold">
									#{i + 1}
								</div>
								{#if item.thumbnail}
									<img class="h-12" src={item.thumbnail} alt="" />
								{/if}
								{item.title}
								<div class="flex-grow" />
								<button class="btn btn-circle rounded-full"
									><Icon class="text-xl" icon="ph:download-duotone" /></button
								>
							</btn>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<div class="h-[500px] flex flex-col items-center justify-center">
				<div class="font-bold text-4xl">Config is invalid :(</div>
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
							<input type="checkbox" bind:checked={isJson} class="checkbox checkbox-primary" />
						</label>
					</div>
				</div>
			</div>
		{/if}
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
						<input type="checkbox" bind:checked={isJson} class="checkbox checkbox-primary" />
					</label>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.current {
		background-color: oklch(var(--p) / var(--tw-bg-opacity)) !important;
		@apply text-primary-content;
	}
	.current:hover {
		background-color: oklch(var(--pf) / var(--tw-bg-opacity)) !important;
		@apply text-primary-content;
	}
</style>
