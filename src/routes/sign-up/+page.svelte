<script>
	import LoginForm from "$lib/components/LoginForm.svelte";
	import { showToast, toastMessage, toastColor } from '$lib/sessionStore';
</script>

<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-contain bg-center bg-no-repeat bg-lemon-background-color bg-lemon-background">
	<div class="bg-white rounded-2xl p-10">
		<p class="text-4xl font-bold mb-5 text-center">Sign Up</p>
		<LoginForm title="signup" />
		<div class="flex justify-center">
			<p class="mt-5 text-center w-72 text-black hover:text-wb-orange"><a href="/">Already have an account? Login.</a></p>
		</div>
	</div>
</div>

{#if $showToast}
<div aria-hidden="true" class="h-screen fixed bottom-0 left-0 flex bg-black/50 place-items-end">
	<div class="fixed flex items-center p-4 m-4 w-full max-w-xs text-gray-500 bg-{$toastColor} rounded-lg border shadow dark:text-gray-400 dark:bg-gray-800">
		<!-- <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
			<span class="sr-only">Check icon</span>
		</div> -->
		<div class="ml-3 text-sm font-normal">{$toastMessage}</div>
		<button type="button" on:click={() => {showToast.set(false)}} class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
			<span class="sr-only">Close</span>
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		</button>
	</div>
</div>
{/if}

<!-- <div class="outer">
	<div class="middle">
		<div class="inner">
			<h1>Sign Up</h1>
			<div>
				<LoginForm title="signup" />
			</div>
			<p><a href="/login">Already have an account? Login.</a></p>
		</div>
	</div>
</div> -->



<!-- <style>
	h1, p {
		font-family: 'Roboto';
		text-align: center;
	}
	.outer {
		display: table;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.middle {
		display: table-cell;
		vertical-align: middle;
	}

	.inner {
		margin-left: auto;
		margin-right: auto;
		width: 400px;
		/* Whatever width you want */
	}
</style> -->