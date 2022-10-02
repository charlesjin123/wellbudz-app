<script>
	import { supabase } from '$lib/supabaseClient';

	export let title;

	let loading = false;
	let email
	let password
	let passwordConfirm
	let firstName
	let lastName
	let age

	const login = async () => {
		if (title == 'login') {
			// login
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
			// sign up
			if (password != passwordConfirm) {
				alert("Password doesn't match!");
				return;
			}

			try {
				loading = true

				let {user, error} = await supabase.auth.signUp({ email, password })
				if (error) throw error

				const userData = {
					id: user.id,
					email: email,
					first_name: firstName,
					last_name: lastName,
					age: age,
					updated_at: new Date(),
				}

				const {data, error: error1} = await supabase.from('profiles').insert(userData, {returning: 'minimal'});
				if (error1) throw error1

				alert('Sign up successful! A confirmation email has been sent!');
			} catch (error) {
				alert(error.error_description || error.message)
			} finally {
				loading = false
			}
		}
	}
</script>

<form id="loginForm" on:submit|preventDefault={login} class="grid">
	<div class="mb-6">
		<label for="emailInput" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
		<input type="email" id="emailInput" bind:value={email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	{#if title != 'login'}
	<div class="grid grid-cols-2 gap-6">
		<div class="mb-6">
			<label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
			<input type="text" id="firstName" bind:value={firstName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
		</div>
		<div class="mb-6">
			<label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
			<input type="text" id="lastName" bind:value={lastName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
		</div>
	</div>
	<div class="mb-6">
		<label for="age" class="block mb-2 text-sm font-medium text-gray-900">Age</label>
		<input type="number" id="age" bind:value={age} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	{/if}
	<div class="mb-6">
		<label for="passInput" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
		<input type="password" id="passInput" bind:value={password} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	{#if title != 'login'}
	<div class="mb-6">
		<label for="passConfirmInput" class="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
		<input type="password" id="passConfirmInput" bind:value={passwordConfirm} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	{/if}

	<button type="submit" disabled={loading} class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
</form>
