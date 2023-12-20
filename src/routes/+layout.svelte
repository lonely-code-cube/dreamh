<script lang="ts">
	import '../app.css';

	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import Icon from '@iconify/svelte';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { page, navigating } from '$app/stores';
	import { cdn } from '$lib/api';
	import {
		Client,
		setContextClient,
		cacheExchange,
		fetchExchange,
		errorExchange,
		queryStore,
		gql
	} from '@urql/svelte';
	import { themes, modes, themeBtn } from '$lib/theming';
	import type { User } from 'api';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import { PUBLIC_RTWALK_URL } from '$env/static/public';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import { slide } from 'svelte/transition';

	let user: Writable<{
		isLoggedIn: boolean;
		attemptedLogin: boolean;
		user: User | null;
	}> = writable({
		isLoggedIn: false,
		attemptedLogin: false,
		user: null
	});
	setContext('user', user);

	function toastError(msg: string) {
		toast.push(msg, { classes: ['error-toast'] });
	}

	const client = new Client({
		url: PUBLIC_RTWALK_URL + '/api/v1',
		fetchOptions: {
			credentials: 'include'
		},
		exchanges: [
			cacheExchange,
			errorExchange({
				onError(error) {
					error.graphQLErrors.forEach((e) => {
						if (e.extensions?.tp) {
							switch (e.extensions.tp) {
								case 'UNAUTHENTICATED_REQUEST':
									break;
								default:
									toastError(e.message);
							}
						} else {
							toastError(e.message);
						}
					});
				}
			}),
			fetchExchange
		]
	});
	const anilistClient = new Client({
		url: 'https://graphql.anilist.co',
		exchanges: [cacheExchange, fetchExchange]
	});

	setContextClient(client);
	setContext('anilist', anilistClient);

	onMount(() => {
		themeBtn();
		const identity = queryStore({
			client,
			query: gql`
				query {
					me {
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
			`
		});

		identity.subscribe((res) => {
			if (res.data) {
				user.set({
					isLoggedIn: true,
					attemptedLogin: true,
					user: res.data.me
				});
			} else if (res.error) {
				user.set({
					isLoggedIn: false,
					attemptedLogin: true,
					user: null
				});
			}
		});
	});

	let currentPage: string = '/';
	$: currentPage = $page.url.pathname;
	let menuState: boolean;
	let searchOpen = false;
</script>

