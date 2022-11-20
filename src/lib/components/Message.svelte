<script>
    import { user } from '$lib/sessionStore'
  
    export let msg
</script>
  
<!-- <div in:fly={{ y: 20, duration: 200 }} class={`container ${msg.username === $store.user.email ? 'right' : 'left'}`}>
<div>
    {#if msg.username !== $store.user.email}
        <p>{msg.username.split('@')[0]}</p>
    {/if}
    <div>
        {msg.text}
    </div>
</div> -->

{#if msg.sender == $user.id}
<div class="chat-message">
    <div class="flex items-end justify-end">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
                <span class="px-2 py-2 rounded-lg inline-block rounded-br-none bg-wb-blue text-white"
                    >{msg.message}</span
                >
            </div>
        </div>
    </div>
</div>
{:else}
<div class="chat-message">
    <div class="flex items-end">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
                <span
                    class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                    >{msg.message}</span
                >
            </div>
        </div>
    </div>
</div>
{/if}
