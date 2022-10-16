<script>
    import { streakDays, month, year, blankdays, no_of_days } from '$lib/sessionStore.js';
    import { onMount } from 'svelte';

    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


    function hasStreak(date) {
        // console.log(date);
        for (var i in $streakDays) {
            if ($streakDays[i] == date) {
                return true;
            }
        }
        return false;
    }
    
</script>

<div class="container mx-auto px-4 pt-5 pb-10">
    
    <!-- <div class="font-bold text-gray-800 text-xl mb-4">
        Schedule Tasks
    </div> -->

    <div class="bg-white rounded-lg shadow overflow-hidden">

        <div class="flex items-center justify-between py-2 px-6">
            <div>
                <span class="text-lg font-bold text-gray-800">{MONTH_NAMES[$month]}</span>
                <span class="ml-1 text-lg text-gray-600 font-normal">{$year}</span>
            </div>
        </div>	

        <div class="-mx-1 -mb-1">
            <div class="flex flex-wrap" style="margin-bottom: -40px;">
                <!-- <template x-for="day in DAYS">	
                    <div style="width: 14.26%" class="px-2 py-2">
                        <div
                            x-text="day" 
                            class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center"></div>
                    </div>
                </template> -->
                
                {#each DAYS as day}
                    <div style="width: 14.26%" class="px-2 py-2 z-50">
                        <div class="text-black text-sm uppercase tracking-wide font-bold text-center">{day}</div>
                    </div>
                {/each}
            </div>

            <div class="flex flex-wrap border-t border-l">
                {#each $blankdays as blankday}
                    <div style="width: 14.28%; height: 120px" class="text-center border-r border-b px-4 pt-2"></div>
                {/each}
                {#each $no_of_days as date}
                    {#if hasStreak(date) }
                    <div style="width: 14.28%; height: 120px" class="px-4 pt-2 border-r border-b relative bg-wb-orange transition duration-500 ease hover:bg-orange-500">
                        <div
                            class="inline-flex w-6 h-6 items-center justify-center text-center leading-none rounded-full transition ease-in-out duration-100"
                        >{date}</div>
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
                    </div>
                    {:else}
                    <div name="dateBox" style="width: 14.28%; height: 120px" class="px-4 pt-2 border-r border-b relative transition duration-500 ease hover:bg-gray-300">
                        <div
                            class="inline-flex w-6 h-6 items-center justify-center text-center leading-none rounded-full transition ease-in-out duration-100"
                        >{date}</div>
                        
                    </div>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</div>

