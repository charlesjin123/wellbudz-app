<script>
    import { supabase } from '$lib/supabaseClient';

    let loading = false;
    let email

    const resetPasswordRequest = async () => {
		try {
            loading = true
            const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
            if (error) throw error
            alert("Password Recovery Email Sent!");
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
		<p class="text-4xl font-bold mb-5 text-center w-72">Password Reset Email</p>
		<form id="loginForm" on:submit|preventDefault={resetPasswordRequest} class="grid">

            <div class="mb-6">
                <label for="emailInput" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" id="emailInput" bind:value={email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
            </div>

            <button type="submit" disabled={loading} class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send</button>
        </form>
	</div>
</div>