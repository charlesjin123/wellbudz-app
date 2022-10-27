<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/sessionStore'
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let loadingPage = true;

	let loading;
	let firstName;
	let lastName;
	let age;
	let country;
	let gender;
	let ethnicity;
	let goalCategory;
	let pastExperiences;
	let goalsList;
	let achieveBy;
	let biggestObstacle;
	let traitsSelf;
	let traitsOther;

	let showToast = false;
	let toastMessage;
	let toastColor;

	async function checkAuth() {
		if (!$user) {
			goto("/");
		}
	}

	const match = async () => {
		try {
			loading = true;

			var ele = document.getElementsByName('gender-options');
			var i;
            for(i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
					gender = ele[i].value;
				}
            }
			ele = document.getElementsByName('ethnicity-options');
            for(i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
					ethnicity = ele[i].value;
				}
            }
			ele = document.getElementsByName('goal-category-options');
            for(i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
					goalCategory = ele[i].value;
				}
            }
			ele = document.getElementsByName('achieve-by-options');
            for(i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
					achieveBy = ele[i].value;
				}
            }
			ele = document.getElementsByName('biggest-obstacle-options');
            for(i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
					biggestObstacle = ele[i].value;
				}
            }
			traitsSelf = "";
			ele = document.getElementsByName('traits-self-checkbox');
            for(i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
					traitsSelf += ele[i].value + " ";
				}
            }
			traitsOther = "";
			ele = document.getElementsByName('traits-other-checkbox');
            for(i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
					traitsOther += ele[i].value + " ";
				}
            }

			const userData = {
				id: $user.id,
				email: $user.email,
				first_name: firstName,
				last_name: lastName,
				age: parseInt(age),
				updated_at: new Date(),
				country: country,
				gender: gender,
				ethnicity: ethnicity,
				goal_category: goalCategory,
				past_experiences: pastExperiences,
				goals_list: goalsList,
				achieve_by: achieveBy,
				biggest_obstacle: biggestObstacle,
				traits_self: traitsSelf,
				traits_other: traitsOther,
			};

			const { data, error: error1 } = await supabase
				.from('profiles')
				.insert(userData, { returning: 'minimal' });
			if (error1) throw error1;

			// alert('Data stored successfully!');
			goto('/waiting-for-match')
		} catch (error) {
			// alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};

	onMount(async () => {

		loadingPage = true;

		await checkAuth();

		loadingPage = false;

	})
</script>

{#if !loadingPage}
<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10" />
<div
	class="grid place-items-center bg-contain bg-center bg-repeat-y bg-lemon-background-color bg-lemon-background bg-scroll py-5"
>
	<div class="bg-white rounded-2xl p-10 w-2/3">
		<p class="text-4xl font-bold mb-5 text-center">Find Your Buddy!</p>
		<form id="matchingForm" on:submit|preventDefault={match} class="grid">
			<div class="grid grid-cols-2 gap-6">
				<div class="mb-6">
					<label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
					<input type="text" id="firstName" bind:value={firstName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
				</div>
				<div class="mb-6">
					<label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
					<input type="text" id="lastName" bind:value={lastName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
				</div>
			</div>
			<div class="mb-6">
				<label for="age" class="block mb-2 text-sm font-medium text-gray-900">Age</label>
				<input type="number" id="age" bind:value={age} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5" required>
			</div>
			<div>
				<label for="gender" class="block mb-3 text-lg font-medium text-gray-900">Gender</label>
				<fieldset id="gender">
					<legend class="sr-only">Gender</legend>

					<div class="flex items-center mb-4">
						<input
							id="gender-option-1"
							type="radio"
							name="gender-options"
							value="male"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="gender-option-1"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Male
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="gender-option-2"
							type="radio"
							name="gender-options"
							value="female"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="gender-option-2"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Female
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="gender-option-3"
							type="radio"
							name="gender-options"
							value="other"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="gender-option-3"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Other
						</label>
					</div>
				</fieldset>
			</div>
			<div class="mb-6">
				<label for="countryInput" class="block mb-2 text-lg font-medium text-gray-900">Country</label>
				<input
					type="text"
					id="countryInput"
					bind:value={country}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5"
				/>
			</div>
			<div>
				<label for="ethnicity" class="block mb-3 text-lg font-medium text-gray-900">Ethnicity</label>
				<fieldset id="ethnicity">
					<legend class="sr-only">Ethnicity</legend>

					<div class="flex items-center mb-4">
						<input
							id="ethnicity-option-1"
							type="radio"
							name="ethnicity-options"
							value="white"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="ethnicity-option-1"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							White
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="ethnicity-option-2"
							type="radio"
							name="ethnicity-options"
							value="black or african american"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="ethnicity-option-2"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Black or African American
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="ethnicity-option-3"
							type="radio"
							name="ethnicity-options"
							value="american indian or alaska native"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="ethnicity-option-3"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							American Indian or Alaska Native
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="ethnicity-option-4"
							type="radio"
							name="ethnicity-options"
							value="asian"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="ethnicity-option-4"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Asian
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="ethnicity-option-5"
							type="radio"
							name="ethnicity-options"
							value="hispanic or latino"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="ethnicity-option-5"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Hispanic or Latino
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="ethnicity-option-6"
							type="radio"
							name="ethnicity-options"
							value="native hawaiian or pacific islander"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="ethnicity-option-6"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Native Hawaiian or Pacific Islander
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="ethnicity-option-7"
							type="radio"
							name="ethnicity-options"
							value="other"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="ethnicity-option-7"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Other
						</label>
					</div>
				</fieldset>
			</div>

			<div>
				<label for="goal-category" class="block mb-3 text-lg font-medium text-gray-900">Choose a Goal Category:</label>
				<fieldset id="goal-category">
					<legend class="sr-only">Goal Category</legend>

					<div class="flex items-center mb-4">
						<input
							id="goal-category-option-1"
							type="radio"
							name="goal-category-options"
							value="running"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="goal-category-option-1"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Running
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="goal-category-option-2"
							type="radio"
							name="goal-category-options"
							value="weightlifting"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="goal-category-option-2"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Weightlifting
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="goal-category-option-3"
							type="radio"
							name="goal-category-options"
							value="calisthenics"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="goal-category-option-3"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Calisthenics
						</label>
					</div>
				</fieldset>
			</div>

			<div class="mb-6">
				<label for="pastExperiencesInput" class="block mb-2 text-lg font-medium text-gray-900">Please describe your past experiences/level in this activity:</label>
				<!-- <input
					type="text"
					id="pastExperiencesInput"
					bind:value={pastExperiences}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5"
				/> -->
				<textarea id="pastExperiencesInput" rows="4" bind:value={pastExperiences} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
			</div>

			<div class="mb-6">
				<label for="fitnessGoalsInput" class="block mb-2 text-lg font-medium text-gray-900">Please list your fitness goal(s):</label>
				<!-- <input
					type="text"
					id="pastExperiencesInput"
					bind:value={pastExperiences}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5"
				/> -->
				<textarea id="fitnessGoalsInput" rows="4" bind:value={goalsList} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
			</div>

			<div>
				<label for="achieve-by" class="block mb-3 text-lg font-medium text-gray-900">How long do you plan to achieve the goal?</label>
				<fieldset id="achieve-by">
					<legend class="sr-only">Achieve By</legend>

					<div class="flex items-center mb-4">
						<input
							id="achieve-by-option-1"
							type="radio"
							name="achieve-by-options"
							value="less than 1 week"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="achieve-by-option-1"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Less than 1 week
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="achieve-by-option-2"
							type="radio"
							name="achieve-by-options"
							value="less than 1 month"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="achieve-by-option-2"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Less than 1 month
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="achieve-by-option-3"
							type="radio"
							name="achieve-by-options"
							value="1 to 6 months"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="achieve-by-option-3"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							1 to 6 months
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="achieve-by-option-4"
							type="radio"
							name="achieve-by-options"
							value="6 months to 1 year"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="achieve-by-option-4"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							6 months to 1 year
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="achieve-by-option-5"
							type="radio"
							name="achieve-by-options"
							value="more than 1 year"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="achieve-by-option-5"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							More than 1 year
						</label>
					</div>
				</fieldset>
			</div>

			<div>
				<label for="biggest-obstacle" class="block mb-3 text-lg font-medium text-gray-900">What is the biggest thing stopping you from staying motivated and working toward your fitness goal(s)?</label>
				<fieldset id="biggest-obstacle">
					<legend class="sr-only">Biggest Obstacle</legend>

					<div class="flex items-center mb-4">
						<input
							id="biggest-obstacle-option-1"
							type="radio"
							name="biggest-obstacle-options"
							value="lack of time"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="biggest-obstacle-option-1"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Lack of Time
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="biggest-obstacle-option-2"
							type="radio"
							name="biggest-obstacle-options"
							value="lack of equipment"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="biggest-obstacle-option-2"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Lack of Equipment
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="biggest-obstacle-option-3"
							type="radio"
							name="biggest-obstacle-options"
							value="lack of a good environment"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="biggest-obstacle-option-3"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Lack of a Good Environment
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="biggest-obstacle-option-4"
							type="radio"
							name="biggest-obstacle-options"
							value="laziness"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="biggest-obstacle-option-4"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Laziness
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="biggest-obstacle-option-5"
							type="radio"
							name="biggest-obstacle-options"
							value="too many distractions/short-term gratifications"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="biggest-obstacle-option-5"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Too Many Distractions/Short-Term Gratifications
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="biggest-obstacle-option-6"
							type="radio"
							name="biggest-obstacle-options"
							value="other"
							class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-wb-orange"
							checked=""
						/>
						<label
							for="biggest-obstacle-option-6"
							class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Other
						</label>
					</div>
				</fieldset>
			</div>

			<div>
				<label class="block mb-3 text-lg font-medium text-gray-900">What traits describe yourself the most? (Choose 3 ONLY)</label>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-1" type="checkbox" value="kind" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kind</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-2" type="checkbox" value="empathetic" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Empathetic</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-3" type="checkbox" value="supporting" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Supporting</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-4" type="checkbox" value="strong-willed" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-4" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Strong-willed</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-5" type="checkbox" value="fun" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-5" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fun</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-6" type="checkbox" value="spontaneous" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-6" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Spontaneous</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-7" type="checkbox" value="energetic" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-7" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Energetic</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-8" type="checkbox" value="hard-working" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-8" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hard-working</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-9" type="checkbox" value="committed" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-9" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Committed</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-self-checkbox-10" type="checkbox" value="easy-going" name="traits-self-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-self-checkbox-10" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Easy-going</label>
				</div>
			</div>

			<div>
				<label class="block mb-3 text-lg font-medium text-gray-900">What traits do you look for most in a buddy? (Choose 3 ONLY)</label>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-1" type="checkbox" value="kind" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kind</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-2" type="checkbox" value="empathetic" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Empathetic</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-3" type="checkbox" value="supporting" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Supporting</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-4" type="checkbox" value="strong-willed" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-4" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Strong-willed</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-5" type="checkbox" value="fun" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-5" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fun</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-6" type="checkbox" value="spontaneous" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-6" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Spontaneous</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-7" type="checkbox" value="energetic" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-7" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Energetic</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-8" type="checkbox" value="hard-working" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-8" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hard-working</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-9" type="checkbox" value="committed" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-9" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Committed</label>
				</div>
				<div class="flex items-center mb-4">
					<input id="traits-other-checkbox-10" type="checkbox" value="easy-going" name="traits-other-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
					<label for="traits-other-checkbox-10" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Easy-going</label>
				</div>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				>
				{#if loading}
				<div role="status" class="">
					<svg aria-hidden="true" class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-wb-blue" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
					</svg>
					<span class="sr-only">Loading...</span>
				</div>
				{:else}
				Submit
				{/if}
			</button>
		</form>
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
		<button type="button" on:click={() => {showToast.set(false)}} class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
			<span class="sr-only">Close</span>
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		</button>
	</div>
</div>
{/if}
