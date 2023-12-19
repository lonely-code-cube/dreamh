<script lang="ts">
	import EntityPreview from '$lib/components/EntityPreview.svelte';
	import Countdown from '$lib/components/ui/Countdown.svelte';
	import Icon from '@iconify/svelte';
	import { queryStore, type Client, gql } from '@urql/svelte';

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
							english
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
			}
		`
	});

	function sortAir(a: any, b: any) {
		if (a.nextAiringEpisode?.airingAt && b.nextAiringEpisode?.airingAt) {
			return a.nextAiringEpisode.airingAt > b.nextAiringEpisode.airingAt ? 1 : -1;
		}
		return 0;
	}
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

<div>
	<div class="m-3 md:mx-5">
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
							<span class="px-1 py-0.5 bg-base-100/60 rounded font-semibold" slot="corner-tl">
								<Countdown at={media.nextAiringEpisode.airingAt} />
							</span>
							<span class="px-1 py-0.5 bg-base-100/60 rounded font-semibold" slot="corner-br">
								EP {media.nextAiringEpisode.episode}
							</span>
						</EntityPreview>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
