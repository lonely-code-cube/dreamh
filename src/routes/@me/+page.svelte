<script lang="ts">
	import { goto } from '$app/navigation';
	import { cdn } from '$lib/api';
	import type { User } from 'api';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';
	import { getContextClient, gql, mutationStore, queryStore } from '@urql/svelte';
	import Icon from '@iconify/svelte';
	import { formatDate, timeAgo } from '$lib/utils';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import slug from 'slug';

	let user: Writable<{
		isLoggedIn: boolean;
		attemptedLogin: boolean;
		user: User | null;
	}> = getContext('user');
	let client = getContextClient();
	let tabIndex = 0;

	let loading = false;
	let meRes: any;
	meRes = queryStore({
		client,
		query: gql`
			query {
				me {
					ownedForumCount
					postCount
					commentCount
					stars
				}
			}
		`
	});
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
	let createForumModalOpen = false;
	let forumName: string | undefined;
	let forumSlug: string | undefined;

	$: if (banner) {
		if (
			banner[0].type === 'image/png' ||
			banner[0].type === 'image/jpeg' ||
			banner[0].type === 'image/gif'
		) {
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
										loc
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
							const bannerloc = res2.data.updateUserBasic.banner.loc;
							user.update(({ isLoggedIn, attemptedLogin, user }) => {
								if (user) {
									user.banner = {
										loc: bannerloc,
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

	let pfpInput: HTMLInputElement;
	let pfp: FileList | null;
	let settingPfp = false;

	$: if (forumName) {
		forumSlug = slug(forumName);
	}
	$: if (pfp) {
		if (
			pfp[0].type === 'image/png' ||
			pfp[0].type === 'image/jpeg' ||
			pfp[0].type === 'image/gif'
		) {
			const uploadResult = mutationStore({
				client,
				query: gql`
					mutation ($uploads: [Upload!]!) {
						upload(uploads: $uploads) {
							id
						}
					}
				`,
				variables: { uploads: [pfp[0]] }
			});
			uploadResult.subscribe((res) => {
				if (res.fetching) {
					settingPfp = true;
				} else if (res.error) {
					toast.push(res.error.message, { classes: ['error-toast'] });
					settingPfp = false;
				} else if (res.data) {
					const pfpId = res.data.upload[0].id;
					const updateResult = mutationStore({
						client,
						query: gql`
							mutation ($pfpId: String!) {
								updateUserBasic(changes: { pfp: $pfpId }) {
									pfp {
										loc
									}
								}
							}
						`,
						variables: { pfpId: pfpId }
					});
					updateResult.subscribe((res2) => {
						if (res2.error) {
							toast.push(res2.error.message, { classes: ['error-toast'] });
							settingPfp = false;
						} else if (res2.data) {
							const pfploc = res2.data.updateUserBasic.pfp.loc;
							user.update(({ isLoggedIn, attemptedLogin, user }) => {
								if (user) {
									user.pfp = {
										loc: pfploc,
										id: undefined
									};
								}
								return {
									isLoggedIn,
									attemptedLogin,
									user
								};
							});
							settingPfp = false;
							pfp = null;
						}
					});
				}
			});
		} else {
			toast.push(`Invalid file format: ${pfp[0].type}`, { classes: ['error-toast'] });
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
					accept="image/png, image/jpeg, image/gif"
					bind:files={banner}
					bind:this={bannerInput}
					class="hidden"
					type="file"
				/>
				<input
					accept="image/png, image/jpeg, image/gif"
					bind:files={pfp}
					bind:this={pfpInput}
					class="hidden"
					type="file"
				/>
				{#if $user.user?.banner?.loc}
					<div
						class="h-52 bg-center bg-cover bg-no-repeat"
						style="background-image: url('{cdn($user.user?.banner?.loc)}');"
					/>
					<button
						on:click={() => {
							bannerInput.click();
						}}
						class="absolute top-2 right-5 btn btn-circle bg-opacity-50 shadow"
					>
						<Icon class="text-2xl" icon="material-symbols:edit" />
					</button>
					<button
						on:click={() => {
							createForumModalOpen = true;
						}}
						class="absolute top-2 left-2 btn btn-sm bg-opacity-80"
						>Create Forum <Icon class="text-xl text-primary" icon="mdi:forum-plus" /></button
					>
					<Modal bind:open={createForumModalOpen}>
						<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5">
							<h2 class="font-bold text-3xl">Create a Forum</h2>
							<form class="flex flex-col gap-2 mt-5">
								<TextInput bind:value={forumName} placeholder="Display Name" />
								<TextInput bind:value={forumSlug} placeholder="URL identifier" />
								<button class="btn btn-primary mt-5" type="submit">Create Forum</button>
							</form>
						</div>
					</Modal>
					<button class="absolute top-12 left-2 btn btn-sm bg-opacity-80"
						>Accept Donations <Icon class="text-xl text-warning" icon="solar:dollar-bold" /></button
					>
				{:else}
					<div
						class="h-52 bg-center bg-cover bg-no-repeat bg-base-200 flex justify-center items-center"
					>
						<button
							on:click={() => {
								createForumModalOpen = true;
							}}
							class="absolute top-2 left-2 btn btn-sm bg-neutral text-neutral-content"
							>Create Forum <Icon class="text-xl text-primary" icon="mdi:forum-plus" /></button
						>
						<Modal bind:open={createForumModalOpen}>
							<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5">
								<h2 class="font-bold text-3xl">Create a Forum</h2>
								<form class="flex flex-col gap-2 mt-5">
									<TextInput bind:value={forumName} placeholder="Display Name" />
									<TextInput bind:value={forumSlug} placeholder="URL identifier" />
									<button class="btn btn-primary mt-5" type="submit">Create Forum</button>
								</form>
							</div>
						</Modal>
						<button class="absolute top-12 left-2 btn btn-sm bg-neutral text-neutral-content"
							>Accept Rewards <Icon class="text-xl text-warning" icon="solar:dollar-bold" /></button
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
				{#if $user.user?.pfp?.loc}
					<div class="absolute z-10 -bottom-20 left-5 md:left-10 avatar">
						<div class="w-24 rounded-full bg-base-100">
							<img alt="User pfp" src={cdn($user.user?.pfp?.loc)} />
						</div>
					</div>
				{:else}
					<div class="absolute z-10 -bottom-20 left-5 md:left-10">
						<div
							class="w-24 h-24 rounded-full bg-base-200 shadow-lg flex items-center justify-center"
						>
							{#if settingPfp}
								<div class="loading-lg" />
							{:else}
								<button
									on:click={() => {
										pfpInput.click();
									}}
									class="btn btn-circle"
								>
									<Icon class="text-3xl" icon="material-symbols:edit" />
								</button>
							{/if}
						</div>
					</div>
				{/if}
			</div>
			<div class="flex flex-wrap gap-5 mx-3 md:mx-5 my-5">
				<div>
					<div class="relative z-0 w-full md:w-[400px] lg:w-[600px] bg-base-200 rounded pb-5 px-3">
						<button
							on:click={() => {
								tabIndex = 3;
							}}
							class="absolute right-1 top-1 btn btn-circle btn-ghost"
						>
							<Icon class="text-2xl" icon="material-symbols:edit" />
						</button>
						<div class="ml-24 md:ml-28 text-2xl font-bold flex items-center gap-2">
							{$user.user?.displayName}
							{#if $user.user?.admin}
								<Icon class="text-success" icon="mdi:moderator" />
							{/if}
						</div>
						<div class="ml-24 md:ml-28">
							@{$user.user?.username} <span class="text-base-content/60">ID: {$user.user?.id}</span>
						</div>
						{#if $user.user?.bio}
							<div class="mt-2 no-break">{$user.user?.bio}</div>
						{/if}
						{#if $user.user?.createdAt}
							<div class="mt-3 p-2 bg-base-100 rounded">
								Joined {timeAgo($user.user?.createdAt)} ({formatDate($user.user?.createdAt)})
							</div>
						{/if}
					</div>
					<div
						class="relative z-0 w-full md:w-[400px] lg:w-[600px] bg-base-200 rounded mt-3 pb-5 p-3"
					>
						{#if $meRes.fetching}
							<div class="h-28 flex justify-center items-center">
								<div class="loading" />
							</div>
						{:else if $meRes.error}
							{$meRes.error}
						{:else}
							<div class="stats stats-vertical shadow w-full rounded">
								<div class="stat">
									<div class="stat-figure text-primary">
										<Icon class="text-5xl" icon="iconoir:post" />
									</div>
									<div class="stat-title">Posts</div>
									<div class="stat-value">{$meRes.data.me.postCount}</div>
									<div class="stat-desc">Check activity for recent posts</div>
								</div>
								<div class="stat">
									<div class="stat-figure text-warning">
										<Icon class="text-6xl" icon="solar:stars-bold-duotone" />
									</div>
									<div class="stat-title">Stars Received</div>
									<div class="stat-value">{$meRes.data.me.stars || 0}</div>
									<div class="stat-desc">Rank #0</div>
								</div>
								<div class="stat">
									<div class="stat-figure text-primary">
										<Icon class="text-5xl" icon="material-symbols:forum" />
									</div>
									<div class="stat-title">Comments</div>
									<div class="stat-value">{$meRes.data.me.commentCount}</div>
									<div class="stat-desc">Check activity for recent comments</div>
								</div>
								<div class="stat">
									<div class="stat-figure text-warning">
										<Icon class="text-5xl" icon="mdi:crown" />
									</div>
									<div class="stat-title">Owned Forums</div>
									<div class="stat-value">{$meRes.data.me.ownedForumCount}</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
				<div class="flex-grow min-h-[300px] bg-base-200 rounded">
					<Tabs bind:tabIndex>
						<div data-title="Activity" data-icon="tabler:activity">
							<div class="flex flex-col gap-2 h-full justify-center items-center">
								<button class="btn btn-primary">Load Activity</button>
								<div class="text-xm text-base-content/50">Doesnt support yet. Work in pogress.</div>
							</div>
						</div>
						<div data-title="Assets" data-icon="material-symbols:media-link-sharp" />
						<div data-title="Settings" data-icon="ion:settings" />
						<div data-title="Edit Profile" data-icon="material-symbols:edit">
							<div class="mx-3">
								<div>
									{#if $user.user?.pfp?.loc}
										<div
											class="mt-5 mx-auto w-32 h-32 rounded-full bg-base-200 shadow-lg flex items-center justify-center border border-primary bg-contain"
											style="background-image: url('{cdn($user.user.pfp.loc)}');"
										>
											{#if settingPfp}
												<div class="loading-lg" />
											{:else}
												<button
													on:click={() => {
														pfpInput.click();
													}}
													class="btn btn-circle w-full h-full opacity-80"
												>
													<Icon class="text-3xl" icon="material-symbols:edit" />
												</button>
											{/if}
										</div>
									{:else}
										<div
											class="mt-5 mx-auto w-24 h-24 rounded-full bg-base-200 shadow-lg flex items-center justify-center border border-primary"
										>
											{#if settingPfp}
												<div class="loading-lg" />
											{:else}
												<button
													on:click={() => {
														pfpInput.click();
													}}
													class="btn btn-circle"
												>
													<Icon class="text-3xl" icon="material-symbols:edit" />
												</button>
											{/if}
										</div>
									{/if}
								</div>
								<div class="mt-3 bg-base-100 rounded p-2">
									<TextInput placeholder="Change Nickname" />
								</div>
								<div class="mt-3 bg-base-100 rounded p-2">
									<TextInput placeholder="Change Username" />
								</div>
							</div>
						</div>
					</Tabs>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.no-break {
		white-space: pre-line;
	}
</style>
