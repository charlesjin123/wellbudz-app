<script>
    import { supabase } from '$lib/supabaseClient';
	import { goto } from "$app/navigation";

    let loading = false;
    let new_password

    const resetPassword = async () => {
		try {
            loading = true
            const { data, error } = await supabase.auth.update({ password: new_password })
            if (error) throw error
            alert("Password Reset Successful!");
            goto("/");
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            loading = false
        }
	}

</script>

<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-contain bg-center bg-no-repeat bg-lemon-background-color bg-lemon-background">
	<div class="bg-white rounded-2xl p-10">
		<p class="text-4xl font-bold mb-5 text-center w-72">Password Reset</p>
		<form id="loginForm" on:submit|preventDefault={resetPassword} class="grid">

            <div class="mb-6">
                <label for="passInput" class="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                <input type="password" id="passInput" bind:value={new_password} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
            </div>

            <button type="submit" disabled={loading} class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset</button>
        </form>
	</div>
</div>