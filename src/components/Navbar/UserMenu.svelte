<script lang="ts">
  import { Icon, Cog6Tooth, Sun, Moon } from "svelte-hero-icons";

  import { pb, currentUser } from "@/lib/pocketbase";
  import { theme, toggleTheme } from "@/stores";
  import { getImageURL } from "../../lib/utils";

  function signOut() {
    pb.authStore.clear();
    document.getElementById("dropdown").focus();
  }
</script>

<div class="dropdown dropdown-end">
  <div
    class="avatar w-12 rounded-full hover:cursor-pointer"
    tabindex="0"
    role="button"
    id="dropdown"
  >
    {#if $currentUser}
      <img
        src={$currentUser.avatar
          ? getImageURL(
              $currentUser.collectionId,
              $currentUser.id,
              $currentUser.avatar,
            )
          : `https://ui-avatars.com/api/?name=${$currentUser.name}`}
        alt="Profile avatar"
        class="mask mask-circle"
      />
    {:else}
      <img src="/beaver.webp" alt="Castor" class="mask mask-circle" />
    {/if}
  </div>
  <ul
    class="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-200 p-2 shadow"
  >
    <li>
      <a href="/settings"
        ><div class="h-7 w-7"><Icon src={Cog6Tooth} /></div>
        Settings</a
      >
    </li>
    <li>
      <button class="text-accent" on:click={toggleTheme}>
        <div class="h-7 w-7">
          {#if $theme === "light"}
            <Icon src={Sun} />
          {:else}
            <Icon src={Moon} />
          {/if}
        </div>
        Theme
        <input
          type="checkbox"
          class="toggle pl-0"
          checked={$theme === "light"}
        />
      </button>
    </li>
    <li>
      {#if $currentUser}
        <button class="text-accent" on:click={signOut}>
          <div class="h-7 w-7" />
          Sign out
        </button>
      {:else}
        <a href="/auth">
          <div class="h-7 w-7" />
          Sign in
        </a>
      {/if}
    </li>
  </ul>
</div>
