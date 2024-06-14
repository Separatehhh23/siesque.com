<script lang="ts">
  import { pb, currentUser } from "@/lib/pocketbase";

  let username: string;
  let password: string;

  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
      };
      const createdUser = await pb.collection("users").create(data);
      await login();
    } catch (e) {
      console.log(e);
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

  async function signInWithGithub() {
    await pb.collection("users").authWithOAuth2({ provider: "github" });
  }

  async function signInWithGoogle() {
    await pb.collection("users").authWithOAuth2({ provider: "google" });
  }
</script>

{#if $currentUser}
  <p>Signed in as {$currentUser.username}</p>
  <button on:click={signOut}>Sign out</button>
{:else}
  <form on:submit|preventDefault>
    <input placeholder="Username" type="text" bind:value={username} />
    <input placeholder="Password" type="password" bind:value={password} />

    <button on:click={login}>Log In</button>
    <button on:click={signUp}>Sign Up</button>
    <button on:click={signInWithGithub}>Sign in with github</button>
    <button on:click={signInWithGoogle}>Sign in with google</button>
  </form>
{/if}
