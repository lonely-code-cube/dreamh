<script lang="ts">
	export let thumbnail: string;
	export let title: string;
	export let url: string;
</script>

<a class="relative transition flex flex-col w-[110px] md:w-[150px] lg:w-[200px]" href={url}>
	<div
		class="rounded p-5 bg-cover bg-none bg-top flex-grow h-[166px] md:h-[214px] lg:h-[286px] shadow-lg"
		style="background-image: url({thumbnail});"
	/>
	<h3 class="line-clamp-2 text-sm mt-2 font-semibold text-base-content/80">{title}</h3>
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
