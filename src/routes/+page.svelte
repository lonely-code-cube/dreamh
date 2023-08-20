<script>
	import EntityPreview from '$lib/components/EntityPreview.svelte';
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>DreamH Community</title>
</svelte:head>

<div class="p-5 md:p-10 flex flex-wrap justify-around gap-5">
	<div>
		<EntityPreview
			thumbnail="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974707799/kaguya-sama-love-is-war-vol-11-9781974707799_hr.jpg"
			title="Kayuya Sama: Love Is War"
			url="/"
		>
			<svelte:fragment slot="corner-tl">
				<div class="bg-base-200 bg-opacity-70 px-1 rounded text-sm">12 ep</div>
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
