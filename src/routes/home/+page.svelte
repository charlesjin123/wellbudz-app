<script>
	import Chat from '$lib/components/Chat.svelte';
	import { goto } from '$app/navigation';
	import {
		user,
		userProfile,
		partnerProfile,
		streakDays,
		goals,
		buddyGoals,
		showReportModalHomePage
	} from '$lib/sessionStore.js';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	let addGoalModalOpen = false;
	let goalDetailModalOpen = false;

	let goalDetails;
	let goalDetailsPerson;

	let loadingPage = true;

	function switchAddGoalModal() {
		addGoalModalOpen = !addGoalModalOpen;
	}

	function showGoalDetailModal(goal, mine) {
		goalDetailModalOpen = true;
		goalDetails = goal;
		// console.log(goal);
		if (mine) {
			goalDetailsPerson = $userProfile['first_name'] + ' ' + $userProfile['last_name'];
		} else {
			goalDetailsPerson = $partnerProfile['first_name'] + ' ' + $partnerProfile['last_name'];
		}
	}

	function closeGoalDetailModal(goal) {
		goalDetailModalOpen = false;
	}

	function toPartnerProfile() {
		goto('/home/partner-profile');
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		try {
			const requestData = {
				...data,
				userid: $user.id,
				isCompleted: false
			};

			const { mydata, error: error } = await supabase.from('goals').insert(requestData);
			if (error) throw error;
			addGoalModalOpen=false;
			// var { data: data1, error: error1 } = await supabase
			// 	.from('goals')
			// 	.select('*')
			// 	.eq('userid', $user.id)
			// 	.order('created_at', { ascending: true });
			// if (error1) throw error1;
			// goals.set(data1);
		} catch (error) {
			alert(error.error_description || error.message);
		}
	}
	async function handleDelete(goal) {
		try {
			const { mydata, error: error } = await supabase.from('goals').delete().match({ id: goal.id });
			if (error) throw error;
			goalDetailModalOpen=false;
			// var { data: data1, error: error1 } = await supabase
			// 	.from('goals')
			// 	.select('*')
			// 	.eq('userid', $user.id)
			// 	.order('created_at', { ascending: true });
			// if (error1) throw error1;
			// goals.set(data1);
		} catch (error) {
			alert(error.error_description || error.message);
		}
	}

	async function handleComplete(goal) {
		try {
			goalDetailModalOpen=false;
			const { mydata, error: error } = await supabase.from('goals').update({"isCompleted": !goal.isCompleted}).match({ id: goal.id });
			// var { data1, error1 } = await supabase
			// 	.from('goals')
			// 	.select('*')
			// 	.eq('userid', $user.id)
			// 	.order('created_at', { ascending: true });
			// goals.set(data1);
		} catch (error) {
			alert(error.error_description || error.message);
		}
	}

	async function checkAuth() {
		if (!$user) {
			goto('/');
		}
	}

	onMount(async () => {
		await checkAuth();

		const streakUpdateTracker = supabase
			.from('profiles')
			.on('*', (payload) => {
				//console.log("CHANGE RECEIVED", payload);
				if (payload.old.id == $user.id) {
					userProfile.update((old) => payload.new);
					//console.log($userProfile);
				}
			})
			.subscribe();

		const streakDayUpdateTracker = supabase
			.from('streak_days')
			.on('*', (payload) => {
				// console.log("CHANGE RECEIVED", payload);
				if (payload.new.partner1 == $user.id || payload.new.partner2 == $user.id) {
					let [y, m, d] = payload.new.date.split('-');
					streakDays.update((old) => [...old, parseInt(d)]);
				}
			})
			.subscribe();

		const goalsUpdateTracker = supabase.from('goals').on('*', (payload) => {
			// console.log("goal update detected");
			// console.log(payload);
			if (payload.eventType == "INSERT") {
				//console.log("goal insert detected");
				if (payload.new.userid == $user.id) {
					goals.update((old) => [...old, payload.new]);
					//console.log("own goal insert detected");
					//console.log($goals);
				} else if (payload.new.userid == $userProfile.partner) {
					buddyGoals.update((old) => [...old, payload.new]);
					//console.log("partner goal insert detected");
					//console.log($buddyGoals);
				}
			} else if (payload.eventType == "DELETE") {
				//console.log("goal delete detected");
				var removedGoalKey;
				for (let key in $goals) {
					if ($goals[key].id == payload.old.id) {
						removedGoalKey = key;
					}
				}
				if (removedGoalKey != null) {
					let copy = $goals;
					copy.splice(removedGoalKey, 1);
					goals.set(copy);
				} else {
					for (let key in $buddyGoals) {
						if ($buddyGoals[key].id == payload.old.id) {
							removedGoalKey = key;
						}
					}
					let copy = $buddyGoals;
					copy.splice(removedGoalKey, 1);
					buddyGoals.set(copy);
				}
			} else if (payload.eventType == "UPDATE") {
				if (payload.new.userid == $user.id) {
					var updatedGoalKey;
					for (let key in $goals) {
						if ($goals[key].id == payload.new.id) {
							updatedGoalKey = key;
						}
					}
					$goals[updatedGoalKey] = payload.new;
				} else if (payload.new.userid == $userProfile.partner) {
					var updatedGoalKey;
					for (let key in $goals) {
						if ($buddyGoals[key].id == payload.new.id) {
							updatedGoalKey = key;
						}
					}
					$buddyGoals[updatedGoalKey] = payload.new;
				}
			}
			
		}).subscribe(); 

		// const goalsDeleteTracker = supabase.from('goals').on('DELETE', (payload) => {
		// 	console.log("goal delete detected");
		// 	if (payload.new.userid == $user.id) {
		// 		goals.update((old) => {
		// 			var removedGoalKey;
		// 			for (let [key, value] in old) {
		// 				if (value.id == payload.new.id) {
		// 					removedGoalKey = key;
		// 				}
		// 			}
		// 			old.delete(key);
		// 			return old;
		// 		});
		// 		console.log("own goal delete detected");
		// 		console.log($goals);
		// 	} else if (payload.new.userid == $userProfile.partner) {
		// 		buddyGoals.update((old) => {
		// 			var removedGoalKey;
		// 			for (let [key, value] in old) {
		// 				if (value.id == payload.new.id) {
		// 					removedGoalKey = key;
		// 				}
		// 			}
		// 			old.delete(key);
		// 			return old;
		// 		});
		// 		console.log("partner goal delete detected");
		// 		console.log($buddyGoals);
		// 	}
		// }).subscribe();

		// const buddyGoalsUpdateTracker = supabase
		// 	.from('goals')
		// 	.on('*', (payload) => {
		// 		console.log("new goals change detected");
		// 		if (payload.new.userid == $userProfile.partner) {
		// 			buddyGoals.update((old) => [...old, payload.new]);
		// 			console.log("partner goal update detected");
		// 			console.log($buddyGoals);
		// 		}
		// 	})
		// 	.subscribe();
		var { data, error } = await supabase
			.from('goals')
			.select('*')
			.eq('userid', $user.id)
			.order('created_at', { ascending: true });
		goals.set(data);
		var { data, error } = await supabase
			.from('goals')
			.select('*')
			.eq('userid', $userProfile.partner)
			.order('created_at', { ascending: true });
		buddyGoals.set(data);
		// console.log("partner id", $userProfile.partner);
		// console.log("buddy goals", $buddyGoals);

		loadingPage = false;

		return () => {
			streakUpdateTracker.unsubscribe();
			streakDayUpdateTracker.unsubscribe();
			goalsUpdateTracker.unsubscribe();
			// buddyGoalsUpdateTracker.unsubscribe();
		};
	});
