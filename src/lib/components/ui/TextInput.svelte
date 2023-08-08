<script lang="ts">
	export let value: string | null = null;
	export let placeholder: string | null = null;
	export let error: string | null = null;

	function onInput(event: Event) {
		error = null;
		value = (event.target as HTMLInputElement).value;
	}
</script>

<div>
	<div class="relative">
		<input
			id="input"
			on:input={onInput}
			class:error
			{placeholder}
			class="pr-10 w-full border-b border-neutral bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all duration-200 placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0"
			type="text"
		/>
		<div class="absolute right-1 bottom-1">
			<slot name="icon" />
		</div>
	</div>
	{#if error}
		<label for="input" class="text-error">{error}</label>
	{/if}
</div>

<style>
	.error {
		@apply border-error;
	}
</style>
