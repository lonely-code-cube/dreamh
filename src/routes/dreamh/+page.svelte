<script>
	import Icon from '@iconify/svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import Mention from '$lib/components/ui/Mention.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import Medias from '$lib/components/ui/Medias.svelte';

	let user = {
		username: 'midnight',
		pfp: 'https://media.dayoftheshirt.com/images/shirts/VWapE/teepublic_shiro-shinchan-pet-dog-crayon-shin-chan-teepublic_1611038324.large.png'
	};
	let medias = [
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fpox8m80zwzv61.jpg&f=1&nofb=1&ipt=f2f0e2d331c20c3ac7085ab695e3d64d61ee678ffe0e918764de63559c711049&ipo=images'
	];

	const pfps = [
		'https://cdn.discordapp.com/avatars/482139697796349953/7f9c16275537c1a2401e3063587f0be6.webp',
		'https://media.dayoftheshirt.com/images/shirts/VWapE/teepublic_shiro-shinchan-pet-dog-crayon-shin-chan-teepublic_1611038324.large.png',
		'https://cdn.discordapp.com/avatars/870635915461156917/081e4c67ed8dfab5a18e68b34715fa0d.webp',
		'https://cdn.discordapp.com/avatars/685082846993317953/0def9d1e0333ab43dbce60acdca01b4a.webp',
		'https://cdn.discordapp.com/avatars/716564765303898152/c04d3345f0da965c3105b15377bf4206.webp',
		'https://cdn.discordapp.com/avatars/733190599636680735/005513ac5012056393854df42c985775.webp'
	];
</script>

