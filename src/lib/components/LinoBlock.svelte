<script lang="ts">
	import { lexer, linoParse } from '$lib/leno/lexer';
	export let text: string;
	lexer.reset(text);
	let rendered = linoParse(lexer);
</script>

<div class="lino text-left pre-line">
	{@html rendered}
</div>

<style lang="postcss">
	.pre-line {
		white-space: pre-line;
	}

	:global(.lino .__lino_h1) {
		@apply text-4xl md:text-5xl;
	}

	:global(.lino .__lino_h2) {
		@apply text-3xl;
	}

	:global(.lino .__lino_bold) {
		@apply font-bold;
	}

	:global(.lino .__lino_underline) {
		@apply underline;
	}

	:global(.lino .__lino_italics) {
		@apply italic;
	}

	:global(.lino .__lino_bullet)::before {
		content: '• ';
	}

	:global(.lino .__lino_spoiler) {
		@apply bg-base-300 rounded px-1;
		color: transparent;
		user-select: none;
	}

	:global(.lino .__lino_spoiler):hover {
		@apply bg-base-300/50;
		color: inherit;
	}

	:global(.lino .a) {
		background: linear-gradient(
			-45deg,
			theme(colors.primary),
			theme(colors.primary),
			theme(colors.accent),
			theme(colors.accent)
		);
		background-size: 300%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: animated_text 2s ease-in-out infinite;
		-moz-animation: animated_text 2s ease-in-out infinite;
		-webkit-animation: animated_text 2s ease-in-out infinite;
	}

	@keyframes animated_text {
		0% {
			background-position: 0px 50%;
		}
		25% {
			background-position: 50% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		25% {
			background-position: -50% 50%;
		}
		100% {
			background-position: 0px 50%;
		}
	}
</style>
