<script lang="ts">
	import Icon from '@iconify/svelte';

	export let open = false;
</script>

<button
	on:click={() => {
		open = !open;
	}}
>
	<div class="dropdown dropdown-left dropdown-bottom">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="0" class="btn btn-ghost btn-circle">
			<Icon class="text-2xl" icon="mdi:theme-light-dark" />
		</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul tabindex="0" class="menu z-30 dropdown-content bg-base-200 w-56 rounded-box">
			<slot />
		</ul>
	</div>
</button>