<div class="h-screen">
	<div>
		<div class="relative">
			<div
				class="h-52 bg-center bg-cover bg-no-repeat"
				style="background-image: url('https://wallpapercave.com/wp/wp2237101.jpg');"
			/>
			<div class="absolute -bottom-20 left-5 md:left-10 avatar">
				<div
					class="w-24 rounded-full ring-8 ring-base-100 bg-base-100 ring-offset-base-content ring-offset-2"
				>
					<img
						alt="Icon for the unicporn community"
						src="https://cdn.discordapp.com/icons/983948184030162964/a8eed1e5ac9dbedb1366a04ed4e1a9a5.webp"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="pt-2 mb-10">
		<div class="text-3xl font-bold ml-32 md:ml-40">Do Chem Or Die</div>
		<span class="ml-32 md:ml-40">#dreamh</span>
	</div>
	<div class="flex flex-col-reverse md:flex-row md:flex-nowrap gap-5 mx-3 md:mx-10">
		<div class="flex-1 md:basis-2/3">
			<div class="px-5 py-3 bg-base-200 flex gap-2 shadow-lg">
				<button class="btn btn-circle btn-neutral">
					<Icon class="text-2xl" icon="mi:attachment" />
				</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="flex-grow">
					<TextInput placeholder="Make a post">
						<button slot="icon" class="btn btn-circle btn-ghost translate-y-2">
							<Icon class="text-xl" icon="ion:send" />
						</button>
					</TextInput>
				</div>
			</div>
			<div class="mt-3 shadow-lg">
				<div class="bg-base-200 px-5 py-3">
					<h2 class="text-2xl font-bold">
						<Icon class="inline text-success" icon="solar:pin-bold" /> Organic Chem Tournament - Participate
						or get banned 🥺
					</h2>
					<div class="flex flex-wrap gap-1 items-center">
						<Tag name="announcement" />
						<Tag name="discussion" />
						<Tag name="chem" />
						<div class="flex-grow" />
						<div>1 hour ago</div>
					</div>
					<div class="border-t border-neutral mt-2 flex gap-2">
						<a class="inline-flex items-center gap-1" href="/"
							><Icon class="text-2xl" icon="material-symbols:comment" /> 156
							<span class="hidden md:block">comments</span></a
						>
						<a class="inline-flex items-center gap-1" href="/"
							><Icon class="text-2xl" icon="clarity:share-solid" />
							<span class="hidden md:block">share</span></a
						>
						<div class="flex-grow" />
						<button class="btn btn-circle"
							><Icon class="text-2xl" icon="pepicons-print:dots-y" /></button
						>
					</div>
				</div>
			</div>
			<div class="mt-3 shadow-lg">
				<div class="bg-base-200 px-5 py-3">
					<h2 class="text-2xl font-bold">Sus compound</h2>
					<div class="flex flex-wrap gap-1 items-center">
						<Tag name="chem" />
						<div class="flex-grow" />
						<div>8 hours ago</div>
					</div>
					<div class="my-2"><Medias {medias} /></div>
					<div class="border-t border-neutral mt-2 flex gap-2">
						<a class="inline-flex items-center gap-1" href="/"
							><Icon class="text-2xl" icon="material-symbols:comment" /> 12
							<span class="hidden md:block">comments</span></a
						>
						<a class="inline-flex items-center gap-1" href="/"
							><Icon class="text-2xl" icon="clarity:share-solid" />
							<span class="hidden md:block">share</span></a
						>
						<div class="flex-grow" />
						<button class="btn btn-circle"
							><Icon class="text-2xl" icon="pepicons-print:dots-y" /></button
						>
					</div>
				</div>
			</div>
			<div class="mt-3 shadow-lg">
				<div class="bg-base-200 px-5 py-3">
					<h2 class="text-2xl font-bold">Serious discussion on useless stuff</h2>
					<div class="flex flex-wrap gap-1 items-center">
						<Tag name="discussion" />
						<div class="flex-grow" />
						<div>9 hours ago</div>
					</div>
					<div class="my-2">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti quis adipisci, odit
						reprehenderit voluptate ea omnis, dolorum voluptatibus consequuntur modi praesentium rem
						aliquid debitis doloremque, hic excepturi et? Nobis, animi!
					</div>
					<div class="border-t border-neutral mt-2 flex gap-2">
						<a class="inline-flex items-center gap-1" href="/"
							><Icon class="text-2xl" icon="material-symbols:comment" /> 12
							<span class="hidden md:block">comments</span></a
						>
						<a class="inline-flex items-center gap-1" href="/"
							><Icon class="text-2xl" icon="clarity:share-solid" />
							<span class="hidden md:block">share</span></a
						>
						<div class="flex-grow" />
						<button class="btn btn-circle"
							><Icon class="text-2xl" icon="pepicons-print:dots-y" /></button
						>
					</div>
				</div>
			</div>
			<div class="h-10" />
		</div>
		<div class="flex-1 md:basis-1/3 h-min">
			<div class="stats stats-vertical w-full rounded-none bg-base-200 shadow-lg">
				<div class="stat">
					<div class="stat-title">Page Visits</div>
					<div class="stat-value">9.1M</div>
					<div class="stat-figure">
						<Icon class="text-5xl" icon="tabler:map-2" />
					</div>
					<div class="stat-desc">Since 27/4/21 (2 yars ago)</div>
				</div>
				<div class="stat">
					<div class="stat-title">Stars</div>
					<div class="stat-value">21.3K</div>
					<div class="stat-figure text-warning">
						<Icon class="text-5xl" icon="ic:baseline-star" />
					</div>
					<div class="stat-desc">
						On <span class="font-bold text-base-content">3.6K</span> posts
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Participants</div>
					<div class="stat-value">624</div>
					<div class="stat-desc">
						<div class="avatar-group -space-x-5">
							{#each pfps as pfp}
								<div class="avatar bg-base-100 w-12 h-12">
									<div class="">
										<img alt="participant pfp" src={pfp} />
									</div>
								</div>
							{/each}
							<div class="avatar w-12 h-12 placeholder">
								<div class="bg-neutral-focus text-neutral-content">
									<span>+618</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-base-200 mt-3 px-5 py-3 shadow-lg">
				<div class="font-bold text-lg underline mb-2">Description</div>
				<div>
					Lorem ipsum, dolor sit amet consectetur <Mention {user} /> elit. Voluptas non quos ad, nemo
					quod iure. Nobis aliquid sed maxime impedit dicta laborum enim dolorum magnam deleniti. Provident
					iusto numquam commodi?
				</div>
			</div>
		</div>
	</div>
</div>
