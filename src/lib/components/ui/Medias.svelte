<script lang="ts">
	export let medias: string[];
</script>

<div class="relative">
	<img src={medias[0]} alt="" />
	<div class="absolute top-2 right-2 bg-base-200 bg-opacity-70 px-2 rounded shadow-xl text-sm">
		1/1
	</div>
</div>
