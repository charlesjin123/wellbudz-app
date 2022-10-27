<script>

	import { userProfile } from '$lib/sessionStore.js';
    import { supabase } from '$lib/supabaseClient';
  	import { user } from '$lib/sessionStore'

	let logOutLoading;

    let bio;
    let goalsList;

    let bioLoading;
    let goalsListLoading;
    
    bio = $userProfile.bio;
    goalsList = $userProfile.goals_list;

    let reportModalOpen = false;

	let showToast = false;
	let toastMessage;
	let toastColor;
	let toastIcon;

	function showAlert(msg, color) {
		showToast = true;
		toastMessage = msg;
		toastColor = color;
	}

	function closeAlert() {
		showToast = false;
	}

    function showReportModal() {
        reportModalOpen = !reportModalOpen;
    }

    async function updateBio() {
        try {
            bioLoading = true
			const updateData = {
				bio: bio
			};

            const { data, error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', $userProfile.id);
			if (error) throw error;

            showAlert("Bio saved successfully!", "green-200");
		} catch (error) {
			showAlert(error.error_description || error.message, "red-200");
		} finally {
			bioLoading = false;
		}
    }

    async function updateGoalsList() {
        try {
            goalsListLoading = true
			const updateData = {
				goals_list: goalsList
			};

			const { data, error } = await supabase
				.from('profiles')
				.update(updateData)
                .eq('id', $userProfile.id);
			if (error) throw error;

            showAlert("Goals list saved successfully!", "green-200");
		} catch (error) {
			showAlert(error.error_description || error.message, "red-200");
		} finally {
			goalsListLoading = false;
		}
    }

    async function logOut() {
        try {
			logOutLoading = true
			let { error } = await supabase.auth.signOut()
			if (error) throw error
		} catch (error) {
			showAlert(error.message, "red-200")
		} finally {
			logOutLoading = false
		}
    }

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let loadingPage = true;
	let leavingPage = false;

	async function checkAuth() {
		if (!$user) {
			leavingPage = true;
			goto("/");
		}
	}

	onMount(async () => {

		loadingPage = true;

		await checkAuth();

		loadingPage = false;
	})

</script>

<!-- <div class="flex justify-center text-3xl font-bold mt-10">
	Your Profile
</div> -->

{#if loadingPage || leavingPage}
<div class="grid h-screen">
	<div role="status" class="place-self-center">
		<svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-wb-blue" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
			<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
		</svg>
		<span class="sr-only">Loading...</span>
	</div>
</div>
{:else}
<div class="grid grid-cols-1 my-10 mx-48 gap-5">
    <div class="flex place-content-between">
        <div class="text-5xl font-extrabold">{$userProfile.first_name + " " + $userProfile.last_name}</div>
        <button type="button" on:click={showReportModal} class="text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5">Report a Problem</button>
    </div>
    <div class="grid gap-2">
        <div class="text-xl font-bold">Your Bio</div>
        <textarea id="bio" bind:value={bio} rows="4" placeholder="Add something about yourself!" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-wb-orange focus:border-wb-orange"></textarea>
        <button on:click={updateBio} disabled={bioLoading} type="button" class="text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2 w-36">Save Bio</button>
    </div>
    <div class="grid gap-2">
        <div class="text-xl font-bold">Goals List</div>
        <textarea id="goals-list" bind:value={goalsList} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-wb-orange focus:border-wb-orange"></textarea>
        <button on:click={updateGoalsList} disabled={goalsListLoading} type="button" class="text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2 w-36">Save Goals List</button>
    </div>
    <div class="flex place-content-end mt-10">
        <button on:click={logOut} disabled={logOutLoading} type="button" class="text-white bg-red-600 hover:bg-red-400 font-medium rounded-lg text-sm px-5 py-2">Log out</button>
    </div>
</div>
{/if}


{#if showToast}
<div aria-hidden="true" class="h-screen fixed bottom-0 left-0 flex bg-black/50 place-items-end">
	<div class="fixed flex items-center p-4 m-4 w-full max-w-xs text-gray-500 bg-{toastColor} rounded-lg border shadow dark:text-gray-400 dark:bg-gray-800">
		<!-- <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
			<span class="sr-only">Check icon</span>
		</div> -->
		<div class="ml-3 text-sm font-normal">{toastMessage}</div>
		<button type="button" on:click={closeAlert} class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
			<span class="sr-only">Close</span>
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		</button>
	</div>
</div>
{/if}

{#if reportModalOpen}

<div aria-hidden="true" class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50">
	<div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto my-auto">
		<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
			<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
				<h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
					Report a Problem
				</h3>
				<button type="button" on:click={showReportModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="addGoalModal">
					<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<div class="py-4 px-4">
				<form class="space-y-4" action="https://formspree.io/f/mrgdkrbw" method="POST">
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
						<input type="email" name="email" id="email-box" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
					</div>
					<div>
						<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message:</label>
						<textarea id="message" name="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
					</div>
					<button type="submit" class="w-full text-white bg-wb-blue hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- OLD MODAL -->
<!-- <div tabindex="-1" aria-hidden="true" class="modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center bg-black/50">
<div id="reportModal" tabindex="-1" aria-hidden="true" class="modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full items-center">
	<div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto my-auto">
		<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
			<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
				<h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
					Report a Problem
				</h3>
				<button type="button" on:click={showReportModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="addGoalModal">
					<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<div class="py-4 px-4">
				<form class="space-y-4" action="https://formspree.io/f/mrgdkrbw" method="POST">
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
						<input type="email" name="email" id="email-box" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
					</div>
					<div>
						<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message:</label>
						<textarea id="message" name="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
					</div>
					<button type="submit" class="w-full text-white bg-wb-blue hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
				</form>
			</div>
		</div>
	</div>
</div>
</div> -->
{/if}

