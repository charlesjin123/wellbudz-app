<script>
	import { getAuth } from 'firebase/auth';

	const auth = getAuth();
	const user = auth.currentUser;
</script>

<div class="bg-white h-screen">
	<nav class="bg-white border-b-2 border-black px-2 sm:px-4 py-2.5">
		<div class="container flex flex-wrap justify-between items-center mx-auto">
			<a href="https://wellbudz.com/" class="flex items-center">
				<img src="img/logo.png" class="bg-wb-orange mr-3 h-10 sm:h-9 p-1 rounded" alt="WellBudz Logo">
				<span class="self-center text-xl font-semibold whitespace-nowrap">WellBudz</span>
			</a>
			<div class="flex items-center gap-5">
				<div class="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
					<!-- <li>
						<a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-wb-blue md:p-0" aria-current="page">Home</a>
					</li>
					<li>
						<a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-wb-blue md:p-0">Page 1</a>
					</li>
					<li>
						<a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-wb-blue md:p-0">Page 2</a>
					</li>
					<li>
						<a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-wb-blue md:p-0">Page 3</a>
					</li>
					<li>
						<a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-wb-blue md:p-0">Page 4</a>
					</li> -->
					</ul>
				</div>
				<button type="button" class="text-white bg-black hover:bg-wb-blue font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
				</button>
			</div>
		</div>
	</nav>
	<div class="grid grid-rows-1 grid-cols-2 ml-20 my-5">
		<div class="grid grid-cols-1 gap-5">
			<p class="text-4xl">Your Goals:</p>
			<div class="flex gap-10 justify-between">
				<div class="w-full h-52 bg-wb-orange"></div>
				<button type="button" class="w-40 text-white bg-gray-400 hover:bg-wb-blue font-medium text-sm px-5 py-2.5">Add Goal</button>
			</div>
			<p class="text-4xl">Your Buddy's Goals:</p>
			<div class="flex gap-10 justify-between">
				<div class="w-full h-52 bg-wb-orange"></div>
				<button type="button" class="w-40 text-white bg-gray-400 hover:bg-wb-blue font-medium text-sm px-5 py-2.5">View Partner Profile</button>
			</div>
			<p class="text-4xl">Your Streak: 7 days</p>
		</div>
		<div class="w-96 h-full bg-gray-400 justify-self-center grid items-center">
			<p class="text-center">Chat</p>
		</div>
	</div>
</div>

<!-- <img src="../../img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-cover bg-no-repeat bg-cups-background">
	<div class="grid">
		<p class="text-4xl font-bold mb-5 text-center">WellBudz is coming soon!</p>
		<p class="justify-self-center text-center w-1/4">Thank you for registering an account with the email: . Our application is still under development and will be released by <u>October 1st, 2022</u>. Once it is released, you will be notified and be able to log in to the platform via the account you just created. Thank you for your patience!</p>
	</div>
</div> -->

