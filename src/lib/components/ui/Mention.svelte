<script lang="ts">
	export let user: {
		username: string;
		pfp: string;
	};
</script>

<button
	class="inline-flex items-center font-bold px-1 bg-secondary text-secondary-content rounded"
>
	<span class="mr-1">@{user.username}</span>
	<img class="w-6 rounded-full inline" alt="participant pfp" src={user.pfp} />
</button>
