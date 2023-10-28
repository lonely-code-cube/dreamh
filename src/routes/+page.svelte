<script lang="ts">
	import EntityPreview from '$lib/components/EntityPreview.svelte';
	import Icon from '@iconify/svelte';
	import { queryStore, type Client, gql } from '@urql/svelte';

	import { getContext } from 'svelte';
	let anilist: Client = getContext('anilist');

	const home = queryStore({
		client: anilist,
		query: gql`
			query ($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int) {
				trendingAnime: Page(page: 1, perPage: 7) {
					media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
						...media
					}
				}
				trendingManga: Page(page: 1, perPage: 7) {
					media(sort: TRENDING_DESC, type: MANGA, isAdult: false) {
						...media
					}
				}
				seasonAnime: Page(page: 1, perPage: 7) {
					media(
						season: $season
						seasonYear: $seasonYear
						sort: POPULARITY_DESC
						type: ANIME
						isAdult: false
					) {
						...media
					}
				}
				seasonManga: Page(page: 1, perPage: 7) {
					media(
						season: $season
						seasonYear: $seasonYear
						sort: POPULARITY_DESC
						type: MANGA
						isAdult: false
					) {
						...media
					}
				}
				nextSeason: Page(page: 1, perPage: 7) {
					media(
						season: $nextSeason
						seasonYear: $nextYear
						sort: POPULARITY_DESC
						type: ANIME
						isAdult: false
					) {
						...media
					}
				}
				popular: Page(page: 1, perPage: 7) {
					media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
						...media
					}
				}
				top: Page(page: 1, perPage: 10) {
					media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
						...media
					}
				}
			}

			fragment media on Media {
				id
				title {
					userPreferred
				}
				coverImage {
					extraLarge
					large
					color
				}
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				bannerImage
				season
				seasonYear
				description
				type
				format
				status(version: 2)
				episodes
				duration
				chapters
				volumes
				genres
				isAdult
				averageScore
				popularity
				mediaListEntry {
					id
					status
				}
				nextAiringEpisode {
					airingAt
					timeUntilAiring
					episode
				}
				studios(isMain: true) {
					edges {
						isMain
						node {
							id
							name
						}
					}
				}
			}
		`
	});
</script>

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
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="600">

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
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

<div>
	<div class="m-3 md:m-5">
		<a href="/anime/trending" class="mb-5 flex justify-between items-center">
			<div class="font-semibold">TRENDING ANIME</div>
			<a href="/anime/trending" class="text-sm">View More</a>
		</a>
		<div class="grid grid-flow-col grid-rows-2 md:grid-rows-1 gap-3 md:gap-5 justify-between">
			{#if $home.fetching}
				loading...
			{:else if $home.error}
				<p>Oh no... {$home.error.message}</p>
			{:else}
				{#each $home.data.trendingAnime.media as media}
					<div class="[&:nth-child(7)]:hidden md:[&:nth-child(6)]:hidden lg:[&:nth-child(6)]:block lg:[&:nth-child(7)]:block">
						<EntityPreview
							thumbnail={media.coverImage.large}
							title={media.title.userPreferred}
							url="/"
						/>
					</div>
				{/each}
			{/if}
		</div>
		<div class="h-10" />
		<a href="/manga/trending" class="mb-5 flex justify-between items-center">
			<div class="font-semibold">TRENDING MANGA</div>
			<a href="/manga/trending" class="text-sm">View More</a>
		</a>
		<div class="grid grid-flow-col grid-rows-2 md:grid-rows-1 gap-3 md:gap-5 justify-between">
			{#if $home.fetching}
				loading...
			{:else if $home.error}
				<p>Oh no... {$home.error.message}</p>
			{:else}
				{#each $home.data.trendingManga.media as media}
					<div class="[&:nth-child(7)]:hidden md:[&:nth-child(6)]:hidden lg:[&:nth-child(6)]:block lg:[&:nth-child(7)]:block">
						<EntityPreview
							thumbnail={media.coverImage.large}
							title={media.title.userPreferred}
							url="/"
						/>
					</div>
				{/each}
			{/if}
		</div>
		<div class="h-10" />
		<a href="/manga/trending" class="mb-5 flex justify-between items-center">
			<div class="font-semibold">POPULAR ANIME THIS SEASON</div>
			<a href="/manga/trending" class="text-sm">View More</a>
		</a>
		<div class="grid grid-flow-col grid-rows-2 md:grid-rows-1 gap-3 md:gap-5 justify-between">
			{#if $home.fetching}
				loading...
			{:else if $home.error}
				<p>Oh no... {$home.error.message}</p>
			{:else}
				{#each $home.data.seasonAnime.media as media}
					<div class="[&:nth-child(7)]:hidden md:[&:nth-child(6)]:hidden lg:[&:nth-child(6)]:block lg:[&:nth-child(7)]:block">
						<EntityPreview
							thumbnail={media.coverImage.large}
							title={media.title.userPreferred}
							url="/"
						/>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
