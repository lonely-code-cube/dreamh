<script lang="ts">
	import Icon from '@iconify/svelte';
	import zxcvbn from 'zxcvbn';

	export let value: string | null = null;
	export let placeholder: string | null = null;
	export let error: string | null = null;
	export let entropyBasis: string[] = [];
	export let entropy = true;

	let score: null | number = null;
	let show = false;
	$: type = show ? 'text' : 'password';

	function onInput(event: Event) {
		const password = (event.target as HTMLInputElement).value;
		if (password) {
			let entropy = zxcvbn(password, entropyBasis);
			score = entropy.score;
		} else {
			score = null;
		}
		error = null;
		value = password;
	}
</script>

<div>
	<div class="relative">
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
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<label tabindex="0" class="absolute right-1 bottom-1 text-xl swap swap-rotate">
			<input bind:checked={show} type="checkbox" />
			<div class="swap-on"><Icon icon="mdi:show" /></div>
			<div class="swap-off"><Icon icon="mdi:hide" /></div>
		</label>
	</div>
	{#if error}
		<label for="input" class="text-error">{error}</label>
	{/if}
	{#if entropy}
		{#if score != null}
			<progress
				class:e0={score == 0}
				class:e1={score == 1}
				class:e2={score == 2}
				class:e3={score == 3}
				class:e4={score == 4}
				class="w-full progress progress-error transition"
				value={score * 25}
				max="100"
			/>
		{/if}
	{/if}
</div>

<style>
	.error {
		@apply border-error;
	}
	.e0 {
		@apply progress-error;
	}
	.e1 {
		@apply progress-error;
	}
	.e2 {
		@apply progress-warning;
	}
	.e3 {
		@apply progress-success;
	}
	.e4 {
		@apply progress-success;
	}
</style>
