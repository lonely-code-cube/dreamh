<script lang="ts">
	import Mention from '$lib/components/ui/Mention.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import Icon from '@iconify/svelte';
	import { queryStore, gql, getContextClient } from '@urql/svelte';
	import { timeAgo } from '$lib/utils';

	const forums = queryStore({
		client: getContextClient(),
		query: gql`
			query {
				getForums {
					total
					items {
						id
						name
						displayName
						icon {
							loc
						}
						postCount
						createdAt
						modifiedAt
						ownerId
					}
				}
			}
		`
	});
</script>

<div class="p-5">
	<div class="md:px-10 pb-10">
		<TextInput placeholder="Search Forums">
			<svelte:fragment slot="icon">
				<Icon class="text-xl" icon="fe:search" />
			</svelte:fragment>
		</TextInput>
	</div>
	{#if $forums.fetching}
		<div class="h-64 flex items-end justify-center">
			<div class="loading loading-lg" />
		</div>
	{:else if $forums.error}
		<div class="mt-52 text-center">
			<div>
				[<span class="font-bold text-error text-center">ERROR</span>] {$forums.error.message}
			</div>
		</div>
	{:else}
		<table class="table table-zebra w-full md:mx-10">
			<thead>
				<tr>
					<th>Forum</th>
					<th>Posts</th>
					<th>Created</th>
					<th>Owner</th>
				</tr>
			</thead>
			<tbody>
				{#each $forums.data.getForums.items as forum (forum.id)}
					<tr>
						<td>
							<a href="/f/{forum.name}">
								<span class="font-bold bg-base-300 px-1 rounded">#{forum.name}</span>
							</a>
						</td>
						<td>{forum.postCount}</td>
						<td>{timeAgo(forum.createdAt)}</td>
						<td>
							<Mention>@{forum.ownerId}</Mention>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
