<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { themeChange } from 'theme-change';
	import { page, navigating } from '$app/stores';

	import { Client, setContextClient, cacheExchange, fetchExchange } from '@urql/svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import EntityPreview from '$lib/components/EntityPreview.svelte';
	const client = new Client({
		url: 'http://localhost:8000/gql',
		exchanges: [cacheExchange, fetchExchange]
	});
	setContextClient(client);

	onMount(() => {
		themeChange(false);
	});

	let currentPage: string = '/';
	$: currentPage = $page.url.pathname;
	let menuState: boolean;
	let searchOpen = false;
</script>

<div class="drawer lg:drawer-open">
	<input bind:checked={menuState} id="sidebar" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label
			tabindex="0"
			class="fixed z-50 left-2 top-2 ml-3 btn btn-ghost btn-circle drawer-button lg:hidden"
			for="sidebar"
		>
			<Icon class="text-2xl" icon="ic:round-menu" />
		</label>
		<nav class="z-30 sticky top-0 navbar bg-base-100 bg-opacity-50 backdrop-blur-md shadow-lg">
			<div class="navbar-start" />
			<div class="navbar-end">
				<div class="dropdown dropdown-left dropdown-bottom">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle">
						<Icon class="text-2xl" icon="mdi:theme-light-dark" />
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul tabindex="0" class="menu z-30 dropdown-content bg-base-200 w-56 rounded-box">
						<li>
							<button data-set-theme="dracula" data-act-class="active">
								<Icon class="text-2xl" icon="akar-icons:moon-fill" />
								Dracula
							</button>
						</li>
						<li>
							<button data-set-theme="cupcake" data-act-class="active">
								<Icon class="text-2xl" icon="ph:sun-fill" />
								Cupcake
							</button>
						</li>
						<li>
							<button data-set-theme="halloween" data-act-class="active">
								<Icon class="text-2xl" icon="akar-icons:moon-fill" />
								Halloween
							</button>
						</li>
						<li>
							<button data-set-theme="pastel" data-act-class="active">
								<Icon class="text-2xl" icon="ph:sun-fill" />
								Pastel
							</button>
						</li>
						<li>
							<button data-set-theme="night" data-act-class="active">
								<Icon class="text-2xl" icon="akar-icons:moon-fill" />
								Night
							</button>
						</li>
						<li>
							<button data-set-theme="valentine" data-act-class="active">
								<Icon class="text-2xl" icon="solar:cat-bold" />
								Valentine
							</button>
						</li>
					</ul>
				</div>
				<button on:click={() => (searchOpen = true)} class="btn btn-ghost btn-circle">
					<Icon class="text-2xl" icon="icon-park-outline:search" />
				</button>
				<Modal bind:open={searchOpen}>
					<div class="md:w-[600px] min-h-[300px] max-h-[700px]">
						<TextInput placeholder="Search">
							<svelte:fragment slot="icon">
								<Icon class="text-2xl" icon="fe:search" />
							</svelte:fragment>
						</TextInput>
						<div class="my-3">
							<EntityPreview thumbnail="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974707799/kaguya-sama-love-is-war-vol-11-9781974707799_hr.jpg" title="Kayuya Sama: Love Is War" url="/" />
						</div>
					</div>
				</Modal>
				<button class="btn btn-ghost btn-circle">
					<a href="/" class="avatar">
						<div class="w-10 rounded-full">
							<img
								src="https://media.dayoftheshirt.com/images/shirts/VWapE/teepublic_shiro-shinchan-pet-dog-crayon-shin-chan-teepublic_1611038324.large.png"
								alt="pfp"
							/>
						</div>
					</a>
				</button>
			</div>
		</nav>
		<!-- page content  -->
		{#if $navigating}
			<div class="h-screen flex items-center justify-center">
				<div class="loading loading-lg" />
			</div>
		{:else}
			<slot />
		{/if}
	</div>
	<div class="drawer-side z-40">
		<label for="sidebar" class="drawer-overlay" />
		<ul class="menu inline-block p-4 w-80 h-full bg-base-200 text-base-content overflow-scroll">
			<div class="lg:hidden ml-16 text-2xl h-[6vh] font-bold">
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
