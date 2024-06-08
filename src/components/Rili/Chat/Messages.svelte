<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import autoAnimate from "@formkit/auto-animate";

  import { pb } from "@/lib/pocketbase";
  import { formatDate } from "@/lib/utils";

  let newMessage: string;
  let username: string;
  let messages = [];
  let unsubscribe: () => void;
  let sending = false;
  let latestMessage: string;

  onMount(async () => {
    const resultList = await pb.collection("messages").getList(1, 10000, {
      sort: "created",
    });

    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          messages = [record, ...messages];
        }
      });

    messages = resultList.items
      .slice(Math.max(resultList.items.length - 50, 0))
      .reverse();
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function sendMessage() {
    if (!sending && latestMessage !== newMessage) {
      sending = true;
      latestMessage = newMessage;
      await pb.collection("messages").create({
        text: newMessage,
        author: username,
      });
      setTimeout(() => {
        sending = false;
      }, 1000);
    }
  }

  async function showAll() {
    const resultList = await pb.collection("messages").getList(1, 10000, {
      sort: "created",
    });
    messages = resultList.items.reverse();
  }
</script>

<div class="flex min-h-screen w-screen flex-row justify-center">
  <div class="mb-8 mt-8 w-2/3 pb-8 pt-8">
    <div class="flex flex-col gap-2" use:autoAnimate>
      <div class="flex w-full flex-row gap-1">
        <form
          on:submit|preventDefault={sendMessage}
          class="join justify-self-start rounded-xl bg-base-200 p-2"
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
        <div class="justify-self-end rounded-xl bg-base-200 p-2">
          <button on:click|preventDefault={showAll} class="btn btn-ghost"
            >Show all</button
          >
        </div>
      </div>
      {#each messages as message (message.id)}
        <div class="rounded-xl bg-base-200 p-2">
          <p>{message.text}</p>
          <small
            >Sent by @{message.author} at {formatDate(
              message.created,
              " HH:mm",
            )}</small
          >
        </div>
      {/each}
    </div>
  </div>
</div>
