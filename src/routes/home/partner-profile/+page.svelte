<script>

	import { partnerProfile } from '$lib/sessionStore.js';

</script>

<!-- <div class="flex justify-center text-3xl font-bold mt-10">
	Your Profile
</div> -->

<div class="grid grid-cols-1 my-10 mx-5 md:mx-10 lg:mx-40 xl:mx-96 gap-5">
    <div class="flex place-content-between">
        <div class="text-5xl font-extrabold">{$partnerProfile.first_name + " " + $partnerProfile.last_name}</div>
    </div>
    <div class="grid gap-2">
        <div class="text-xl font-bold">Bio</div>
        {#if $partnerProfile.bio != null}
        <div class="bg-gray-300 p-5">{$partnerProfile.bio}</div>
        {:else}
        <div class="bg-gray-300 p-5 text-black/50">Your partner hasn't written a bio yet...</div>
        {/if}
    </div>
    <div class="grid gap-2">
        <div class="text-xl font-bold">Goals List</div>
        {#if $partnerProfile.goals_list != null}
        <div class="bg-gray-300 p-5 mb-5">{$partnerProfile.goals_list}</div>
        {:else}
        <div class="bg-gray-300 p-5 text-black/50 mb-5">Your partner hasn't written a goals list yet...</div>
        {/if}
    </div>
</div>