<script lang="ts">
	export let data: {
		username: string;
	};

	import { mutationStore, gql, getContextClient } from '@urql/svelte';
	import { goto } from '$app/navigation';

	let d1: HTMLInputElement;
	let d2: HTMLInputElement;
	let d3: HTMLInputElement;
	let d4: HTMLInputElement;
	let d5: HTMLInputElement;

	let result;
	let loading = false;
	let client = getContextClient();

	function verify() {
		let code = d1.value + d2.value + d3.value + d4.value + d5.value;

		result = mutationStore({
			client: client,
			query: gql`
				mutation ($username: String!, $code: String!) {
					verifyUser(username: $username, code: $code) {
						id
					}
				}
			`,
			variables: { username: data.username, code }
		});
		result.subscribe((res) => {
			if (res.fetching) {
				loading = true;
			} else if (res.error) {
				loading = false;
			} else if (res.data) {
				goto('/login');
			}
		});
	}
</script>

<div class="flex justify-center items-center h-[600px] md:h-[700px]">
	<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5 shadow-lg shadow-base-300 mx-5">
		<h2 class="font-bold text-3xl">Verify Email</h2>
		<form class="flex flex-col gap-2 mt-5">
			<div>Enter the 5 digit verification code sent to you via email</div>
			<div class="flex gap-3 justify-center my-5">
				<input
					bind:this={d1}
					on:input={(e) => {
						//@ts-ignore
						if (e.inputType !== 'deleteContentBackward') {
							d2.focus();
						}
					}}
					class="text-4xl bg-transparent border-b-2 border-base-content/70 outline-none outline-0 text-center w-[3.5rem]"
					maxLength="1"
					size="1"
					min="0"
					max="9"
				/>
				<input
					bind:this={d2}
					on:input={(e) => {
						//@ts-ignore
						if (e.inputType !== 'deleteContentBackward') {
							d3.focus();
						}
					}}
					class="text-4xl bg-transparent border-b-2 border-base-content/70 outline-none outline-0 text-center w-[3.5rem]"
					maxLength="1"
					size="1"
					min="0"
					max="9"
				/>
				<input
					bind:this={d3}
					on:input={(e) => {
						//@ts-ignore
						if (e.inputType !== 'deleteContentBackward') {
							d4.focus();
						}
					}}
					class="text-4xl bg-transparent border-b-2 border-base-content/70 outline-none outline-0 text-center w-[3.5rem]"
					maxLength="1"
					size="1"
					min="0"
					max="9"
				/>
				<input
					bind:this={d4}
					on:input={(e) => {
						//@ts-ignore
						if (e.inputType !== 'deleteContentBackward') {
							d5.focus();
						}
					}}
					class="text-4xl bg-transparent border-b-2 border-base-content/70 outline-none outline-0 text-center w-[3.5rem]"
					maxLength="1"
					size="1"
					min="0"
					max="9"
				/>
				<input
					bind:this={d5}
					on:input={(e) => {
						//@ts-ignore
						if (e.inputType !== 'deleteContentBackward') {
							verify();
						}
					}}
					class="text-4xl bg-transparent border-b-2 border-base-content/70 outline-none outline-0 text-center w-[3.5rem]"
					maxLength="1"
					size="1"
					min="0"
					max="9"
				/>
			</div>
			<button on:click={verify} class="btn btn-primary mt-5" type="submit"
				>Verify
				{#if loading}
					<div class="loading" />
				{/if}
			</button>
		</form>
		<div class="mt-2 mb-5">
			Expired? <a class="link link-primary" href="/register">register again</a>
		</div>
	</div>
</div>
