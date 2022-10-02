<script>
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	
	import { goto } from '$app/navigation';

	import LoginForm from '$lib/components/LoginForm.svelte';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((event, session) => {
		console.log("Auth state changed");
		if (event == 'PASSWORD_RECOVERY') {
			console.log("recovering password");
			goto("/reset-password");
		} else if (event == 'SIGNED_IN') {
			console.log("user signed in");
			user.set(session.user);
			goto("/coming-soon");
		} else if (event == 'SIGNED_OUT') {
			console.log("user signed out");
			goto("/");
		}
	});

</script>

<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-contain bg-center bg-no-repeat bg-lemon-background-color bg-lemon-background z-0">
	<div class="bg-white rounded-2xl p-10">
		<p class="text-4xl font-bold mb-5 text-center">Login</p>
		<LoginForm title="login" />
		<p class="mt-5 text-center w-72 text-black hover:text-wb-orange text-sm"><a href="/password-recovery">Forgot Password?</a></p>
		<p class="mt-4 text-center w-72 text-black hover:text-wb-orange"><a href="/sign-up">New? Click here to create an account.</a></p>
	</div>
</div>