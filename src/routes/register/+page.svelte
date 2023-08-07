<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>Create a DreamH Account</title>
</svelte:head>

<div class="flex justify-center items-center h-screen">
	<div class="w-full md:w-96 lg:w-[500px] bg-base-200 p-5 shadow-lg shadow-base-300 mx-5">
		<h2 class="font-bold text-3xl">Register</h2>
		<form class="flex flex-col gap-2 mt-5">
			<input
				id="username"
				placeholder="Username"
				class="border-b border-neutral bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all duration-200 placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0"
				type="text"
			/>
			<input
				placeholder="Email"
				class="border-b border-neutral bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0"
				type="text"
			/><input
				placeholder="Passowrd"
				class="border-b border-neutral bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0"
				type="text"
			/>
			<input
				placeholder="Confirm Password"
				class="border-b border-neutral bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0"
				type="text"
			/>
			<button class="btn btn-primary mt-5" type="submit">Create Account</button>
		</form>
		<div class="mt-2 mb-5">
			Or just <a class="link link-primary" href="/login">login</a>
		</div>
	</div>
</div>
