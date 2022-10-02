<script>
	import { supabase } from '$lib/supabaseClient';

	export let title;

	let loading = false;
	let email
	let password

	const login = async () => {
		if (title == 'login') {
			try {
				loading = true
				const { error } = await supabase.auth.signIn({ email, password })
				if (error) throw error
			} catch (error) {
				alert(error.error_description || error.message)
			} finally {
				loading = false
			}
		} else {
			try {
				loading = true
				const { error } = await supabase.auth.signUp({ email, password })
				if (error) throw error
				alert('A confirmation email has been sent!');
			} catch (error) {
				alert(error.error_description || error.message)
			} finally {
				loading = false
			}
		}
	}

	// function login() {		
	// 	const email = document.getElementById('emailInput').value;
	// 	const password = document.getElementById('passInput').value;

	// 	if (title == 'login') {
	// 		signInWithEmailAndPassword(auth, email, password)
	// 			.then((userCredential) => {
	// 				const user = userCredential.user;
	// 				localStorage.setItem('uid', user.uid);
	// 				goto('/');
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 			});
	// 	} else {
	// 		createUserWithEmailAndPassword(auth, email, password)
	// 			.then((userCredential) => {
	// 				const user = userCredential.user;
	// 				localStorage.setItem('uid', user.uid);
	// 				goto('/');
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 			});
	// 	}
	// }
</script>

<form id="loginForm" on:submit|preventDefault={login} class="grid">
	<div class="mb-6">
		<label for="emailInput" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
		<input type="email" bind:value={email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	<div class="mb-6">
		<label for="passInput" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
		<input type="password" bind:value={password} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	<button type="submit" disabled={loading} class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
</form>
