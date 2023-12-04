<script lang="ts">
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';
	import EmailInput from '$lib/components/ui/EmailInput.svelte';
	import { mutationStore, gql, getContextClient } from '@urql/svelte';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Writable } from 'svelte/store';
	import type { User } from 'api';
	import { toast } from '@zerodevx/svelte-toast';

	let disabled = true;
	let checking_username = false;

	let email: string | null;
	let username: string | null;
	let password: string | null;

	let email_error: string | null = null;
	let username_error: string | null = null;
	let password_error: string | null = null;

	let result;
	let loading = false;
	let client = getContextClient();
	let user: Writable<{
		isLoggedIn: boolean;
		user: User | null;
	}> = getContext('user');

	function onUpdate() {
		if (email && username && password) {
			disabled = false;
		} else {
			disabled = false; // TODO: SHould  be true
		}
		if (email?.trim().length === 0) {
			email_error = 'This stuff is required';
		} else if (username?.trim().length === 0) {
			username_error = 'This stuff is required';
		} else if (password?.trim().length === 0) {
			password_error = 'This stuff is required';
		}
	}
	function onUsernameUpdate() {}

	function register() {
		result = mutationStore({
			client: client,
			query: gql`
				mutation ($username: String!, $password: String!) {
					createUser(username: $username, password: $password) {
						id
					}
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
			variables: { username, password }
		});
		result.subscribe((res) => {
			if (res.fetching) {
				loading = true;
			} else if (res.error) {
				toast.push(res.error.message, { classes: ['error-toast'] });
				loading = false;
			} else if (res.data) {
				user.set({
					isLoggedIn: true,
					user: res.data.login
				});
				goto('/@me');
			} else {
				toast.push('Some unknown error has occured', { classes: ['error-toast'] });
				loading = false;
			}
		});
	}

	$: email, username, password, onUpdate();
	$: username, onUsernameUpdate();
</script>

<svelte:head>
	<title>Create a DreamH Account</title>
</svelte:head>

<div class="flex justify-center items-center h-[600px]">
	<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5 shadow-lg shadow-base-300 mx-5">
		<h2 class="font-bold text-3xl">Register</h2>
		<form class="flex flex-col gap-2 mt-5">
			<EmailInput bind:error={email_error} bind:value={email} placeholder="Email" />
			<TextInput bind:error={username_error} bind:value={username} placeholder="Username">
				<svelte:fragment slot="icon">
					{#if checking_username}
						<span class="loading" />
					{/if}
				</svelte:fragment>
			</TextInput>
			<PasswordInput bind:error={password_error} bind:value={password} placeholder="Password" />
			<button on:click={register} {disabled} class="btn btn-primary mt-5" type="submit"
				>Create Account</button
			>
		</form>
		<div class="mt-2 mb-5">
			Or just <a class="link link-primary" href="/login">login</a>
		</div>
		<div class="mt-2 mb-5 text-xs text-base-content/70">
			By creating an account, you agree to our <a href="/terms" class="link">terms and conditions</a
			>.
		</div>
	</div>
</div>
