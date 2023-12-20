<script lang="ts">
	import EntityPreview from '$lib/components/EntityPreview.svelte';
	import Countdown from '$lib/components/ui/Countdown.svelte';
	import Icon from '@iconify/svelte';
	import { queryStore, type Client, gql } from '@urql/svelte';
	import { slide } from 'svelte/transition';

	import { getContext } from 'svelte';
	let anilist: Client = getContext('anilist');

	const home = queryStore({
		client: anilist,
		query: gql`
			query {
				airs: Page {
					media(seasonYear: 2023, season: FALL, type: ANIME, status: RELEASING) {
						id
						title {
							userPreferred
						}
						coverImage {
							large
						}
						status
						seasonYear
						season
						episodes
						nextAiringEpisode {
							airingAt
							episode
						}
					}
				}

				upcoming: Page {
					media(seasonYear: 2024, season: WINTER, type: ANIME) {
						id
						title {
							userPreferred
						}
						coverImage {
							large
						}
					}
				}

				trendingAnime: Page(page: 1, perPage: 7) {
					media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
						id
						title {
							userPreferred
						}
						bannerImage
					}
				}
			}
		`
	});

	function sortAir(a: any, b: any) {
		if (a.nextAiringEpisode?.airingAt && b.nextAiringEpisode?.airingAt) {
			return a.nextAiringEpisode.airingAt > b.nextAiringEpisode.airingAt ? 1 : -1;
		}
		return 0;
	}

	let y: number;
	let currentBanner = 0;
</script>

<svelte:window bind:scrollY={y} />
<svelte:head>
	<!-- Primary Meta Tags -->
	<title
		>DreamH Community - Quenching your thirst for Sauce | Stream, Read and Appreciate Anime, Hanime,
		Manga & Doujins</title
	>
	<meta
		name="title"
		content="DreamH Community - Quenching your thirst for Sauce | Stream, Read and Appreciate Anime, Hanime, Manga & Doujins"
	/>
	<meta
		name="description"
		content="Create forums for your favorite anime, hanime, manga & doujins.  Search through community maintained recomendation records, and so much more..."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="DreamH Community - Quenching your thirst for Sauce | Stream, Read and Appreciate Anime, Hanime, Manga & Doujins"
	/>
	<meta
		property="og:description"
		content="Create forums for your favorite anime, hanime, manga & doujins.  Search through community maintained recomendation records, and so much more..."
	/>
	<meta property="og:image" content="/embed_img.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="600" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		property="twitter:title"
		content="DreamH Community - Quenching your thirst for Sauce | Stream, Read and Appreciate Anime, Hanime, Manga & Doujins"
	/>
	<meta
		property="twitter:description"
		content="Create forums for your favorite anime, hanime, manga & doujins.  Search through community maintained recomendation records, and so much more..."
	/>
	<meta property="twitter:image" content="/embed_img.png" />
</svelte:head>

<div class="scroll-smooth" style="will-change: transform;">
	{#if $home.fetching}
		<div class="h-64 md:h-[30rem] skeleton" style="transform: translate(0, {y - y / 4}px);" />
	{:else if $home.data}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="h-64 md:h-[30rem] relative" style="transform: translate(0, {y / 2}px);">
			{#each $home.data.trendingAnime.media as a, i}
				{#if i == currentBanner}
					<div
						transition:slide
						style="background-image: url({a.bannerImage});"
						class="h-full bg-center bg-cover bg-no-repeat"
					>
						<div>
							<div
								style="background: linear-gradient(to bottom, oklch(var(--b1) / 0.7) 10%, rgba(0, 0, 0, {y >
								800
									? 0.8
									: y / 300}) 50%,  oklch(var(--b1)/0.7) 100%);"
								class="absolute inset-0"
							>
								<button
									class:hidden={y > 100}
									on:click={() => {
										currentBanner = (currentBanner + 1) % $home.data.trendingAnime.media.length;
									}}
									class="absolute top-5 right-5 drop-shadow-[0px_0px_5px_#000] text-3xl"
								>
									<Icon icon="icon-park-solid:up-c" />
								</button>
								<button
									class:hidden={y > 100}
									on:click={() => {
										currentBanner =
											currentBanner - 1 < 0
												? $home.data.trendingAnime.media.length - 1
												: currentBanner - 1;
									}}
									class="absolute bottom-14 md:bottom-32 right-5 drop-shadow-[0px_0px_5px_#000] text-3xl"
								>
									<Icon icon="icon-park-solid:down-c" />
								</button>
							</div>
							<div
								class="absolute top-5 left-5 w-2/3 text-2xl md:text-5xl font-bold drop-shadow-[0px_0px_5px_#000]"
							>
								{a.title.userPreferred}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	<div class="-translate-y-16 md:-translate-y-32 m-3 md:mx-5">
		<div>
			<a href="/anime/airing" class="mb-3 flex justify-between items-center">
				<div class="font-semibold text-base">AIRING ANIME</div>
				<a href="/anime/airing" class="text-sm">View More</a>
			</a>
			<div class="grid grid-flow-col grid-rows-2 md:grid-rows-1 gap-3 md:gap-5 justify-between">
				{#if $home.fetching}
					{#each Array(7) as _}
						<div
							class="[&:nth-child(7)]:hidden md:[&:nth-child(6)]:hidden lg:[&:nth-child(6)]:block lg:[&:nth-child(7)]:block"
						>
							<EntityPreview loading={true} thumbnail={''} title={''} url={'/'} />
						</div>
					{/each}
				{:else if $home.error}
					<p>Oh no... {$home.error.message}</p>
				{:else}
					{#each $home.data.airs.media.sort(sortAir).slice(0, 7) as media}
						<div
							class="[&:nth-child(7)]:hidden md:[&:nth-child(6)]:hidden lg:[&:nth-child(6)]:block lg:[&:nth-child(7)]:block"
						>
							<EntityPreview
								thumbnail={media.coverImage.large}
								title={media.title.userPreferred}
								url={`/anime/${media.id}`}
							>
								<span class="px-1 py-0.5 bg-base-100/70 rounded font-semibold" slot="corner-tl">
									<Countdown at={media.nextAiringEpisode.airingAt} />
								</span>
								<span class="px-1 py-0.5 bg-base-100/70 rounded font-semibold" slot="corner-br">
									EP {media.nextAiringEpisode.episode}
								</span>
							</EntityPreview>
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<!-- just aired -->
		<div class="mt-4">
			<a href="/anime/airing" class="mb-3 flex justify-between items-center">
				<div class="font-semibold text-base">UPCOMING</div>
				<a href="/anime/airing" class="text-sm">View More</a>
			</a>
			<div class="grid grid-flow-col grid-rows-2 md:grid-rows-1 gap-3 md:gap-5 justify-between">
				{#if $home.fetching}
					{#each Array(7) as _}
						<div
							class="[&:nth-child(7)]:hidden md:[&:nth-child(6)]:hidden lg:[&:nth-child(6)]:block lg:[&:nth-child(7)]:block"
						>
							<EntityPreview loading={true} thumbnail={''} title={''} url={'/'} />
						</div>
					{/each}
				{:else if $home.error}
					<p>Oh no... {$home.error.message}</p>
				{:else}
					{#each $home.data.upcoming.media.slice(0, 7) as media}
						<div
							class="[&:nth-child(7)]:hidden md:[&:nth-child(6)]:hidden lg:[&:nth-child(6)]:block lg:[&:nth-child(7)]:block"
						>
							<EntityPreview
								thumbnail={media.coverImage.large}
								title={media.title.userPreferred}
								url={`/anime/${media.id}`}
							/>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
