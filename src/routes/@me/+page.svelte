<script lang="ts">
	import { goto } from '$app/navigation';
	import { cdn } from '$lib/api';
	import type { User } from 'api';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';
	import { getContextClient, gql, mutationStore } from '@urql/svelte';
	import Icon from '@iconify/svelte';

	let user: Writable<{
		isLoggedIn: boolean;
		attemptedLogin: boolean;
		user: User | null;
	}> = getContext('user');
	let client = getContextClient();

	let loading = false;
	onMount(() => {
		if (!$user.isLoggedIn) {
			if (!$user.attemptedLogin) {
				loading = true;
				user.subscribe((u) => {
					if (u.attemptedLogin && !u.isLoggedIn) {
						goto('/login');
					} else if (u.attemptedLogin) {
						loading = false;
					}
				});
			} else {
				goto('/login');
			}
		}
	});

	let bannerInput: HTMLInputElement;
	let banner: FileList | null;
	let settingBanner = false;

	$: if (banner) {
		if (banner[0].type === 'image/png' || banner[0].type === 'image/jpeg') {
			const uploadResult = mutationStore({
				client,
				query: gql`
					mutation ($uploads: [Upload!]!) {
						upload(uploads: $uploads) {
							id
						}
					}
				`,
				variables: { uploads: [banner[0]] }
			});
			uploadResult.subscribe((res) => {
				if (res.fetching) {
					settingBanner = true;
				} else if (res.error) {
					toast.push(res.error.message, { classes: ['error-toast'] });
					settingBanner = false;
				} else if (res.data) {
					const bannerId = res.data.upload[0].id;
					const updateResult = mutationStore({
						client,
						query: gql`
							mutation ($bannerId: String!) {
								updateUserBasic(changes: { banner: $bannerId }) {
									banner {
										absolutePath
									}
								}
							}
						`,
						variables: { bannerId: bannerId }
					});
					updateResult.subscribe((res2) => {
						if (res2.error) {
							toast.push(res2.error.message, { classes: ['error-toast'] });
							settingBanner = false;
						} else if (res2.data) {
							const bannerAbsolutePath = res2.data.updateUserBasic.banner.absolutePath;
							user.update(({ isLoggedIn, attemptedLogin, user }) => {
								if (user) {
									user.banner = {
										absolutePath: bannerAbsolutePath,
										id: undefined
									};
								}
								return {
									isLoggedIn,
									attemptedLogin,
									user
								};
							});
							settingBanner = false;
							banner = null;
						}
					});
				}
			});
		} else {
			toast.push(`Invalid file format: ${banner[0].type}`, { classes: ['error-toast'] });
		}
	}
</script>

<div>
	{#if loading}
		<div class="h-52 flex justify-center items-center gap-5 text-2xl">
			<div>Loading Profile</div>
			<div class="loading" />
		</div>
	{:else}
		<div>
			<div class="relative">
				<input
					accept="image/png, image/jpeg"
					bind:files={banner}
					bind:this={bannerInput}
					class="hidden"
					type="file"
				/>
				{#if $user.user?.banner?.absolutePath}
					<div
						class="h-52 bg-center bg-cover bg-no-repeat"
						style="background-image: url('{cdn($user.user?.banner?.absolutePath)}');"
					/>
					<button
						on:click={() => {
							bannerInput.click();
						}}
						class="absolute top-2 right-5 btn btn-circle shadow"
					>
						<Icon class="text-2xl" icon="material-symbols:edit" />
					</button>
				{:else}
					<div
						class="h-52 bg-center bg-cover bg-no-repeat bg-base-200 flex justify-center items-center"
					>
						{#if !settingBanner}
							<button
								on:click={() => {
									bannerInput.click();
								}}
								class="btn btn-primary">Set Banner</button
							>
						{:else}
							<progress class="progress progress-primary w-56" />
						{/if}
					</div>
				{/if}
				<div class="absolute -bottom-20 left-5 md:left-10 avatar">
					<div class="w-24 rounded-full bg-base-100">
						{#if $user.user?.pfp?.absolutePath}
							<img alt="User pfp" src={cdn($user.user?.pfp?.absolutePath)} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
