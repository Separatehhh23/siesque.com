<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import autoAnimate from "@formkit/auto-animate";

  import { pb, currentUser } from "@/lib/pocketbase";
  import { formatDate } from "@/lib/utils";

  let newMessage: string;
  let messages = [];
  let unsubscribe: () => void;
  let sending = false;
  let latestMessage: string;

  onMount(async () => {
    if (!$currentUser || !$currentUser.admin) return;

    const resultList = await pb
      .collection("privateMessages")
      .getList(1, 10000, {
        sort: "created",
        expand: "sender",
      });

    unsubscribe = await pb
      .collection("privateMessages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          const sender = await pb.collection("users").getOne(record.sender);
          record.expand = { sender };
          messages = [record, ...messages];
        }
      });

    messages = resultList.items
      .slice(Math.max(resultList.items.length - 25, 0))
      .reverse();
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function sendMessage() {
    if (!sending && latestMessage !== newMessage) {
      sending = true;
      latestMessage = newMessage;
      await pb.collection("privateMessages").create({
        text: newMessage,
        sender: $currentUser.id,
      });
      setTimeout(() => {
        sending = false;
      }, 1000);
    }
    newMessage = undefined;
  }

  async function showAll() {
    const resultList = await pb
      .collection("privateMessages")
      .getList(1, 10000, {
        sort: "created",
      });
    messages = resultList.items.reverse();
  }
</script>

{#if !$currentUser}
  <h1 class="text-error">Not logged in</h1>
{:else if !$currentUser.admin}
  <h1 class="text-error">Unauthorized</h1>
{:else}
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
            <button type="submit" class="btn btn-primary join-item">Send</button
            >
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
              >Sent by @{message.expand?.sender?.username} at {formatDate(
                message.created,
                " HH:mm",
              )}</small
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
