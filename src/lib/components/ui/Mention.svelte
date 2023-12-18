<script lang="ts">
	export let img: string | null = null;
	export let bg: string | null = 'primary';
	export let copy: string | null = null;

	import Icon from '@iconify/svelte';
	import { toast } from '@zerodevx/svelte-toast';
</script>

<button class="{bg} inline-flex items-center font-bold px-1 py-[0.5rrem] rounded">
	{#if copy}
		<button
			on:click={() => {
				//@ts-ignore
				navigator.clipboard.writeText(copy);
				toast.push('Copied to clipboard', { classes: ['success-toast'] });
			}}
		>
			<Icon class="mr-1.5" icon="solar:copy-bold-duotone" />
		</button>
	{/if}
	<span class="mr-1"><slot /></span>
	{#if img}
		<img class="w-5 rounded-full inline" alt="participant pfp" src={img} />
	{/if}
</button>

<style>
	.base-200 {
		@apply bg-base-200 text-base-content;
	}
	.base-300 {
		@apply bg-base-300 text-base-content;
	}
	.primary {
		@apply bg-primary text-primary-content;
	}
	.secondary {
		@apply bg-secondary text-secondary-content;
	}
	.accent {
		@apply bg-accent text-accent-content;
	}
	.neutral {
		@apply bg-neutral text-neutral-content;
	}
	.success {
		@apply bg-success text-success-content;
	}
	.warning {
		@apply bg-warning text-warning-content;
	}
	.error {
		@apply bg-error text-error-content;
	}
</style>
