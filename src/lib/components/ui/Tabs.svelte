<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let content: HTMLElement;
	let currentTab: HTMLDivElement;
	export let tabIndex = 0;
	onMount(() => {
		currentTab = content.querySelectorAll(':scope > div')[tabIndex] as HTMLDivElement;
	});
	$: if (content) {
		currentTab = content.querySelectorAll(':scope > div')[tabIndex] as HTMLDivElement;
	}
</script>

<div class="hidden" bind:this={content}>
	<slot />
</div>

{#if content}
	<div class="tabs flex">
		{#each content.querySelectorAll(':scope > div') as tab, i}
			<button
				on:click={() => {
					tabIndex = i;
				}}
				class:tab-active={i === tabIndex}
				class="tab tab-bordered flex-grow gap-2 flex items-center"
				>{tab.getAttribute('data-title')}
				{#if tab.getAttribute('data-icon')}
					<Icon icon={tab.getAttribute('data-icon')} />
				{/if}
			</button>
		{/each}
	</div>
{/if}
{#if currentTab}
	{@html currentTab.innerHTML}
{/if}

<style>
	.tab-active {
		@apply active;
	}
</style>
