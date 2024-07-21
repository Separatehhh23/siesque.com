<script lang="ts">
  import { currentUser } from "@/lib/pocketbase";
  import { Input, Select, Submit } from "@/components/ui";
  import { addUser, type ReducedUser } from "./$shared";

  function register(e) {
    const data = new FormData(e.target);

    addUser({
      name: data.get("name"),
      color: data.get("color"),
    } as ReducedUser);
  }
</script>

<div class="absolute flex h-screen w-screen items-center justify-center">
  <div class="min-h-48 min-w-48 rounded-xl bg-base-200">
    {#if !$currentUser}
      <div class="p-4">
        <h1 class="font-medium text-error">Not logged in</h1>
        <a href="/auth?callback=/rili/games/tiles"
          ><p class="text-2xl underline">Log in</p></a
        >
      </div>
    {:else}
      <form class="flex flex-col gap-2 p-4" on:submit|preventDefault={register}>
        <Input id="name" label="Nombre" required={true} placeholder="El otro" />
        <Select id="color" label="Color" required={true}>
          <option value="red">Red</option>
          <option value="Green">Green</option>
          <option value="blue">Blue</option>
          <option value="orange">Orange</option>
          <option value="purple">Purple</option>
        </Select>
        <Submit />
      </form>
    {/if}
  </div>
</div>
