<script lang="ts">
	export let loading = false;
	export let thumbnail: string | undefined;
	export let title: string | undefined;
	export let url: string | undefined;
</script>

<a class="relative transition flex flex-col w-[110px] md:w-[161px] lg:w-[185px]" href={url}>
	<div
		class="rounded p-5 bg-cover bg-top flex-grow h-[166px] md:h-[230px] lg:h-[264px] shadow-lg bg-base-300"
		class:animate-pulse={loading}
		style={loading ? '' : `background-image: url(${thumbnail});`}
	/>
	{#if loading}
		<div class="bg-base-300 mt-3 p-2 rounded-2xl w-[90%]" class:animate-pulse={loading} />
	{:else}
		<h3 class="line-clamp-2 text-sm mt-2 font-semibold text-base-content/80">
			{title}
		</h3>
	{/if}
	<div class="absolute left-2 top-2">
		<slot name="corner-tl" />
	</div>
	<div class="absolute right-2 top-2">
		<slot name="corner-tr" />
	</div>
	<div class="absolute left-2 bottom-2">
		<slot name="corner-bl" />
	</div>
	<div class="absolute right-2 bottom-2">
		<slot name="corner-br" />
	</div>
</a>
