<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col items-center mt-20">
	{#if $page.status === 404}
		<img class="dark-invert" src="/404.png" alt="" />
		<!-- <div>C\C=C(/C)Br.CC(O)C#C.C1=CC=NC=C1</div> -->
		<div>but-3-yn-2-ol, pyridine, 2-bromobut-2-ene</div>
		<div>
			Or go back to <a class="link link-primary" href="/">home</a> instead <Icon
				class="inline text-2xl"
				icon="twemoji:pensive-face"
			/>
		</div>
	{:else}
		<div class="text-4xl">{$page.status}</div>
		<div class="text-xl">{$page.error?.message}</div>
	{/if}
</div>