<script lang="ts">
	import { space } from 'postcss/lib/list';
	import { onMount } from 'svelte';

	export let at: number;

	let d: number;
	let h: number;
	let m: number;
	let s: number;

	at = new Date(at * 1000).getTime();
	onMount(() => {
		let timer = setInterval(() => {
			let now = new Date().getTime();
			let seconds = at - now;

			d = Math.floor(seconds / (1000 * 60 * 60 * 24));
			h = Math.floor((seconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			m = Math.floor((seconds % (1000 * 60 * 60)) / (1000 * 60));

			if (seconds < 0) {
				clearInterval(timer);
			}
		}, 1000);
	});
</script>

<span class="inline-flex gap-1">
	{#if d > 0}
		<span>{d}d</span>
	{/if}
	{#if h > 0}
		<span>{h}h</span>
	{/if}
	<span>{m}m</span>
</span>
