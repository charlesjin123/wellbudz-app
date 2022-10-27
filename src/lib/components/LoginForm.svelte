<script>
	import { supabase } from '$lib/supabaseClient';
	import { user, showToast, toastMessage, toastColor } from '$lib/sessionStore';

	export let title;

	let loading = false;
	let email
	let password
	let passwordConfirm
	// let firstName
	// let lastName
	// let age

	const login = async () => {
		loading = true
		if (title == 'login') {
			// login
			try {
				
				const { error } = await supabase.auth.signIn({ email, password })
				if (error) throw error
			} catch (error) {
				showToast.set(true);
				toastMessage.set(error.error_description || error.message);
				toastColor.set("red-200");
				loading = false;
			}
		} else {
			// sign up
			if (password != passwordConfirm) {
				toastMessage.set("Password doesn't match!");
				toastColor.set("red-200");
				showToast.set(true);
				loading = false;
				return;
			}

			try {
				// loading = true

				let {user, error} = await supabase.auth.signUp({ email, password })
				if (error) throw error

				// userData.set({
				// 	id: user.id,
				// 	email: email,
				// 	first_name: firstName,
				// 	last_name: lastName,
				// 	age: age,
				// 	updated_at: new Date(),
				// });

				// const userData = {
				// 	id: user.id,
				// 	email: email,
				// 	first_name: firstName,
				// 	last_name: lastName,
				// 	age: age,
				// 	updated_at: new Date(),
				// }

				// const {data, error: error1} = await supabase.from('profiles').insert(userData, {returning: 'minimal'});
				// if (error1) throw error1

				showToast.set(true);
				toastMessage.set('Sign up successful! A confirmation email has been sent!');
				toastColor.set("green-200");
			} catch (error) {
				showToast.set(true);
				toastMessage.set(error.error_description || error.message);
				toastColor.set("red-200");
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
	<!-- {#if title != 'login'}
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
	{/if} -->
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

	<!-- <button type="submit" disabled={loading} class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button> -->
	<button type="submit" disabled={loading} class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">
		{#if loading}
		<div role="status" class="">
			<svg aria-hidden="true" class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-wb-blue" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
				<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
		{:else}
		Submit
		{/if}
	</button>
	
</form>
