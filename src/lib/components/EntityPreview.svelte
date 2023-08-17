<script lang="ts">
	export let thumbnail: string;
	export let title: string;
	export let url: string;
</script>

<a class="hover:-translate-y-3 transition flex flex-col w-[150px] md:w-[225px]" href={url}>
	<div
		class="rounded p-5 bg-cover bg-none bg-top flex-grow h-[200px] md:h-[300px] shadow-lg"
		style="background-image: url({thumbnail});"
	/>
	<h3 class="line-clamp-2 md:text-lg">{title}</h3>
</a>
