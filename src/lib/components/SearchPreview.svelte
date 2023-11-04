<script lang="ts">
	export let loading = false;
	export let thumbnail: string | undefined;
	export let title: string | undefined;
	export let url: string | undefined;
</script>

<a class="transition flex gap-3" href={url}>
	<div
		class="relative rounded p-5 bg-cover bg-top h-[100px] w-[70px]"
		class:animate-pulse={loading}
		style={loading ? '' : `background-image: url(${thumbnail});`}
	>
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
	</div>
	{#if loading}
		<div class="bg-base-300 mt-3 p-2 rounded-2xl w-[90%]" class:animate-pulse={loading} />
	{:else}
		<h3 class="line-clamp-2 text-sm mt-2 font-semibold text-base-content/80">
			{title}
		</h3>
	{/if}
</a>
