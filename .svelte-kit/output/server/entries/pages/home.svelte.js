import { c as create_ssr_component } from "../../_app/immutable/chunks/index-3e01a4ca.js";
import { getAuth } from "firebase/auth";
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const auth = getAuth();
  auth.currentUser;
  return `<div class="${"bg-white h-screen"}"><nav class="${"bg-white border-b-2 border-black px-2 sm:px-4 py-2.5"}"><div class="${"container flex flex-wrap justify-between items-center mx-auto"}"><a href="${"https://wellbudz.com/"}" class="${"flex items-center"}"><img src="${"/img/logo.png"}" class="${"bg-wb-orange mr-3 h-10 sm:h-9 p-1 rounded"}" alt="${"WellBudz Logo"}">
				<span class="${"self-center text-xl font-semibold whitespace-nowrap"}">WellBudz</span></a>
			<div class="${"flex items-center gap-5"}"><div class="${"hidden w-full md:block md:w-auto"}" id="${"navbar-default"}"><ul class="${"flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white"}"></ul></div>
				<button type="${"button"}" class="${"text-white bg-black hover:bg-wb-blue font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"}"><svg class="${"w-6 h-6"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg></button></div></div></nav>
	<div class="${"grid grid-rows-1 grid-cols-2 ml-20 my-5"}"><div class="${"grid grid-cols-1 gap-5"}"><p class="${"text-4xl"}">Your Goals:</p>
			<div class="${"flex gap-10 justify-between"}"><div class="${"w-full h-52 bg-wb-orange"}"></div>
				<button type="${"button"}" class="${"w-40 text-white bg-gray-400 hover:bg-wb-blue font-medium text-sm px-5 py-2.5"}">Add Goal</button></div>
			<p class="${"text-4xl"}">Your Buddy&#39;s Goals:</p>
			<div class="${"flex gap-10 justify-between"}"><div class="${"w-full h-52 bg-wb-orange"}"></div>
				<button type="${"button"}" class="${"w-40 text-white bg-gray-400 hover:bg-wb-blue font-medium text-sm px-5 py-2.5"}">View Partner Profile</button></div>
			<p class="${"text-4xl"}">Your Streak: 7 days</p></div>
		<div class="${"w-96 h-full bg-gray-400 justify-self-center grid items-center"}"><p class="${"text-center"}">Chat</p></div></div></div>

`;
});
export {
  Home as default
};
