<script>
	export let searchOpen = false;

	import Modal from './ui/Modal.svelte';
	import TextInput from './ui/TextInput.svelte';
	import Icon from '@iconify/svelte';
	import SearchPreview from './SearchPreview.svelte';
</script>

<Modal bind:open={searchOpen}>
	<div class="w-[300px] md:w-[500px] min-h-[500px] max-h-[700px]">
		<TextInput placeholder="Search">
			<svelte:fragment slot="icon">
				<Icon class="text-xl mb-1" icon="fe:search" />
			</svelte:fragment>
		</TextInput>
		<div class="my-3">
			<SearchPreview
				thumbnail="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974707799/kaguya-sama-love-is-war-vol-11-9781974707799_hr.jpg"
				title="Kayuya Sama: Love Is War"
				url="/"
			/>
		</div>
	</div>
</Modal>
