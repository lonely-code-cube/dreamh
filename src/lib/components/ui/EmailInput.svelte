<script lang="ts">
	export let value: string | null = null;
	export let placeholder: string | null = null;
	export let error: string | null = null;

	import { slide } from 'svelte/transition';

	function onInput(event: Event) {
		value = (event.target as HTMLInputElement).value;
		error = null;
	}
</script>

<div>
	<div class="relative">
		<input
			id="input"
			on:input={onInput}
			class:error
			{placeholder}
			class="or-10 relative w-full border-b border-neutral bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all duration-200 placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0"
			type="email"
		/>
		{#if $$slots.icon}
			<div class="absolute right-1 bottom-1">
				<slot name="icon" />
			</div>
		{/if}
	</div>
	{#if error}
		<label transition:slide={{ axis: 'y' }} for="input" class="text-error">{error}</label>
	{/if}
</div>

<style>
	.error {
		@apply border-error;
	}
</style>
