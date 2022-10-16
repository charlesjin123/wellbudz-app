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

            alert("Bio saved successfully!");
		} catch (error) {
			alert(error.error_description || error.message);
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

            alert("Goals list saved successfully!");
		} catch (error) {
			alert(error.error_description || error.message);
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
			alert(error.message)
		} finally {
			logOutLoading = false
		}
    }

</script>

<!-- <div class="flex justify-center text-3xl font-bold mt-10">
	Your Profile
</div> -->

<div class="grid grid-cols-1 my-10 mx-48 gap-5">
    <div class="flex place-content-between">
        <div class="text-5xl font-extrabold">{$userProfile.first_name + " " + $userProfile.last_name}</div>
        <button type="button" class="text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5">Report a Problem</button>
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
    <!-- <div class="flex place-content-end mt-10">
        <button on:click={logOut} disabled={logOutLoading} type="button" class="text-white bg-red-600 hover:bg-red-400 font-medium rounded-lg text-sm px-5 py-2">Log out</button>
    </div> -->
</div>