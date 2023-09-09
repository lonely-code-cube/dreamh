<script lang="ts">
	import Icon from '@iconify/svelte';

	export let content: string;
	const clen = content.split('').length;

	let expandable = clen >= 300;
	let expand = !expandable;
	let visibleContent: string;

	$: if (expand) {
		visibleContent = content;
	} else {
		visibleContent = content.slice(0, 300);
	}
</script>

{#if expandable}
	<div class="relative transition-transform">
		<div class:expand-mask={!expand}>
			<span>{visibleContent}</span>
			{#if expand}
				<button
					on:click={() => {
						expand = false;
					}}
					class="text-primary font-bold inline-flex items-center gap-1"
				>
					<span>less</span>
					<Icon class="text-xl" icon="icon-park-outline:up" />
				</button>
			{/if}
		</div>
		{#if !expand}
			<button
				on:click={() => {
					expand = true;
				}}
				class="font-bold text-primary absolute bottom-0 right-1/2 abs-xc flex gap-1 items-center"
			>
				<span>expand</span>
				<Icon class="text-xl" icon="icon-park-outline:down" />
			</button>
		{/if}
	</div>
{:else}
	<div>
		<span>{content}</span>
	</div>
{/if}

<style>
	.expand-mask {
		mask-image: linear-gradient(#000, transparent);
	}

	.abs-xc {
		transform: translate(50%, 0);
	}
</style>
