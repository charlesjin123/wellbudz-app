<script>
    import { onMount } from 'svelte'
    import { user, chatMessages, partner, userProfile, partnerProfile } from '$lib/sessionStore';
    import { supabase } from '$lib/supabaseClient';

    // import db, { store, supabase } from '../store'

    let msg = ''
    let loading = false

    let input

    const handleSendMsg = async () => {
        try {
            // console.log("sending message");
            if (msg.trim() === '') return
            loading = true
			const messageData = {
				message: msg,
                sender: $user.id,
                receiver: $partner,
			};

			const { data, error: error } = await supabase
				.from('messages')
				.insert(messageData, { returning: 'minimal' });
			if (error) throw error;

            let todayDate = new Date().toLocaleDateString('en-US', {
                timeZone: 'America/Los_Angeles'
            });
            let [month, day, year] = todayDate.split("/");
            todayDate = year+"-"+month+"-"+day;

            const { data: currentLastChatted, error: error3 } = await supabase.from('profiles').select('last_chatted').eq('id', $user.id);
            if (error3) throw error3;
            if (currentLastChatted[0]['last_chatted'] == null || currentLastChatted[0]['last_chatted'] != todayDate) {
                
                // console.log("updating current last chatted")

                const { error1 } = await supabase
                .from('profiles')
                .update({ last_chatted: todayDate })
                .eq('id', $user.id)
                if (error1) throw error1;

                // console.log("getting partner last chatted")
                
                const { data: partnerLastChatted, error: error2 } = await supabase.from('profiles').select('last_chatted').eq('id', $partner);
                if (error2) throw error2;

                // console.log("checking if there is streak")

                if (partnerLastChatted[0]['last_chatted'] != null && partnerLastChatted[0]['last_chatted'] == todayDate) {
                    
                    // console.log("adding new streak day");

                    const streakDayData = {
                        partner1: $user.id,
                        partner2: $partner,
                        date: todayDate,
                    };

                    const { data, error: error } = await supabase
                        .from('streak_days')
                        .insert(streakDayData, { returning: 'minimal' });
                    if (error) throw error;

                    if ($userProfile["last_streak_date"] == null || $userProfile["last_streak_date"] != todayDate) {
                        const { error1 } = await supabase
                        .from('profiles')
                        .update({ last_streak_date: todayDate, streak: $userProfile["streak"]+1 })
                        .eq('id', $user.id)
                        if (error1) throw error1;

                        const { error2 } = await supabase
                        .from('profiles')
                        .update({ last_streak_date: todayDate, streak: $partnerProfile["streak"]+1 })
                        .eq('id', $partner)
                        if (error2) throw error2;

                        // const date1 = new Date(lastStreakDateData[0]["last_streak_date"]);
                        // const date2 = new Date(todayDate);
                        // const diffTime = Math.abs(date2 - date1);
                        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        // console.log(diffDays);
                    }
                }
            }

		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
            msg = ''
			loading = false;
		}
    }

    onMount(() => {
        //input.focus()

        // const messages = supabase
        // .from('messages')
        // .on('*', (payload) => {
        //     chatMessages.update(old => [...old, payload.new]);
        //     requestAnimationFrame(() => chatWindow.scrollTo(0, chatWindow.scrollHeight));
        // })
        // .subscribe()

        // return () => messages.unsubscribe()
    })
</script>

<!-- <form on:submit|preventDefault={handleSendMsg}>
    <input bind:value={msg} placeholder="Enter a new msg" bind:this={input} />
    <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
</form> -->
  
<form on:submit|preventDefault={handleSendMsg}>
    <div class="flex items-center py-2 pl-2 rounded-lg">
        <textarea bind:value={msg} id="chat" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
        <button disabled={loading} class="inline-flex justify-center p-2 text-wb-blue rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span class="sr-only">Send message</span>
        </button>
    </div>
</form>