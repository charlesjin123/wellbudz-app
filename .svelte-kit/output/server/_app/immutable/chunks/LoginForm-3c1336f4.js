import { c as create_ssr_component } from "./index-3e01a4ca.js";
import { getAuth } from "firebase/auth";
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  getAuth();
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<form id="${"loginForm"}" class="${"grid"}"><div class="${"mb-6"}"><label for="${"emailInput"}" class="${"block mb-2 text-sm font-medium text-gray-900"}">Email</label>
		<input type="${"email"}" id="${"emailInput"}" class="${"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5"}" required></div>
	<div class="${"mb-6"}"><label for="${"passInput"}" class="${"block mb-2 text-sm font-medium text-gray-900"}">Password</label>
		<input type="${"password"}" id="${"passInput"}" class="${"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-wb-blue focus:border-wb-blue block w-full p-2.5"}" required></div>
	<button type="${"submit"}" class="${"justify-self-center w-1/3 text-white bg-wb-orange hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center"}">Submit</button>

	
	

	</form>`;
});
export {
  LoginForm as L
};
