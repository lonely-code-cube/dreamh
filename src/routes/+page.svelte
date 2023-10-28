<script>
	import EntityPreview from '$lib/components/EntityPreview.svelte';
	import Icon from '@iconify/svelte';
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

	<!-- Twitter -->
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
		<div class="mb-5 flex justify-between">
			<div class="font-semibold">TRENDING ANIME</div>
			<a href="/" class="text-sm">View More</a>
		</div>
		<div class="flex flex-wrap gap-3 md:gap-6">
			<div>
				<EntityPreview
					thumbnail="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974707799/kaguya-sama-love-is-war-vol-11-9781974707799_hr.jpg"
					title="Kayuya Sama: Love Is War"
					url="/"
				>
					<svelte:fragment slot="corner-tl">
						<div class="bg-base-200 shadow-lg px-1 rounded text-sm">12 ep</div>
					</svelte:fragment>
				</EntityPreview>
			</div>
			<div>
				<EntityPreview
					thumbnail="https://i.pinimg.com/originals/f7/29/7c/f7297cd291e6a5165de1e2a5bf27ffcd.jpg"
					title="Horimiya Peace"
					url="/"
				/>
			</div>
			<div>
				<EntityPreview
					thumbnail="https://i.pinimg.com/originals/3a/37/25/3a37254e501483afb205d77710faab00.jpg"
					title="The Fragmented ALiS"
					url="/"
				/>
			</div>
			<div>
				<EntityPreview
					thumbnail="https://kiryuu.id/wp-content/uploads/2021/04/mijuku-na-futari-de-gozaimasu-852942-jQXgUU78.jpg"
					title="Mijuku ma Futari de Gozaimasu ga"
					url="/"
				/>
			</div>
		</div>
	</div>
</div>
