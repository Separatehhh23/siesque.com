<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import { pb, currentUser } from "@/lib/pocketbase";

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  function redirect() {
    const params = new URLSearchParams(document.location.search);
    const callback = params.get("callback");

    if (callback) {
      window.location.pathname = callback;
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

  async function signInWithGithub() {
    await pb.collection("users").authWithOAuth2({ provider: "github" });

    redirect();
  }

  async function signInWithGoogle() {
    await pb.collection("users").authWithOAuth2({ provider: "google" });
    if (!$currentUser.name) {
      await pb
        .collection("users")
        .update($currentUser.id, { name: $currentUser.email.split("@")[0] });
    }

    redirect();
  }

  function handleResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  onMount(() => {
    document.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    document.removeEventListener("resize", handleResize);
  });
</script>

<div class="flex h-full w-full flex-row">
  {#each Array.from( { length: Math.ceil(windowWidth / 100) }, ).map((_, i) => i) as xTile (xTile)}
    <div class="flex h-screen w-[100px] flex-col">
      {#each Array.from( { length: Math.ceil(windowHeight / 100) }, ).map((_, i) => i) as yTile (yTile)}
        <img alt="castor" src="/beaver.webp" />
      {/each}
    </div>
  {/each}
</div>

<div class="hero absolute top-16 min-h-screen">
  <div class="glass hero-content flex-col rounded-xl p-8 lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Iniciar sesion</h1>
      <p class="py-6">
        Inicia sesion si no quieres ser un castor o un <i
          >Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi</i
        >
      </p>
    </div>
    <div class="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
      {#if $currentUser}
        <form class="card-body" on:submit|preventDefault>
          <h2>Signed in as {$currentUser.name}</h2>
          <div class="form-control mt-6 gap-2">
            <button class="btn btn-primary" on:click={signOut}>Sign out</button>
          </div>
        </form>
      {:else}
        <form class="card-body" on:submit|preventDefault>
          <div class="form-control mt-6 gap-2">
            <button class="btn btn-primary" on:click={signInWithGithub}
              >Sign in with github</button
            >
            <button class="btn btn-primary" on:click={signInWithGoogle}
              >Sign in with google</button
            >
          </div>
        </form>
      {/if}
    </div>
  </div>
</div>
