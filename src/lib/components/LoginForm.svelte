<script>
	import { goto } from '$app/navigation';
	import {
		getAuth,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		connectAuthEmulator
	} from 'firebase/auth';
	
	// import Button, { Label } from '@smui/button';
	// import Textfield from '@smui/textfield';
  	// import Icon from '@smui/textfield/icon';
  	// import HelperText from '@smui/textfield/helper-text';

	export let title;

	const auth = getAuth();

	// TODO REMOVE EMULATOR
	// connectAuthEmulator(auth, 'http://localhost:9099');

	function login() {		
		const email = document.getElementById('emailInput').value;
		const password = document.getElementById('passInput').value;

		if (title == 'login') {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					localStorage.setItem('uid', user.uid);
					goto('/');
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					localStorage.setItem('uid', user.uid);
					goto('/');
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
</script>

<form id="loginForm" on:submit|preventDefault={login} class="grid">
	<div class="mb-6">
		<label for="emailInput" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
		<input type="email" id="emailInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	<div class="mb-6">
		<label for="passInput" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
		<input type="password" id="passInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
	</div>
	<button type="submit" class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>

	
	<!-- <label for="emailInput">Email Address</label>
	<input type="email" id="emailInput" placeholder="Email Address" />
	<br /> <br />
	<label for="passInput">Password</label>
	<input type="password" id="passInput" />
	<input type="submit" value="Submit" /> -->

	<!-- <div>
		<Textfield variant="outlined" bind:value={emailInputValue} label="Email" type="email"></Textfield>
	</div>
	<div>
		<Textfield variant="outlined" bind:value={passwordInputValue} label="Password" type="password"></Textfield>
	</div>
	<Button type="submit" variant="raised" color="orange">
		<Label>Submit</Label>
	</Button> -->
</form>
