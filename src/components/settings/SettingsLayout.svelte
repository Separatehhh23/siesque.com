<script lang="ts">
  import { currentUser } from "@/lib/pocketbase";
  import NavItem from "./NavItem.svelte";

  export let path: string;
</script>

<div class="px-24 py-10">
  <div class="h-full w-full px-2">
    <h3 class="text-2xl font-medium">Settings</h3>
    <div class="divider" />
  </div>
  <div class="flex h-full w-full space-x-4">
    <ul class="menu w-56 rounded-box bg-base-100 p-2">
      <NavItem {path} href="/settings">Profile</NavItem>
    </ul>
    <div class="w-full">
      {#if $currentUser}
        <slot />
      {:else}
        <div class="flex flex-col">
          <h1 class="text-3xl font-medium text-error">Not signed in</h1>
          <a class="btn btn-primary" href="/auth">Sign in</a>
        </div>
      {/if}
    </div>
  </div>
</div>
