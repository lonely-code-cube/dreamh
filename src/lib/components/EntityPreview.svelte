<script lang="ts">
	export let loading = false;
	export let thumbnail: string | undefined;
	export let title: string | undefined;
	export let url: string | undefined;
</script>

<a class="transition flex flex-col w-[110px] md:w-[161px] lg:w-[185px]" href={url}>
	<div
		class="relative rounded p-5 bg-cover bg-top flex-grow h-[166px] md:h-[230px] lg:h-[264px] shadow-lg bg-base-content/10"
		class:skeleton={loading}
		style={loading ? '' : `background-image: url(${thumbnail});`}
	>
		<div class="absolute left-2 top-1">
			<slot name="corner-tl" />
		</div>
		<div class="absolute right-2 top-1">
			<slot name="corner-tr" />
		</div>
		<div class="absolute left-2 bottom-1">
			<slot name="corner-bl" />
		</div>
		<div class="absolute right-2 bottom-1">
			<slot name="corner-br" />
		</div>
	</div>
	{#if loading}
		<div class="bg-base-content/10 mt-3 p-2 rounded-2xl w-[100%]" class:skeleton={loading} />
		<div class="bg-base-content/10 mt-3 p-2 rounded-2xl w-[80%]" class:skeleton={loading} />
	{:else}
		<h3 class="line-clamp-2 text-sm mt-2 font-semibold text-base-content/80">
			{title}
		</h3>
	{/if}
</a>
