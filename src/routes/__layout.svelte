<script>
	import app from './fb';
	import "../app.css";
	import { onMount } from 'svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('Welcome to WellBudz!');
				goto('/');
			} else {
				goto('/login');
			}
		});
	});
</script>

<slot />
