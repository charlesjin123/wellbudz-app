<script>
	import Message from '$lib/components/Message.svelte';
	import MessageForm from '$lib/components/MessageForm.svelte';
	import { onMount } from 'svelte';
	import { user, chatMessages, partner, partnerProfile } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';

	let loading = false

	// handle auto scroll
	export let chatWindow
	// let autoscroll

	onMount(async () => {
		// try {
		// 	loading = true
		// 	autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
		// 	const { data, error } = await supabase.from('messages').select().order('created_at', {ascending: true});
		// 	if (error) throw error;
		// 	chatMessages.update(data);
			
		// 	console.log($chatMessages);
		// } catch (error) {
		// 	alert(error.error_description || error.message);
		// } finally {
		// 	if (autoscroll) div.scrollTo(0, div.scrollHeight);
		// 	loading = false
		// }

		loading = true
		// autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
		// let condition = 'sender.eq.'+$user.id+'&receiver.eq.'+$partner+',sender.eq.'+$partner+'&receiver.eq.'+$user.id;
		const { data, error } = await supabase.from('messages').select().or('sender.eq.'+$user.id+',sender.eq.'+$partner).or('receiver.eq.'+$user.id+',receiver.eq.'+$partner).order('created_at', {ascending: true});

		chatMessages.set(data);
		
		// console.log($chatMessages);
		// if (autoscroll) {
		// 	console.log("autoscrolling");
		// 	requestAnimationFrame(() => div.scrollTo(0, div.scrollHeight));
		// };
		requestAnimationFrame(() => chatWindow.scrollTo(0, chatWindow.scrollHeight));

		loading = false

		const messages = supabase
        .from('messages')
        .on('*', (payload) => {
			if (payload.new.sender==$user.id || payload.new.sender==$partner) {
				chatMessages.update(old => [...old, payload.new]);
            	requestAnimationFrame(() => chatWindow.scrollTo(0, chatWindow.scrollHeight));
			}
        })
        .subscribe()

        return () => messages.unsubscribe()
	})
</script>

<div class="flex-1 justify-between flex flex-col border">
	<div class="flex sm:items-center justify-between px-4 py-3 border-b-2 border-gray-200">
		<div class="relative flex items-center space-x-4">
			<!-- <div class="relative">
				<span class="absolute text-green-500 right-0 bottom-0">
					<svg width="20" height="20">
						<circle cx="8" cy="8" r="8" fill="currentColor" />
					</svg>
				</span>
				<img
					src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt=""
					class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
				/>
			</div> -->
			<div class="flex flex-col leading-tight">
				<div class="text-2xl mt-1 flex items-center">
					<span class="text-gray-700 mr-3 font-bold">{$partnerProfile.first_name + " " + $partnerProfile.last_name}</span>
				</div>
				<span class="text-lg text-gray-600">Your Buddy</span>
			</div>
		</div>
		<div class="flex items-center space-x-2">
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-wb-blue focus:outline-none"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
			</button>
		</div>
	</div>
	<div
		id="messages"
		bind:this={chatWindow}
		class="flex flex-col space-y-4 p-3 h-[29rem] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
	>
		{#if $chatMessages.length}
			{#each $chatMessages as msg (msg.id)}
				<Message {msg} />
			{/each}
		{:else if loading}
			<p class="loading">Loading...</p>
		{:else}
			<!-- <p class="empty">No msgs</p> -->
		{/if}
		<!-- <div class="chat-message">
			<div class="flex items-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
					<div>
						<span
							class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
							>Can be verified on any platform using docker</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-1"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end justify-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
					<div>
						<span class="px-2 py-2 rounded-lg inline-block rounded-br-none bg-wb-blue text-white "
							>Your error message says permission denied, npm global installs must be given root
							privileges.</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-2"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
					<div>
						<span class="px-2 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
							>Command was run with root privileges. I'm sure about that.</span
						>
					</div>
					<div>
						<span class="px-2 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
							>I've update the description so it's more obviously now</span
						>
					</div>
					<div>
						<span class="px-2 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
							>FYI https://askubuntu.com/a/700266/510172</span
						>
					</div>
					<div>
						<span
							class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
						>
							Check the line above (it ends with a # so, I'm running it as root )
							<pre># npm install -g @vue/devtools</pre>
						</span>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-1"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end justify-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
					<div>
						<span class="px-2 py-2 rounded-lg inline-block rounded-br-none bg-wb-blue text-white "
							>Any updates on this issue? I'm getting the same error when trying to install
							devtools. Thanks</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-2"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
					<div>
						<span
							class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
							>Thanks for your message David. I thought I'm alone with this issue. Please, ? the
							issue to support it :)</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-1"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end justify-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
					<div>
						<span class="px-2 py-2 rounded-lg inline-block bg-wb-blue text-white "
							>Are you using sudo?</span
						>
					</div>
					<div>
						<span class="px-2 py-2 rounded-lg inline-block rounded-br-none bg-wb-blue text-white "
							>blah blah blah</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-2"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
					<div>
						<span class="px-2 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
							>It seems like you are from Mac OS world. There is no /Users/ folder on linux ?</span
						>
					</div>
					<div>
						<span
							class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
							>I have no issue with any other packages installed with root permission globally.</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-1"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end justify-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
					<div>
						<span class="px-2 py-2 rounded-lg inline-block rounded-br-none bg-wb-blue text-white "
							>yes, I have a mac. I never had issues with root permission as well, but this helped
							me to solve the problem</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-2"
				/>
			</div>
		</div>
		<div class="chat-message">
			<div class="flex items-end">
				<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
					<div>
						<span class="px-2 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
							>I get the same error on Arch Linux (also with sudo)</span
						>
					</div>
					<div>
						<span class="px-2 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
							>I also have this issue, Here is what I was doing until now: #1076</span
						>
					</div>
					<div>
						<span
							class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
							>even i am facing</span
						>
					</div>
				</div>
				<img
					src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
					alt="My profile"
					class="w-6 h-6 rounded-full order-1"
				/>
			</div>
		</div> -->
	</div>
	<div class="border-t-2 border-gray-200">
		<!-- <div class="relative flex">
			<input
				type="text"
				placeholder="Your message"
				class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
			/>
			<div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-6 w-6 text-gray-600"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
						/>
					</svg>
				</button>
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-6 w-6 text-gray-600"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</button>
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-6 w-6 text-gray-600"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
				>
					<span class="font-bold">Send</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-6 w-6 ml-2 transform rotate-90"
					>
						<path
							d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
						/>
					</svg>
				</button>
			</div>
		</div> -->
		<MessageForm/>
		<!-- <form>
			<div class="flex items-center py-2 pl-2 rounded-lg">
				<textarea id="chat" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
					<button class="inline-flex justify-center p-2 text-wb-blue rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
					<svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
					<span class="sr-only">Send message</span>
				</button>
			</div>
		</form> -->
	</div>
</div>

<style>
	.scrollbar-w-2::-webkit-scrollbar {
		width: 0.25rem;
		height: 0.25rem;
	}

	.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
		--bg-opacity: 1;
		background-color: #f7fafc;
		background-color: rgba(247, 250, 252, var(--bg-opacity));
	}

	.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
		--bg-opacity: 1;
		background-color: #edf2f7;
		background-color: rgba(237, 242, 247, var(--bg-opacity));
	}

	.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
		border-radius: 0.25rem;
	}
</style>
