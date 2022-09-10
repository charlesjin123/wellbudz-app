import { c as create_ssr_component, e as escape } from "../../_app/immutable/chunks/index-3e01a4ca.js";
import { getAuth } from "firebase/auth";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const auth = getAuth();
  const user = auth.currentUser;
  var userEmail = "";
  if (user != null) {
    userEmail = user.email;
  }
  return `<img src="${"/img/logo.png"}" alt="${"WellBudz Logo"}" class="${"w-14 mt-5 ml-5 absolute z-10"}">
<div class="${"grid place-items-center h-screen bg-cover bg-no-repeat bg-cups-background"}"><div class="${"grid"}"><p class="${"text-4xl font-bold mb-5 text-center"}">WellBudz is coming soon!</p>
		<p class="${"justify-self-center text-center w-1/4"}">Thank you for registering an account with the email: <b>${escape(userEmail)}</b>. Our application is still under development and will be released by <u>October 1st, 2022</u>. Once it is released, you will be notified and be able to log in to the platform via the account you just created. Thank you for your patience!</p>
		<button class="${"justify-self-center mt-5 w-20 text-white bg-black hover:bg-wb-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center"}">Logout</button></div></div>

`;
});
export {
  Routes as default
};
