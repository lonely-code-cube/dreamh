<script lang="ts">
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';
	import EmailInput from '$lib/components/ui/EmailInput.svelte';

	let disabled = true;
	let checking_username = false;

	let email: string | null;
	let username: string | null;
	let password: string | null;

	function onUpdate() {
		if (email && username && password) {
			disabled = false;
		} else {
			disabled = true;
		}
	}
	function onUsernameUpdate() {
		checking_username = false;
		setTimeout(() => {
			checking_username = false;
		}, 1000);
	}

	$: email, username, password, onUpdate();
	$: username, onUsernameUpdate();
</script>

<svelte:head>
	<title>Create a DreamH Account</title>
</svelte:head>

<div class="flex justify-center items-center h-screen">
	<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5 shadow-lg shadow-base-300 mx-5">
		<h2 class="font-bold text-3xl">Register</h2>
		<form class="flex flex-col gap-2 mt-5">
			<EmailInput bind:value={email} placeholder="Email" />
			<TextInput bind:value={username} placeholder="Username">
				<svelte:fragment slot="icon">
					{#if checking_username}
						<span class="loading" />
					{/if}
				</svelte:fragment>
			</TextInput>
			<PasswordInput bind:value={password} placeholder="Password" />
			<button {disabled} class="btn btn-primary mt-5" type="submit">Create Account</button>
		</form>
		<div class="mt-2 mb-5">
			Or just <a class="link link-primary" href="/login">login</a>
		</div>
	</div>
</div>
