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
				forums(
					criteria: { search: "*" }
					filter: { page: { order: ASC, nextFrom: 1, limit: 20 } }
				) {
					forum {
						id
						name
						displayName
						description
						createdAt
						ownerId
					}
					postCount
					postParticipantCount
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
		<table class="table table-zebra w-full">
			<thead>
				<tr>
					<th>ID</th>
					<th>Forum</th>
					<th>Posts</th>
					<th>Created</th>
					<th>Owner</th>
				</tr>
			</thead>
			<tbody>
				{#each $forums.data.forums as forum (forum.forum.id)}
					<tr>
						<td>{forum.forum.id}</td>
						<td>
							<a href="/f/{forum.forum.name}">
								<span><Mention bg="neutral">#{forum.forum.name}</Mention></span>
								<span>({forum.forum.displayName})</span>
							</a>
						</td>
						<td>{forum.postCount}</td>
						<td>{timeAgo(forum.forum.createdAt)}</td>
						<td
							>{#if false}
								<Mention>@{forum.forum.ownerId}</Mention>
							{:else}
								<div class="loading" />
							{/if}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
