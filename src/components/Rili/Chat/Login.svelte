<script lang="ts">
  import { pb, currentUser } from "@/lib/pocketbase";

  let username;
  let password;

  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }

  async function signUp() {
    const data = {
      username,
      password,
      passwordConfirm: password,
      name: username,
    };
    const createdUser = await pb.collection("users").create(data);
    await login();
  }

  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <p>Signed in as {$currentUser.username}</p>
{:else}
  <form on:submit|preventDefault>
    <input placeholder="Username" type="text" bind:value={username} />
    <input placeholder="Password" type="password" bind:value={password} />
    <button on:click={signUp}>Sign Up</button>
    <button on:click={login}>Login</button>
  </form>
{/if}
