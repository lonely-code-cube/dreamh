<script lang="ts">
	export let medias: string[];

	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
</script>

<div class="relative">
	{#if browser}
		<Carousel>
			<div>yo 0</div>
			<div>yo 1</div>
			<div>yo 2</div>
			<div let:showPage let:pagesCount slot="dots">
				{#each Array(pagesCount) as _, pageIndex (pageIndex)}
					<button on:click={() => showPage(pageIndex)}>{pageIndex}</button>
				{/each}
			</div>
		</Carousel>
		<div class="absolute top-2 right-2 bg-base-200 bg-opacity-70 px-2 rounded shadow-xl text-sm">
			1/1
		</div>
	{/if}
</div>
