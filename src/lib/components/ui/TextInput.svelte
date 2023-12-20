<script lang="ts">
	export let value: string | null = null;
	export let placeholder: string | null = null;
	export let error: string | null = null;

	function onInput(event: Event) {
		error = null;
		value = (event.target as HTMLInputElement).value;
	}
</script>

<div class="w-full">
	<div class="relative mt-2">
		<input
			on:input={onInput}
			class:error
			class="peer h-full w-full border-b border-base-content/50 bg-transparent pt-4 outline outline-0 transition-all placeholder-shown:border-base-content/50 focus:border-primary focus:outline-0 disabled:border-0"
			placeholder=" "
			type="text"
		/>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label
			class="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate leading-tight text-base-content/70 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:leading-tight peer-focus:text-base-content peer-focus:after:scale-x-100 peer-disabled:text-transparent"
		>
			{placeholder}
		</label>
		{#if $$slots.icon}
			<div class="absolute right-1 bottom-1">
				<slot name="icon" />
			</div>
		{/if}
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
