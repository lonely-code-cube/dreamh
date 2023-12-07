<script lang="ts">
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';
	import EmailInput from '$lib/components/ui/EmailInput.svelte';
	import { mutationStore, gql, getContextClient } from '@urql/svelte';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Writable } from 'svelte/store';
	import type { User } from 'api';

	let disabled = true;

	let email: string | null;
	let password: string | null;

	let email_error: string | null = null;
	let password_error: string | null = null;

	function onUpdate() {
		if (email && password) {
			disabled = false;
		} else {
			disabled = true;
		}
		if (email?.trim().length === 0) {
			email_error = 'This stuff is required';
		} else if (password?.trim().length === 0) {
			password_error = 'This stuff is required';
		}
	}

	let result;
	let loading = false;
	let client = getContextClient();
	let user: Writable<{
		isLoggedIn: boolean;
		user: User | null;
	}> = getContext('user');
	function login() {
		result = mutationStore({
			client: client,
			query: gql`
				mutation ($email: String!, $password: String!) {
					login(email: $email, password: $password) {
						id
						username
						displayName
						bio
						pfp {
							loc
						}
						banner {
							loc
						}
						createdAt
						admin
					}
				}
			`,
			variables: { email, password }
		});
		result.subscribe((res) => {
			if (res.fetching) {
				loading = true;
			} else if (res.error) {
				loading = false;
			} else if (res.data) {
				user.set({
					isLoggedIn: true,
					user: res.data.login
				});
				goto('/@me');
			}
		});
	}

	$: email, password, onUpdate();
</script>

<svelte:head>
	<title>Login to your DreamH account</title>
</svelte:head>

<div class="flex justify-center items-center h-[600px]">
	<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5 shadow-lg shadow-base-300 mx-5">
		<h2 class="font-bold text-3xl">Login</h2>
		<form class="flex flex-col mt-5">
			<EmailInput bind:error={email_error} bind:value={email} placeholder="Email" />
			<PasswordInput
				bind:error={password_error}
				bind:value={password}
				entropy={false}
				placeholder="Password"
			/>
			<button on:click={login} {disabled} class="btn btn-primary mt-5" type="submit"
				>Login
				{#if loading}
					<div class="loading" />
				{/if}
			</button>
		</form>
		<div class="mt-2 mb-5">
			Or just <a class="link link-primary" href="/register">register</a>
		</div>
	</div>
</div>