</script>

{#if loadingPage}
	<div class="grid h-screen">
		<div role="status" class="place-self-center">
			<svg
				aria-hidden="true"
				class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-wb-blue"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	</div>
{:else}
	<div class="grid lg:grid-rows-1 lg:grid-cols-2 mx-5 sm:mx-10 my-5 gap-5">
		<div class="grid grid-cols-1 gap-5 md:gap-5 lg:gap-0 xl:gap-5">
			<p class="text-4xl font-bold">Your Goals:</p>
			<div class="sm:flex sm:gap-10 sm:justify-between">
				<div
					class="w-full h-[24rem] md:h-[24rem] lg:h-[17rem] xl:h-[14rem] 2xl:h-[21rem] bg-wb-orange overflow-auto grid grid-cols-1 sm:grid-cols-2 border-4 border-gray-200"
				>
					{#each $goals as goal}
						<div class="relative">
							<a
								on:click={showGoalDetailModal(goal, true)}
								class="block m-2 p-3 h-20 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 {goal.isCompleted ? 'opacity-70 line-through' : ''}"
							>
								<div class="relative flex flex-col">
										<div class="max-w-[16rem] md:max-w-[12rem] lg:max-w-[6rem] xl:max-w-[10rem] 2xl:max-w-[16rem]">
											<h5 class="xl:text-xl font-bold tracking-tight text-gray-900 overflow-hidden truncate">{goal.title}</h5>
										</div>
										<p class="font-normal text-gray-700 overflow-hidden truncate">{goal.date}</p>
								</div>
							</a>
							<div class="absolute right-5 top-7 {goal.isCompleted ? 'opacity-70' : ''}">
								<button
									class="text-white bg-wb-blue hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
									on:click={handleComplete(goal)}
								>
									<svg
										class="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/></svg
									>
									<span class="sr-only">Check</span>
								</button>
							</div>
						</div>
					{/each}
				</div>
				<!-- <button class="w-40 text-white bg-gray-400 hover:bg-wb-blue font-medium text-sm px-5 py-2.5" data-modal-toggle="addGoalModal">Add Goal</button> -->
				<button
					class="mt-3 sm:mt-0 w-full sm:w-40 lg:h-[17rem] xl:h-[14rem] 2xl:h-[21rem] text-white bg-gray-400 hover:bg-wb-blue font-medium text-sm px-5 py-2.5"
					on:click={switchAddGoalModal}>Add Goal</button
				>
			</div>
			<p class="text-4xl font-bold">Your Buddy's Goals:</p>
			<div class="sm:flex sm:gap-10 sm:justify-between">
				<div
					class="w-full h-[24rem] md:h-[24rem] lg:h-[17rem] xl:h-[14rem] 2xl:h-[21rem] bg-wb-orange overflow-auto grid grid-cols-1 sm:grid-cols-2 border-4 border-gray-200"
				>
					{#each $buddyGoals as buddyGoal}
						<div class="relative">
							<a
								on:click={showGoalDetailModal(buddyGoal, false)}
								class="block m-2 p-3 h-20 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 {buddyGoal.isCompleted ? 'opacity-70 line-through' : ''}"
							>
								<div class="relative flex flex-col">
										<div class="max-w-[16rem] md:max-w-[12rem] lg:max-w-[6rem] xl:max-w-[10rem] 2xl:max-w-[16rem]">
											<h5 class="text-xl font-bold tracking-tight text-gray-900 overflow-hidden truncate">{buddyGoal.title}</h5>
										</div>
										<p class="font-normal text-gray-700 overflow-hidden truncate">{buddyGoal.date}</p>
								</div>
							</a>
							<!-- <div class="absolute right-5 top-7">
								<button
									class="text-white bg-wb-blue hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
								>
									<svg
										class="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/></svg
									>
									<span class="sr-only">Check</span>
								</button>
							</div> -->
						</div>
					{/each}
				</div>
				<button
					on:click={toPartnerProfile}
					class="mt-3 sm:mt-0 w-full sm:w-40 lg:h-[17rem] xl:h-[14rem] 2xl:h-[21rem] text-white bg-gray-400 hover:bg-wb-blue font-medium text-sm px-5 py-2.5"
					>View Partner Profile</button
				>
			</div>
			<p class="text-4xl font-bold">Your Streak: {$userProfile['streak']} days</p>
		</div>
		<!-- <div class="w-96 h-full bg-gray-400 justify-self-center grid items-center">
		<p class="text-center">Chat</p>
	</div> -->
		<div class="">
			<Chat />
		</div>
	</div>
{/if}

{#if goalDetailModalOpen}
	<div
		aria-hidden="true"
		class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50"
	>
		<div class="relative p-4 w-full max-w-2xl max-h-full overflow-auto">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div class="flex justify-between items-start px-4 pt-4 rounded-t dark:border-gray-600">
					<h3 class="text-2xl font-semibold text-gray-900 dark:text-white overflow-hidden">
						{goalDetails.title}
					</h3>
					<button
						type="button"
						on:click={closeGoalDetailModal}
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="goalDetailsModal"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<div class="p-4 border-b">
					<p class="text-lg leading-relaxed overflow-hidden">
						{goalDetails.description}
					</p>
				</div>
				<div class="p-4 space-y-3">
					<p class="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
						Do by: {goalDetails.date} <br />
						Status: {goalDetails.isCompleted==true ? "Completed" : "Incomplete"} <br />
						Person: {goalDetailsPerson}
					</p>
				</div>
				{#if goalDetails.userid == $user.id}
					<button
						type="button"
						class="ml-2 mb-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						on:click={handleDelete(goalDetails)}>Delete Goal</button
					>
				{/if}
				<!-- <div class="p-4 space-y-6 border-b">
				<p class="text-lg font-bold leading-relaxed text-gray-500 dark:text-gray-400">
					Comments
				</p>
			</div>
			<form>
				<div class="flex items-center py-2 pl-2 bg-gray-50 rounded-lg dark:bg-gray-700">
					<textarea id="chat" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your comment..."></textarea>
						<button class="inline-flex justify-center p-2 text-wb-blue rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
						<svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
						<span class="sr-only">Send message</span>
					</button>
				</div>
			</form> -->
			</div>
		</div>
	</div>
{/if}

{#if addGoalModalOpen}
	<!-- Add Goal Modal -->
	<div
		aria-hidden="true"
		class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50"
	>
		<div class="relative p-4 w-full max-w-2xl max-h-full overflow-auto">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
					<h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Add Goal</h3>
					<button
						type="button"
						on:click={switchAddGoalModal}
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="addGoalModal"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<div class="py-4 px-4">
					<form class="space-y-4" on:submit={handleSubmit}>
						<div>
							<label
								for="goal-title"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Goal Title</label
							>
							<input
								type="text"
								name="title"
								id="goal-title"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
						</div>
						<div>
							<label
								for="goal-date"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Goal Date</label
							>
							<div class="relative">
								<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
									<svg
										aria-hidden="true"
										class="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
											clip-rule="evenodd"
										/></svg
									>
								</div>
								<input
									datepicker
									datepicker-autohide
									type="text"
									name="date"
									id="goal-date"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Select date"
									required
								/>
							</div>
						</div>
						<div>
							<label
								for="goal-desc"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
								>Description</label
							>
							<textarea
								id="goal-desc"
								name="description"
								rows="4"
								class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>
						<button
							class="w-full text-white bg-wb-blue hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>Submit</button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if $showReportModalHomePage}
	<div
		aria-hidden="true"
		class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50"
	>
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto my-auto">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
					<h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Report a Problem</h3>
					<button
						type="button"
						on:click={() => {
							showReportModalHomePage.set(false);
						}}
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="addGoalModal"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<div class="py-4 px-4">
					<form class="space-y-4" action="https://formspree.io/f/mrgdkrbw" method="POST">
						<div>
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label
							>
							<input
								type="email"
								name="email"
								id="email-box"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
						</div>
						<div>
							<label
								for="message"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
								>Your Message</label
							>
							<textarea
								id="message"
								name="message"
								rows="4"
								class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>
						<button
							type="submit"
							class="w-full text-white bg-wb-blue hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>Submit</button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}
