<script>

	import CalendarBlocks from '$lib/components/CalendarBlocks.svelte';

</script>

<div class="bg-gray-300">

<div class="flex justify-center text-3xl font-bold pt-10">
	Streak Calendar
</div>
<div class="flex justify-center text-lg mt-5">
	Check how many days you have checked in with your partner!
</div>

<div>
	<div class="antialiased sans-serif">
		<CalendarBlocks/>
	</div>
</div>

</div>

<!-- 
<div class="container mx-auto my-10 drop-shadow-2xl">
	<div class="wrapper bg-white rounded w-full">
		<div class="header flex justify-between border-b bg-wb-blue p-2">
			<span class="text-lg font-bold"> 2022 September </span>
		</div>
		<table class="w-full table-fixed">
			<thead>
				<tr>
					<th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
						<span class="xl:block lg:block md:block sm:block hidden">Sunday</span>
						<span class="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
					</th>
					<th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
						<span class="xl:block lg:block md:block sm:block hidden">Monday</span>
						<span class="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
					</th>
					<th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
						<span class="xl:block lg:block md:block sm:block hidden">Tuesday</span>
						<span class="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
					</th>
					<th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
						<span class="xl:block lg:block md:block sm:block hidden">Wednesday</span>
						<span class="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
					</th>
					<th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
						<span class="xl:block lg:block md:block sm:block hidden">Thursday</span>
						<span class="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
					</th>
					<th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
						<span class="xl:block lg:block md:block sm:block hidden">Friday</span>
						<span class="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
					</th>
					<th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
						<span class="xl:block lg:block md:block sm:block hidden">Saturday</span>
						<span class="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="text-center h-20">
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300 "
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">1</span>
							</div>

						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">2</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">3</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">4</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">6</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-hidden transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">7</span>
							</div>

						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500 text-sm">8</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
				</tr>

				<tr class="text-center h-20">
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">9</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">10</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-orange-300 bg-wb-orange"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-red-700 font-bold">12</span>
								<br>
								<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-orange-300 bg-wb-orange"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-red-700 font-bold">13</span>
								<br>
								<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">14</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">15</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500 text-sm">16</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
				</tr>

				<tr class="text-center h-20">
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">16</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">17</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">18</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">19</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">20</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">21</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500 text-sm">22</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
				</tr>

				<tr class="text-center h-20">
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">23</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">24</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">25</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">26</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">27</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">28</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500 text-sm">29</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
				</tr>
				<tr class="text-center h-20">
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">30</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">31</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">1</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">2</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">3</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500">4</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
					<td
						class="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
					>
						<div
							class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
						>
							<div class="top h-5 w-full">
								<span class="text-gray-500 text-sm">5</span>
							</div>
							<div class="bottom flex-grow h-30 py-1 w-full cursor-pointer" />
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div><br></div>
 -->



