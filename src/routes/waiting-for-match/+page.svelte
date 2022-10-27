<script>
	import { supabase } from '$lib/supabaseClient'
  	import { user } from '$lib/sessionStore'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let loading;

	let loadingPage = true;

	async function checkAuth() {
		if (!$user) {
			goto("/");
		}
	}

	async function signOut() {
		try {
			loading = true
			let { error } = await supabase.auth.signOut()
			if (error) throw error
		} catch (error) {
			alert(error.message)
		} finally {
			loading = false
		}
  	}

	onMount(async () => {

		loadingPage = true;

		await checkAuth();

		loadingPage = false;

	})
</script>

{#if !loadingPage}
<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-cover bg-no-repeat bg-cups-background">
	<div class="grid">
		<p class="text-4xl font-bold mb-5 text-center">Waiting for match...</p>
		<p class="justify-self-center text-center w-1/4">Thank you for registering an account with the email: <b>{$user.email}</b>. Once we find a match for you, you will be notified via this email. Then, you can login again to access the platform meet your partner!</p>
		<button on:click={signOut} disabled={loading} class="justify-self-center mt-5 w-20 text-white bg-black hover:bg-wb-blue font-medium rounded-lg text-sm py-2.5 text-center">Logout</button>
	</div>
</div>
{/if}