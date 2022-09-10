import { c as create_ssr_component, v as validate_component } from "../../_app/immutable/chunks/index-3e01a4ca.js";
import { L as LoginForm } from "../../_app/immutable/chunks/LoginForm-3c1336f4.js";
import "firebase/auth";
const Signup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<img src="${"/img/logo.png"}" alt="${"WellBudz Logo"}" class="${"w-14 mt-5 ml-5 absolute z-10"}">
<div class="${"grid place-items-center h-screen bg-contain bg-center bg-no-repeat bg-lemon-background-color bg-lemon-background"}"><div class="${"bg-white rounded-2xl p-10"}"><p class="${"text-4xl font-bold mb-5 text-center"}">Sign Up</p>
		${validate_component(LoginForm, "LoginForm").$$render($$result, { title: "signup" }, {}, {})}
		<p class="${"mt-5 text-center w-72 text-black hover:text-wb-orange"}"><a href="${"/login"}">Already have an account? Login.</a></p></div></div>





`;
});
export {
  Signup as default
};