<SvelteToast />
<div class="drawer lg:drawer-open">
	<input bind:checked={menuState} id="sidebar" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label
			tabindex="0"
			class="fixed z-50 top-1 ml-2 btn btn-ghost btn-circle drawer-button lg:hidden"
			for="sidebar"
		>
			<Icon class="text-2xl" icon="ic:round-menu" />
		</label>
		{#if searchOpen}
			<nav
				transition:slide
				class="z-40 absolute flex justify-center top-0 navbar bg-opacity-50 backdrop-blur-md min-h-0 h-14 shadow-lg"
			>
				<div class="ml-12 pb-5 w-full md:w-[50%]">
					<TextInput placeholder="Search">
						<svelte:fragment slot="icon">
							<Icon class="text-xl mb-1" icon="fe:search" />
						</svelte:fragment>
					</TextInput>
				</div>
			</nav>
		{/if}
		<nav class="z-30 sticky top-0 navbar bg-opacity-50 backdrop-blur-md min-h-0 h-14 shadow-lg">
			<div class="navbar-start" />
			<div class="navbar-end">
				<button on:click={() => (searchOpen = true)} class="btn btn-ghost btn-circle">
					<Icon class="text-2xl" icon="icon-park-outline:search" />
				</button>
				<!-- <SearchModal bind:searchOpen /> -->
				<div class="dropdown dropdown-left dropdown-bottom">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle">
						<Icon class="text-2xl" icon="mdi:theme-light-dark" />
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul tabindex="0" class="menu z-30 dropdown-content bg-base-200 w-56 rounded-box">
						{#each themes as theme}
							<li>
								<button
									data-set-theme-mode={modes[theme]}
									data-set-theme={theme}
									data-act-class="active"
								>
									{#if modes[theme] === 'dark'}
										<Icon class="text-2xl" icon="akar-icons:moon-fill" />
									{:else}
										<Icon class="text-2xl" icon="akar-icons:sun-fill" />
									{/if}
									{theme.charAt(0).toUpperCase() + theme.slice(1)}
								</button>
							</li>
						{/each}
					</ul>
				</div>
				{#if $user.isLoggedIn}
					<div class="btn btn-ghost btn-circle">
						<a href="/@me" class="avatar">
							<div class="w-10 rounded-full">
								{#if $user.user?.pfp?.loc}
									<img src={cdn($user.user?.pfp?.loc)} alt="user pfp" />
								{:else}
									<img
										class="light-invert"
										src="/dreamh_art.png"
										alt="The default pfp (structure of benzene)"
									/>
								{/if}
							</div>
						</a>
					</div>
				{:else}
					<a href="/@me" class="btn btn-ghost btn-circle">
						<Icon class="text-2xl" icon="material-symbols:person" />
					</a>
				{/if}
			</div>
		</nav>
		<!-- page content  -->
		{#if $navigating}
			<div class="h-64 flex items-end justify-center">
				<div class="loading loading-lg text-primary" />
			</div>
		{:else}
			<slot />
		{/if}
	</div>
	<div class="drawer-side z-40">
		<label for="sidebar" class="drawer-overlay" />
		<ul class="menu inline-block w-[18rem] h-full bg-base-200 text-base-content overflow-scroll">
			<div class="ml-14 mt-0.5 lg:ml-4 text-2xl h-[4vh] lg:h-[4vh] font-bold">
				DreamH <span class="text-sm font-thin">V2.0.0</span>
			</div>
			<li>
				<h2 class="menu-title">Navigation</h2>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<ul
					on:click={() => {
						menuState = false;
					}}
				>
					<li>
						<a href="/" class:active={currentPage === '/'}>
							<Icon class="text-2xl" icon="heroicons:home-solid" />
							Home
						</a>
					</li>
					<li>
						<a href="/forums" class:active={currentPage.startsWith('/forums')}>
							<Icon class="text-2xl" icon="clarity:list-line" />
							Forums
						</a>
					</li>
					<li>
						<a href="/search" class:active={currentPage.startsWith('/search')}>
							<Icon class="text-2xl" icon="fluent:box-search-24-filled" />
							Advanced Search
						</a>
					</li>
					<li>
						<a href="/player" class:active={currentPage.startsWith('/player')}>
							<Icon class="text-2xl" icon="icon-park-solid:play" />
							<span>D<sub>2</sub>O<sub>5</sub> Player </span></a
						>
					</li>
					<li>
						<a href="/reader" class:active={currentPage.startsWith('/reader')}>
							<Icon class="text-2xl" icon="mdi:read-more" />
							<span>D<sub>2</sub>O<sub>5</sub> Reader </span></a
						>
					</li>
					<li>
						<a href="/index" class:active={currentPage.startsWith('/index')}>
							<Icon class="text-2xl" icon="raphael:db" />
							Index & Media
						</a>
					</li>
					<li>
						<a href="/stats" class:active={currentPage.startsWith('/stats')}>
							<Icon class="text-2xl" icon="nimbus:stats" />
							Stats
						</a>
					</li>
				</ul>
			</li>
			{#if !$user.isLoggedIn}
				<li>
					<h2 class="menu-title">Account</h2>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<ul
						on:click={() => {
							menuState = false;
						}}
					>
						<li>
							<a href="/register" class:active={currentPage.startsWith('/register')}>
								<Icon class="text-2xl" icon="mdi:register" />
								Register
							</a>
						</li>
						<li>
							<a href="/login" class:active={currentPage.startsWith('/login')}>
								<Icon class="text-2xl" icon="solar:login-2-bold" />
								Login
							</a>
						</li>
					</ul>
				</li>
			{/if}
			{#if $user.isLoggedIn}
				<li>
					<h2 class="menu-title">Account</h2>
					<button id="logout-btn" class="btn btn-error pt-3 mx-3 uppercase"
						>Logout <Icon class="text-xl" icon="tabler:logout" /></button
					>
				</li>
			{/if}
			<li>
				<h2 class="menu-title">About DreamH</h2>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<ul
					on:click={() => {
						menuState = false;
					}}
				>
					<li>
						<a href="/guide" class:active={currentPage.startsWith('/guide')}>
							<Icon class="text-2xl" icon="ph:question-fill" />
							Guide
						</a>
					</li>
					<li>
						<a href="/">
							<Icon class="text-2xl" icon="mdi:github" />
							Github
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</div>

<style lang="postcss">
	:global(.error-toast) {
		--toastWidth: auto;
		--toastBackground: oklch(var(--b3));
		--toastBarBackground: oklch(var(--er));
	}

	:global(.warning-toast) {
		--toastWidth: auto;
		--toastBackground: oklch(var(--b3));
		--toastBarBackground: oklch(var(--wa));
	}

	:global(.success-toast) {
		--toastWidth: auto;
		--toastBackground: oklch(var(--b3));
		--toastBarBackground: oklch(var(--su));
	}

	#logout-btn:hover {
		--tw-text-opacity: 1;
		color: var(--fallback-erc, oklch(var(--erc) / var(--tw-text-opacity)));
		background-color: color-mix(in oklab, var(--fallback-er, oklch(var(--er) / 1)) 90%, black);
		border-color: color-mix(in oklab, var(--fallback-er, oklch(var(--er) / 1)) 90%, black);
	}
</style>
