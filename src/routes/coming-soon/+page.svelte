<script>
	import { supabase } from '$lib/supabaseClient'
  	import { user } from '$lib/sessionStore'

	let loading;

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
</script>

<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-cover bg-no-repeat bg-cups-background">
	<div class="grid">
		<p class="text-4xl font-bold mb-5 text-center">WellBudz is coming soon!</p>
		<p class="justify-self-center text-center w-1/4">Thank you for registering an account with the email: <b>{$user.email}</b>. Our application is still under development and will be released by <u>October 15th, 2022</u>. Once it is released, you will be notified and be able to log in to the platform via the account you just created. Thank you for your patience!</p>
		<button on:click={signOut} disabled={loading} class="justify-self-center mt-5 w-20 text-white bg-black hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Logout</button>
	</div>
</div>

<!-- <div class="outer">
	<div class="middle">
		<div class="inner">
			<h1>Coming Soon!</h1>
			{#if user}
				<p>Thank you for registering an account with email: <b>{user.email}</b>. Our application is still under development and will be released by <u>October 1st, 2022</u>. Once it is released, you will be notified and be able to log in to the platform via the account you just created. Thank you for your patience!</p>
			{/if}
		</div>
	</div>
</div>

<style>
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
