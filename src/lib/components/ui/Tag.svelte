<script lang="ts">
	export let name: string;
</script>

{#if name === 'announcement'}
	<div class="badge badge-primary">{name}</div>
{:else}
	<div class="badge badge-neutral">{name}</div>
{/if}
