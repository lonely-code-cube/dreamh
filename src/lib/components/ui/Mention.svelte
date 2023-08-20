<script lang="ts">
	export let img: string | null = null;
	export let bg: string | null = 'secondary';
</script>

<button class="{bg} inline-flex items-center font-bold px-1 rounded">
	<span class="mr-1"><slot /></span>
	{#if img}
		<img class="w-6 rounded-full inline" alt="participant pfp" src={img} />
	{/if}
</button>

<style>
	.primary {
		@apply bg-primary text-primary-content;
	}
	.secondary {
		@apply bg-secondary text-secondary-content;
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
