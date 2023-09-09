<script lang="ts">
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';
	import EmailInput from '$lib/components/ui/EmailInput.svelte';
	import { mutationStore, gql, getContextClient, Client } from '@urql/svelte';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Writable } from 'svelte/store';
	import type { User } from 'api';

	let disabled = true;

	let username: string | null;
	let password: string | null;

	let username_error: string | null = null;
	let password_error: string | null = null;

	function onUpdate() {
		if (username && password) {
			disabled = false;
		} else {
			disabled = true;
		}
		if (username?.trim().length === 0) {
			username_error = 'This stuff is required';
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
				mutation ($username: String!, $password: String!) {
					login(username: $username, password: $password) {
						id
						username
						displayName
						bio
						pfp {
							absolutePath
						}
						banner {
							absolutePath
						}
						createdAt
						admin
					}
				}
			`,
			variables: { username: username, password }
		});
		result.subscribe((res) => {
			if (res.fetching) {
				loading = true;
			} else if (res.error) {
				username_error = res.error.message;
				loading = false;
			} else if (res.data) {
				user.set({
					isLoggedIn: true,
					user: res.data.login
				});
				goto('/');
			} else {
				username_error = 'Some unknown error has occured';
				loading = false;
			}
		});
	}

	$: username, password, onUpdate();
</script>

<svelte:head>
	<title>Login to your DreamH account</title>
</svelte:head>

<div class="flex justify-center items-center h-[600px]">
	<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5 shadow-lg shadow-base-300 mx-5">
		<h2 class="font-bold text-3xl">Login</h2>
		<form class="flex flex-col gap-2 mt-5">
			<EmailInput bind:error={username_error} bind:value={username} placeholder="Username" />
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
