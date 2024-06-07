<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import autoAnimate from "@formkit/auto-animate";

  import { pb } from "@/lib/pocketbase";

  let newMessage: string;
  let username: string;
  let messages = [];
  let unsubscribe: () => void;

  onMount(async () => {
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
    });
    messages = resultList.items;

    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          messages = [...messages, record];
        }
      });
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function sendMessage() {
    await pb.collection("messages").create({
      text: newMessage,
      author: username,
    });
  }
</script>

<div class="flex h-screen w-screen flex-row justify-center">
  <div class="mt-8 w-2/3 pt-8">
    <div class="flex flex-col gap-2" use:autoAnimate>
      {#each messages as message (message.id)}
        <div class="rounded-xl bg-base-200 p-2">
          <p>{message.text}</p>
          <small>Sent by @{message.author}</small>
        </div>
      {/each}
      <form
        on:submit|preventDefault={sendMessage}
        class="join rounded-xl bg-base-200 p-2"
      >
        <input
          placeholder="Message"
          type="text"
          class="input join-item"
          bind:value={newMessage}
        />
        <div class="join-item h-full w-1 bg-base-200" />
        <input
          placeholder="Username"
          type="text"
          class="input join-item"
          bind:value={username}
        />
        <button type="submit" class="btn btn-primary join-item">Send</button>
      </form>
    </div>
  </div>
</div>
