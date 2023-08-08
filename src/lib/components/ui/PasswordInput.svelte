<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import zxcvbn from 'zxcvbn';

	export let value: string | null = null;
	export let placeholder: string | null = null;
	export let error: string | null = null;
	export let entropyBasis: string[] = [];

	let score: null | number = null;
	let show = false;
	$: type = show ? 'text' : 'password';

	function onInput(event: Event) {
		const password = (event.target as HTMLInputElement).value;
		if (password) {
			let entropy = zxcvbn(password, entropyBasis);
			score = entropy.score;
			value = password;
		} else {
			score = null;
		}
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
			class="pr-10 w-full border-b border-neutral bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all duration-200 placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0"
			{type}
		/>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<label tabindex="0" class="absolute right-1 bottom-1 text-xl swap swap-rotate">
			<input bind:checked={show} type="checkbox" />
			<div class="swap-on"><Icon icon="mdi:show" /></div>
			<div class="swap-off"><Icon icon="mdi:hide" /></div>
		</label>
	</div>
	{#if error}
		<label transition:slide={{ axis: 'y' }} for="input" class="text-error">{error}</label>
	{/if}
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
