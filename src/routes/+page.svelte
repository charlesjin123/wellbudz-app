<script>
	import { user, userProfile, partner, partnerProfile, streakDays, month, year, blankdays, no_of_days, showToast, toastMessage, toastColor } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	
	import { goto, invalidateAll } from '$app/navigation';

	import LoginForm from '$lib/components/LoginForm.svelte';

	function showAlert(msg, color) {
		showToast = true;
		toastMessage = msg;
		toastColor = color;
	}

	function closeAlert() {
		showToast = false;
	}

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange(async (event, session) => {
		// console.log("Auth state changed");
		if (event == 'PASSWORD_RECOVERY') {
			// console.log("recovering password");
			goto("/reset-password");
		} else if (event == 'SIGNED_IN') {

			// console.log("user signed in");
			// console.log(session.user.email);

			await user.set(session.user);
			// if (userData != null) {
			// 	console.log("userData val not null");
			// 	// try {
			// 	// 	const {data, error: error1} = await supabase.from('profiles').insert(userData, {returning: 'minimal'});
			// 	// 	if (error1) throw error1
			// 	// } catch (error) {
			// 	// 	alert(error.error_description || error.message)
			// 	// } finally {
			// 	// 	goto("/coming-soon");
			// 	// }
			// } else {
			// 	console.log("userData val is null");
			// 	goto("/coming-soon");
			// }

			// goto("/coming-soon");

			try {
				const { data, error, count } = await supabase.from('profiles').select('*', { count: 'exact' }).eq('id', session.user.id);
				if (error) throw error;
				if (count == 0) {
					goto("/matching");
				} else if (data[0]['partner'] != null) {
					partner.set(data[0]['partner']); // stores partner ID
					userProfile.set(data[0]);
					//console.log($userProfile);
					//console.log("PARTNER " + $partner);
					// const { partnerData, partnerError } = await supabase.from('profiles').select('*').eq('id', $partner);
					const { data: data1, error: error1 } = await supabase.from('profiles').select('*').eq('id', $partner);
					if (error1) throw error1;
					partnerProfile.set(data1[0]);

					var date = new Date();
					var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-US', {
						timeZone: 'America/Los_Angeles'
					});
					let [m1, d1, y1] = firstDay.split("/");
					firstDay = y1+"-"+m1+"-"+d1;

					// console.log("FIRST DAY");
					// console.log(firstDay);
					
					const { data: data2, error: error2 } = await supabase.from('streak_days').select('date')
					.or('partner1.eq.'+$user.id+',partner1.eq.'+$partner)
					.or('partner2.eq.'+$user.id+',partner2.eq.'+$partner)
					.gte('date', firstDay)
					.order('date', {ascending: true});
					if (error2) throw error2;

					let days = [];
					let i
					for (i in data2) {
						let [y,m,d] = data2[i]["date"].split("-");
						days.push(parseInt(d));
					}
					streakDays.set(days);



					let today = new Date().toLocaleDateString('en-US', {
						timeZone: 'America/Los_Angeles'
					});
					let [m, d, y] = today.split("/");
					m = parseInt(m)-1;
					y = parseInt(y);
					month.set(m);
					year.set(y);

					let daysInMonth = new Date(y, m + 1, 0).getDate();

					// find where to start calendar day of week
					let dayOfWeek = new Date(y, m).getDay();
					let blankdaysArray = [];
					for (i=1; i <= dayOfWeek; i++) {
						blankdaysArray.push(i);
					}

					let daysArray = [];
					for (i=1; i <= daysInMonth; i++) {
						daysArray.push(i);
					}

					blankdays.set(blankdaysArray);
					no_of_days.set(daysArray);

					if (data[0]["last_streak_date"] != null) {
						let todayDate = new Date().toLocaleDateString('en-US', {
							timeZone: 'America/Los_Angeles'
						});
						let [month, day, year] = todayDate.split("/");
						todayDate = year+"-"+month+"-"+day;
						const date1 = new Date(data[0]["last_streak_date"]);
						const date2 = new Date(todayDate);
						const diffTime = Math.abs(date2 - date1);
						const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
						if (diffDays > 1) {
							const { error1 } = await supabase
							.from('profiles')
							.update({ streak: 0 })
							.eq('id', $user.id)
							if (error1) throw error1;
							userProfile.update(old => {
								old["streak"] = 0;
								return old;
							});
							const { error2 } = await supabase
							.from('profiles')
							.update({ streak: 0 })
							.eq('id', $partner)
							if (error2) throw error2;
							partnerProfile.update(old => {
								old["streak"] = 0;
								return old;
							});
						}
					}

					goto("/home");
				} else {
					goto('/waiting-for-match');
				}
			} catch (error) {
				if (error.message == "Cannot read properties of null (reading 'id')" || error.description == "Cannot read properties of null (reading 'id')") {
					return;
				}
				showToast.set(true);
				toastMessage.set(error.message || error.description);
				toastColor.set("red-200");
			}
			
		} else if (event == 'SIGNED_OUT') {
			// console.log("user signed out");
			goto("/");
		}
	});

</script>

<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-contain bg-center bg-no-repeat bg-lemon-background-color bg-lemon-background z-0">
	<div class="bg-white rounded-2xl p-10">
		<p class="text-4xl font-bold mb-5 text-center">Login</p>
		<LoginForm title="login" />
		<p class="mt-5 text-center w-72 text-black hover:text-wb-orange text-sm"><a href="/password-recovery">Forgot Password?</a></p>
		<p class="mt-4 text-center w-72 text-black hover:text-wb-orange"><a href="/sign-up">New? Click here to create an account.</a></p>
	</div>
</div>

{#if $showToast}
<div aria-hidden="true" class="h-screen fixed bottom-0 left-0 flex bg-black/50 place-items-end">
	<div class="fixed flex items-center p-4 m-4 w-full max-w-xs text-gray-500 bg-{$toastColor} rounded-lg border shadow dark:text-gray-400 dark:bg-gray-800">
		<!-- <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
			<span class="sr-only">Check icon</span>
		</div> -->
		<div class="ml-3 text-sm font-normal">{$toastMessage}</div>
		<button type="button" on:click={() => {showToast.set(false)}} class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
			<span class="sr-only">Close</span>
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		</button>
	</div>
</div>
{/if}