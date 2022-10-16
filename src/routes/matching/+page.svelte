<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/sessionStore'
	import { goto } from '$app/navigation';

	let loading = false;
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

			alert('Data stored successfully!');
			goto('/waiting-for-match')
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

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
				>Submit</button
			>
		</form>
	</div>
</div>
